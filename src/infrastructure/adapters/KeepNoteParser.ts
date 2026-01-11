export interface ParsedData {
  carlos: Record<string, string>
  ines: Record<string, string>
}

export class KeepNoteParser {
  // Defines the mapping from common names (in Spanish, lowercase)
  // to the canonical IDs used in the form.
  private conceptMap: Record<string, string> = {
    casa: 'casa',
    'casa (hipoteca, comunidad, seguros . . .)': 'casa',
    luz: 'luz',
    gas: 'gas',
    agua: 'agua',
    internet: 'internet',
    compras: 'compras',
    compra: 'compras', // Alias for 'compras'
    ocio: 'ocio',
    coche: 'coche',
    'coche (seguro, mantenimiento...)': 'coche',
    gasolina: 'gasolina',
    astro: 'astro',
    'astro (mascota)': 'astro',
    santillan: 'santillan',
    santillán: 'santillan', // Alias for 'santillan'
    otros: 'otros',
    'otros gastos': 'otros',
  }

  /**
   * Parses a block of text from Keep into a structured object.
   * This parser expects a "concept-centric" format.
   * @param {string} text - The raw text from the textarea.
   * @returns {Object} { carlos: {casa: "100", ...}, ines: {luz: "50", ...} }
   */
  public parse(text: string): ParsedData {
    const lines = text.split('\n')
    const result: ParsedData = { carlos: {}, ines: {} }
    let currentConcept: string | null = null

    for (const line of lines) {
      const cleanLine = line.trim()
      // const cleanLineLower = cleanLine.toLowerCase(); // Unused in original logic but good to have if needed

      // 1. Check if it's a new concept line
      // (Ends with ':' and does not start with '-')
      if (cleanLine.endsWith(':') && !cleanLine.startsWith('-')) {
        const rawConcept = cleanLine.slice(0, -1).trim().toLowerCase()
        currentConcept = this.conceptMap[rawConcept] || null
        continue
      }

      // 2. Check if it's a user entry line
      // (Starts with '-' and we have a valid concept)
      if (cleanLine.startsWith('-') && currentConcept) {
        try {
          const entryLine = cleanLine.slice(1).trim() // Remove hyphen and trim
          const parts = entryLine.split(':')

          if (parts.length < 2) continue // Not a valid key:value line

          const rawUser = parts[0].trim().toLowerCase()
          const value = parts.slice(1).join(':').trim() // Re-join in case value has colons

          if (!value) continue // Skip if value is empty

          let userKey: 'carlos' | 'ines' | null = null
          if (rawUser === 'carlos') {
            userKey = 'carlos'
          } else if (rawUser === 'ines' || rawUser === 'inés') {
            userKey = 'ines'
          }

          if (userKey) {
            // Set the value for the user and concept
            result[userKey][currentConcept] = value
          }
        } catch (e) {
          console.warn('Skipping unparseable user line:', line, e)
        }
      }
    }
    return result
  }
}
