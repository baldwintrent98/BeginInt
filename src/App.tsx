import { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import './style.css'

export default function App() {
  const [name, setName] = useState('Builder')
  const [response, setResponse] = useState('Press the button to ask Rust for a greeting.')
  const [isLoading, setIsLoading] = useState(false)

  async function handleGreet() {
    setIsLoading(true)

    try {
      const message = await invoke<string>('greet', { name })
      setResponse(message)
    } catch (error) {
      const fallback = error instanceof Error ? error.message : String(error)
      setResponse(`Rust call failed: ${fallback}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">React + TypeScript + Tauri + Rust</p>
        <h1>BeginInt is ready for a desktop UI.</h1>
        <p className="lead">
          This screen is now powered by React, and it calls a Rust command through Tauri when you press the button.
        </p>

        <div className="controls">
          <label className="field" htmlFor="name-input">
            <span>Name</span>
            <input
              id="name-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter a name"
            />
          </label>

          <button type="button" onClick={handleGreet} disabled={isLoading}>
            {isLoading ? 'Calling Rust…' : 'Ask Rust'}
          </button>
        </div>

        <div className="response-box" aria-live="polite">
          <strong>Rust response</strong>
          <p>{response}</p>
        </div>
      </section>
    </main>
  )
}
