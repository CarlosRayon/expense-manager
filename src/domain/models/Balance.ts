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
