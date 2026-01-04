'use client'

import { useState } from 'react'
import Header from '@/ui/Header'
import KeepImporter from '@/ui/KeepImporter'
import ExpenseForm, { CATEGORIES } from '@/ui/ExpenseForm'
import Results from '@/ui/Results'
import { ParsedData } from '@/lib/KeepParser'
import { ExpenseParser } from '@/lib/ExpenseParser'
import { ExpenseCalculator, BalanceReport } from '@/lib/ExpenseCalculator'

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

    for (const category of CATEGORIES) {
      expensesCarlos[category.id] = ExpenseParser.parseInput(
        formData.carlos[category.id] || ''
      )
      expensesInes[category.id] = ExpenseParser.parseInput(
        formData.ines[category.id] || ''
      )
    }

    // Calculate balance
    const report = ExpenseCalculator.calculateFinalBalance(
      expensesCarlos,
      expensesInes
    )

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
