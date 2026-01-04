'use client'

import { BalanceReport } from '@/lib/ExpenseCalculator'

interface ResultsProps {
  report: BalanceReport
  categories: Array<{ id: string; label: string }>
}

export default function Results({ report, categories }: ResultsProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  return (
    <section className="rounded-lg bg-white p-6 shadow-lg md:p-8">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Balance de Gastos
      </h2>

      {/* Resumen Total */}
      <div className="mb-6 grid grid-cols-1 gap-4 text-center md:grid-cols-2">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="text-lg font-semibold text-blue-800">
            Total Pagado por Carlos
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(report.totalUser1)}
          </p>
        </div>
        <div className="rounded-lg bg-pink-50 p-4">
          <h3 className="text-lg font-semibold text-pink-800">
            Total Pagado por Inés
          </h3>
          <p className="text-2xl font-bold text-pink-600">
            {formatCurrency(report.totalUser2)}
          </p>
        </div>
      </div>

      {/* Resumen Global Total */}
      <div className="mb-6 rounded-lg bg-gray-100 p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Gasto Total Combinado
        </h3>
        <p className="text-2xl font-bold text-gray-700">
          {formatCurrency(report.totalExpenses)}
        </p>
      </div>

      {/* Balance por Concepto */}
      <div className="mb-6">
        <h3 className="mb-4 text-2xl font-semibold text-gray-700">
          Balance por Concepto
        </h3>
        <ul className="divide-y divide-gray-200 space-y-2">
          {categories.map((category) => {
            const catData = report.categoryBalances[category.id]
            if (!catData) return null

            // Determine color for difference
            let diffColor = 'text-gray-500'
            if (catData.difference > 0) diffColor = 'text-green-600' // Carlos paid more
            if (catData.difference < 0) diffColor = 'text-red-600' // Inés paid more

            return (
              <li
                key={category.id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <span className="font-semibold text-gray-800">
                    {category.label}
                  </span>
                  <div className="text-sm text-gray-600">
                    Carlos: {formatCurrency(catData.user1)} | Inés:{' '}
                    {formatCurrency(catData.user2)}
                  </div>
                </div>
                <span className={`text-lg font-medium ${diffColor}`}>
                  Dif: {formatCurrency(catData.difference)}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Balance Final */}
      <div>
        <h3 className="mb-4 text-2xl font-semibold text-gray-700">
          Balance Final
        </h3>
        <div
          className={`rounded-lg p-4 text-center text-xl font-bold ${
            report.finalBalanceResult.isBalanced
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {report.finalBalanceResult.isBalanced ? (
            <p>{report.finalBalanceResult.message}</p>
          ) : (
            <p>
              {report.finalBalanceResult.owes} debe a{' '}
              {report.finalBalanceResult.to} un total de
              <span className="mt-1 block text-2xl">
                {formatCurrency(report.finalBalanceResult.amount || 0)}
              </span>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
