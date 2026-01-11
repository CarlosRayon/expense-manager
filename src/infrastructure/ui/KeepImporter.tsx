'use client'

import { useState } from 'react'
import { KeepNoteParser, ParsedData } from '../adapters/KeepNoteParser'

interface KeepImporterProps {
  onImport: (data: ParsedData) => void
}

export default function KeepImporter({ onImport }: KeepImporterProps) {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const handleImport = () => {
    if (!text.trim()) return

    const parser = new KeepNoteParser()
    const parsedData = parser.parse(text)

    onImport(parsedData)
    setText('')
    setMessage('¡Campos rellenados! Revisa los datos y pulsa CALCULAR.')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <section className="mb-8 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-green-700">
        Importar desde Google Keep
      </h2>
      <p className="mb-4 rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
        Pega aquí tu nota de Keep. La app rellenará los campos automáticamente.
        <br />
        El formato esperado es (los conceptos deben terminar con
        <code className="text-xs">:</code> y los usuarios empezar con
        <code className="text-xs">-</code>):
        <br />
        <code className="text-xs">
          Casa:
          <br />
          &nbsp;&nbsp;- Inés: 970€
          <br />
          &nbsp;&nbsp;- Carlos:
          <br />
          <br />
          Luz:
          <br />
          &nbsp;&nbsp;- Inés:
          <br />
          &nbsp;&nbsp;- Carlos: 50.20
          <br />
          <br />
          Compra:
          <br />
          &nbsp;&nbsp;- Carlos: 15 + 22.10 + 5<br />
        </code>
      </p>
      <textarea
        id="keep-input"
        className="h-40 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
        placeholder={message || 'Pega tu texto aquí...'}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        id="parse-keep-btn"
        onClick={handleImport}
        className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
      >
        Importar y Rellenar Campos
      </button>
    </section>
  )
}
