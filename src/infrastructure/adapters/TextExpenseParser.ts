/**
 * Utility for parsing complex expense strings.
 * Converts strings like "1,58€ + 2,53€ + 100" into a single number.
 */
export class TextExpenseParser {
  /**
   * Parses an input string like "1,58€ + 2,53€ + 100" into a single number.
   * @param inputString - The raw string from the input field.
   * @returns The sum of all values in the string.
   */
  public parseInput(inputString: string): number {
    if (!inputString || inputString.trim() === '') {
      return 0
    }

    // 1. Sanitize: Remove currency symbols, whitespace at ends.
    const sanitizedString = inputString
      .replace(/€/g, '') // Remove euro symbol
      .replace(/,/g, '.') // Convert commas to dots for parseFloat
      .trim()

    // 2. Process: Split, filter, parse, and sum.
    return sanitizedString
      .split('+') // Split by '+'
      .map((num) => num.trim()) // Trim whitespace from each part
      .filter((num) => num !== '') // Filter out empty strings
      .reduce((sum, current) => {
        const value = parseFloat(current)
        return sum + (isNaN(value) ? 0 : value) // Add valid numbers, ignore NaN
      }, 0)
  }
}
