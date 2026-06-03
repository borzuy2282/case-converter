import { useCallback, useEffect, useState } from 'react'
import {
  CASE_OPTIONS,
  type CaseType,
  convertCase,
  countWords,
} from './utils/caseConverters'

function App() {
  const [text, setText] = useState('')
  const [copyMessage, setCopyMessage] = useState<string | null>(null)

  const charCount = text.length
  const wordCount = countWords(text)

  useEffect(() => {
    if (!copyMessage) return
    const timer = window.setTimeout(() => setCopyMessage(null), 2000)
    return () => window.clearTimeout(timer)
  }, [copyMessage])

  const handleCaseChange = useCallback((caseType: CaseType) => {
    setText((current) => convertCase(current, caseType))
  }, [])

  const handleCopy = useCallback(async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopyMessage('Copied to clipboard!')
    } catch {
      setCopyMessage('Failed to copy text')
    }
  }, [text])

  const handleClear = useCallback(() => {
    setText('')
    setCopyMessage(null)
  }, [])

  return (
    <div className="min-h-svh bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-svh max-w-3xl flex-col px-4 py-10 sm:px-6">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Case Converter
          </h1>
          <p className="mt-2 text-slate-400">
            Transform your text into any case format instantly
          </p>
        </header>

        <main className="flex flex-1 flex-col gap-6">
          <section className="flex flex-col gap-2">
            <label htmlFor="text-input" className="text-sm font-medium text-slate-300">
              Your text
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Type or paste your text here..."
              rows={8}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
          </section>

          <section className="flex flex-wrap gap-3">
            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!text}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Copy to clipboard
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={!text}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear
              </button>
            </div>
            {copyMessage && (
              <p
                role="status"
                className="flex items-center text-sm font-medium text-emerald-400"
              >
                {copyMessage}
              </p>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-sm font-medium text-slate-300">
              Convert to
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CASE_OPTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleCaseChange(id)}
                  disabled={!text}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:border-indigo-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-auto rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4">
            <h2 className="mb-3 text-sm font-medium text-slate-300">Statistics</h2>
            <div className="flex gap-8">
              <div>
                <p className="text-2xl font-semibold text-white">{charCount}</p>
                <p className="text-sm text-slate-400">Characters</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{wordCount}</p>
                <p className="text-sm text-slate-400">Words</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
