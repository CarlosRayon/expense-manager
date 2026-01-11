'use client'

import { useEffect, useState } from 'react'

interface ExpenseFormProps {
  initialData?: {
    carlos: Record<string, string>
    ines: Record<string, string>
  }
  onCalculate?: (formData: {
    carlos: Record<string, string>
    ines: Record<string, string>
  }) => void
}

const CATEGORIES = [
  {
    id: 'casa',
    label: 'Casa (hipoteca, comunidad, seguros . . .)',
    placeholder: 'Ej: 450€ + 10,50€',
  },
  { id: 'luz', label: 'Luz', placeholder: 'Ej: 50,20€' },
  { id: 'gas', label: 'Gas', placeholder: 'Ej: 30,15€ + 5€' },
  { id: 'agua', label: 'Agua' },
  { id: 'internet', label: 'Internet', placeholder: 'Ej: 29,99€' },
  { id: 'compras', label: 'Compras', placeholder: 'Ej: 15€ + 22,10€ + 5€' },
  { id: 'ocio', label: 'Ocio' },
  { id: 'coche', label: 'Coche (Seguro, Mantenimiento...)' },
  { id: 'gasolina', label: 'Gasolina' },
  { id: 'astro', label: 'Astro (Mascota)' },
  { id: 'santillan', label: 'Santillan' },
  { id: 'otros', label: 'Otros gastos' },
]

export { CATEGORIES }

export default function ExpenseForm({
  initialData,
  onCalculate,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    carlos: {} as Record<string, string>,
    ines: {} as Record<string, string>,
  })

  // Sincronizar el estado cuando initialData cambia
  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        carlos: { ...prev.carlos, ...initialData.carlos },
        ines: { ...prev.ines, ...initialData.ines },
      }))
    }
  }, [initialData])

  const handleChange = (
    user: 'carlos' | 'ines',
    category: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [user]: {
        ...prev[user],
        [category]: value,
      },
    }))
  }

  return (
    <>
      <form
        id="expense-form"
        className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
      >
        {/* Columna de Carlos */}
        <section className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 border-b pb-2 text-2xl font-semibold text-blue-600">
            Gastos de Carlos
          </h2>
          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <div key={`carlos-${cat.id}`}>
                <label
                  htmlFor={`carlos-${cat.id}`}
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {cat.label}
                </label>
                <input
                  type="text"
                  id={`carlos-${cat.id}`}
                  placeholder={cat.placeholder}
                  value={formData.carlos[cat.id] || ''}
                  onChange={(e) =>
                    handleChange('carlos', cat.id, e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Columna de Inés */}
        <section className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 border-b pb-2 text-2xl font-semibold text-pink-600">
            Gastos de Inés
          </h2>
          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <div key={`ines-${cat.id}`}>
                <label
                  htmlFor={`ines-${cat.id}`}
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {cat.label}
                </label>
                <input
                  type="text"
                  id={`ines-${cat.id}`}
                  placeholder={cat.placeholder}
                  value={formData.ines[cat.id] || ''}
                  onChange={(e) => handleChange('ines', cat.id, e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:ring-pink-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </section>
      </form>

      {/* Botón de Cálculo */}
      <div className="mb-8 flex justify-center">
        <button
          id="calculate-btn"
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none md:w-1/2"
          onClick={(e) => {
            e.preventDefault()
            if (onCalculate) {
              onCalculate(formData)
            }
          }}
        >
          CALCULAR
        </button>
      </div>
    </>
  )
}
