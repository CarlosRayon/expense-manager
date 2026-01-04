import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Calculadora de Gastos',
  description: 'Calculadora de Gastos Mensuales',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900 antialiased">{children}</body>
    </html>
  )
}
