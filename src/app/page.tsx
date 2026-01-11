'use client'

import { useState } from 'react'
import Header from '@/infrastructure/ui/Header'
import KeepImporter from '@/infrastructure/ui/KeepImporter'
import ExpenseForm, { CATEGORIES } from '@/infrastructure/ui/ExpenseForm'
import Results from '@/infrastructure/ui/Results'
import { ParsedData } from '@/infrastructure/adapters/KeepNoteParser'
import { TextExpenseParser } from '@/infrastructure/adapters/TextExpenseParser'
import { BalanceReport } from '@/domain/models/Balance'
import { CalculateBalanceUseCase } from '@/application/usecases/CalculateBalanceUseCase'

export default function HomePage() {
  const [importedData, setImportedData] = useState<ParsedData | undefined>(
    undefined
  )
  const [balanceReport, setBalanceReport] = useState<BalanceReport | null>(null)

  const handleImport = (data: ParsedData) => {
    setImportedData(data)
  }

  const handleCalculate = (formData: {
    carlos: Record<string, string>
    ines: Record<string, string>
  }) => {
    // Parse all input strings
    const expensesCarlos: Record<string, number> = {}
    const expensesInes: Record<string, number> = {}

    const parser = new TextExpenseParser()

    for (const category of CATEGORIES) {
      expensesCarlos[category.id] = parser.parseInput(
        formData.carlos[category.id] || ''
      )
      expensesInes[category.id] = parser.parseInput(
        formData.ines[category.id] || ''
      )
    }

    // Calculate balance
    const useCase = new CalculateBalanceUseCase()
    const report = useCase.execute(expensesCarlos, expensesInes)

    setBalanceReport(report)

    // Scroll to results
    setTimeout(() => {
      document
        .getElementById('results-container')
        ?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-8">
      <Header />
      <KeepImporter onImport={handleImport} />
      <ExpenseForm initialData={importedData} onCalculate={handleCalculate} />
      {balanceReport && (
        <div id="results-container">
          <Results report={balanceReport} categories={CATEGORIES} />
        </div>
      )}
    </main>
  )
}
