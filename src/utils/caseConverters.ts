export type CaseType =
  | 'lowercase'
  | 'uppercase'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'screamingSnake'
  | 'kebab'

export const CASE_OPTIONS: { id: CaseType; label: string }[] = [
  { id: 'lowercase', label: 'lowercase' },
  { id: 'uppercase', label: 'UPPERCASE' },
  { id: 'title', label: 'Title Case' },
  { id: 'sentence', label: 'Sentence case' },
  { id: 'camel', label: 'camelCase' },
  { id: 'pascal', label: 'PascalCase' },
  { id: 'snake', label: 'snake_case' },
  { id: 'screamingSnake', label: 'SCREAMING_SNAKE' },
  { id: 'kebab', label: 'kebab-case' },
]

function splitWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[\s_\-.]+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(Boolean)
}

function capitalize(word: string): string {
  if (!word) return word
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export function convertCase(text: string, caseType: CaseType): string {
  if (!text) return text

  const words = splitWords(text)

  switch (caseType) {
    case 'lowercase':
      return text.toLowerCase()
    case 'uppercase':
      return text.toUpperCase()
    case 'title':
      return words.map(capitalize).join(' ')
    case 'sentence':
      return capitalize(text.trim().toLowerCase())
    case 'camel':
      if (words.length === 0) return text
      return (
        words[0].toLowerCase() +
        words.slice(1).map(capitalize).join('')
      )
    case 'pascal':
      return words.map(capitalize).join('')
    case 'snake':
      return words.map((w) => w.toLowerCase()).join('_')
    case 'screamingSnake':
      return words.map((w) => w.toUpperCase()).join('_')
    case 'kebab':
      return words.map((w) => w.toLowerCase()).join('-')
  }
}

export function countWords(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}
