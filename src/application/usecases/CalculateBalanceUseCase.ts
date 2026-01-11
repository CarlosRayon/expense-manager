import { BalanceService } from '../../domain/services/BalanceService'
import { BalanceReport } from '../../domain/models/Balance'

export class CalculateBalanceUseCase {
  private balanceService: BalanceService

  constructor() {
    this.balanceService = new BalanceService()
  }

  public execute(
    expensesUser1: Record<string, number>,
    expensesUser2: Record<string, number>
  ): BalanceReport {
    return this.balanceService.calculateFinalBalance(expensesUser1, expensesUser2)
  }
}
