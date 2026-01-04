export interface CategoryBalance {
  user1: number
  user2: number
  difference: number
}

export interface FinalBalanceResult {
  isBalanced: boolean
  message?: string
  owes?: string
  to?: string
  amount?: number
}

export interface BalanceReport {
  totalUser1: number
  totalUser2: number
  totalExpenses: number
  averageShare: number
  categoryBalances: Record<string, CategoryBalance>
  finalBalanceResult: FinalBalanceResult
}

/**
 * Calculates balances based on user expense objects.
 * Domain Service for expense calculations.
 */
export const ExpenseCalculator = {
  /**
   * Calculates the final balance between two users.
   * @param expensesUser1 - Object with parsed expenses for user 1 (e.g., {casa: 100}).
   * @param expensesUser2 - Object with parsed expenses for user 2.
   * @returns A full balance report.
   */
  calculateFinalBalance(
    expensesUser1: Record<string, number>,
    expensesUser2: Record<string, number>
  ): BalanceReport {
    const categories = Object.keys(expensesUser1)
    let totalUser1 = 0
    let totalUser2 = 0
    const categoryBalances: Record<string, CategoryBalance> = {}

    // Calculate totals and per-category balances
    for (const category of categories) {
      const amountUser1 = expensesUser1[category] || 0
      const amountUser2 = expensesUser2[category] || 0

      totalUser1 += amountUser1
      totalUser2 += amountUser2

      categoryBalances[category] = {
        user1: amountUser1,
        user2: amountUser2,
        // Positive diff = User1 paid more. Negative diff = User2 paid more.
        difference: amountUser1 - amountUser2,
      }
    }

    const totalExpenses = totalUser1 + totalUser2
    const averageShare = totalExpenses / 2

    // How much user1 is over (+) or under (-) their share
    const user1DifferenceFromAverage = totalUser1 - averageShare

    let finalBalanceResult: FinalBalanceResult

    // Use a small epsilon for floating point comparison
    if (Math.abs(user1DifferenceFromAverage) < 0.01) {
      finalBalanceResult = {
        isBalanced: true,
        message: '¡Gastos perfectamente equilibrados!',
      }
    } else if (user1DifferenceFromAverage > 0) {
      // User1 paid more than their share, User2 owes User1
      finalBalanceResult = {
        isBalanced: false,
        owes: 'Inés',
        to: 'Carlos',
        amount: user1DifferenceFromAverage,
      }
    } else {
      // User1 paid less than their share, User1 owes User2
      finalBalanceResult = {
        isBalanced: false,
        owes: 'Carlos',
        to: 'Inés',
        amount: Math.abs(user1DifferenceFromAverage),
      }
    }

    return {
      totalUser1,
      totalUser2,
      totalExpenses,
      averageShare,
      categoryBalances,
      finalBalanceResult,
    }
  },
}
