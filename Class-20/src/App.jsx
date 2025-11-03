import { useMemo, useState } from 'react'
import { z } from 'zod'
import './App.css'

const launchSchema = z.object({
  name: z.string().min(2, 'Let us know your name (min 2 characters).'),
  email: z.string().email('Use a valid email so we can reach out.'),
  dream: z
    .string()
    .min(12, 'Give us at least 12 characters to capture your idea.')
    .max(280, 'Keep it within 280 characters to stay focused.'),
  timeline: z.enum(['this-quarter', 'six-months', 'year', 'moonshot']),
  launchDate: z
    .string()
    .min(1, 'Pick a launch date.')
    .refine((value) => {
      const target = new Date(`${value}T00:00:00`)
      if (Number.isNaN(target.getTime())) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return target > today
    }, 'Choose a date in the future.'),
  intensity: z.coerce.number().min(20, 'Bring the intensity up to at least 20.').max(100, 'Let us cap the intensity at 100.')
})

const timelineOptions = [
  {
    value: 'this-quarter',
    label: '90-day Sprint',
    detail: 'A focused push to ship the MVP soon.'
  },
  {
    value: 'six-months',
    label: '6-Month Momentum',
    detail: 'Build, iterate, and gather early champions.'
  },
  {
    value: 'year',
    label: '1-Year Evolution',
    detail: 'Grow thoughtfully and design for scale.'
  },
  {
    value: 'moonshot',
    label: 'Moonshot',
    detail: 'Long-term vision with giant leaps forward.'
  }
]

const dreamThemes = {
  aurora: {
    label: 'Aurora Pulse',
    gradient: 'linear-gradient(135deg, rgba(34,193,195,0.9) 0%, rgba(253,187,45,0.8) 100%)',
    accent: '#22c1c3'
  },
  tide: {
    label: 'Tidal Flow',
    gradient: 'linear-gradient(140deg, rgba(0,106,255,0.95) 0%, rgba(131,56,236,0.85) 100%)',
    accent: '#00a3ff'
  },
  ember: {
    label: 'Ember Glow',
    gradient: 'linear-gradient(135deg, rgba(255,94,0,0.95) 0%, rgba(255,195,113,0.8) 100%)',
    accent: '#ff5e00'
  }
}

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    dream: '',
    timeline: 'six-months',
    launchDate: '',
    intensity: 60,
    theme: 'aurora'
  })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const minLaunchDate = useMemo(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }, [])

  const validation = useMemo(() => launchSchema.safeParse(form), [form])
  const errors = useMemo(() => {
    if (validation.success) return {}
    return validation.error.flatten().fieldErrors
  }, [validation])

  const activeTheme = dreamThemes[form.theme]
  const vibeScore = useMemo(() => {
    const narrativeBoost = Math.min(40, form.dream.length / 3)
    const runwayBoost = form.timeline === 'moonshot' ? 12 : form.timeline === 'year' ? 8 : form.timeline === 'six-months' ? 4 : 2
    return Math.min(100, Math.round(form.intensity * 0.8 + narrativeBoost + runwayBoost))
  }, [form.dream.length, form.intensity, form.timeline])

  const handleChange = (field) => (event) => {
    const value = field === 'intensity' ? Number(event.target.value) : event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleThemeSwap = (themeKey) => () => {
    setForm((prev) => ({ ...prev, theme: themeKey }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const allTouched = {
      name: true,
      email: true,
      dream: true,
      timeline: true,
      launchDate: true,
      intensity: true
    }
    setTouched(allTouched)
    if (validation.success) {
      setSubmitted({ ...validation.data, theme: form.theme, vibeScore })
    }
  }

  const renderError = (field) => {
    if (!touched[field]) return null
    const message = errors[field]?.[0]
    if (!message) return null
    return <p className="field-error">{message}</p>
  }

  return (
    <div className="app-shell">
      <div
        className="ambient-backdrop"
        style={{ backgroundImage: activeTheme.gradient }}
      />
      <div className="app-content">
        <header className="app-header">
          <div>
            <h1>Dream Launch Lab</h1>
            <p>Blend your wild idea with Zod-powered clarity, then watch the vibe forecast update in real time.</p>
          </div>
          <div className="theme-switcher" role="group" aria-label="Theme switcher">
            {Object.entries(dreamThemes).map(([key, theme]) => (
              <button
                key={key}
                type="button"
                onClick={handleThemeSwap(key)}
                className={key === form.theme ? 'active' : ''}
                style={{ borderColor: theme.accent }}
              >
                <span className="theme-swatch" style={{ background: theme.gradient }} />
                {theme.label}
              </button>
            ))}
          </div>
        </header>

        <main className="dashboard">
          <section className="panel form-panel">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Dreamer Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Alex Futurebound"
                  value={form.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {renderError('name')}
              </div>

              <div className="field">
                <label htmlFor="email">Contact Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@nextwave.studio"
                  value={form.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {renderError('email')}
              </div>

              <div className="field">
                <label htmlFor="dream">Pitch Your Dream</label>
                <textarea
                  id="dream"
                  name="dream"
                  placeholder="Craft a short, vibrant pitch that captures the essence of your idea."
                  value={form.dream}
                  onChange={handleChange('dream')}
                  onBlur={handleBlur('dream')}
                  rows={4}
                />
                <div className="field-meta">
                  <span>{form.dream.length}/280</span>
                  {renderError('dream')}
                </div>
              </div>

              <div className="field">
                <span className="field-label">Timeline</span>
                <div className="timeline-grid">
                  {timelineOptions.map((option) => (
                    <label key={option.value} className={form.timeline === option.value ? 'active' : ''}>
                      <input
                        type="radio"
                        name="timeline"
                        value={option.value}
                        checked={form.timeline === option.value}
                        onChange={handleChange('timeline')}
                        onBlur={handleBlur('timeline')}
                      />
                      <span className="timeline-label">{option.label}</span>
                      <span className="timeline-detail">{option.detail}</span>
                    </label>
                  ))}
                </div>
                {renderError('timeline')}
              </div>

              <div className="combo-field">
                <div className="field">
                  <label htmlFor="launchDate">Target Launch Date</label>
                  <input
                    id="launchDate"
                    name="launchDate"
                    type="date"
                    min={minLaunchDate}
                    value={form.launchDate}
                    onChange={handleChange('launchDate')}
                    onBlur={handleBlur('launchDate')}
                  />
                  {renderError('launchDate')}
                </div>
                <div className="field">
                  <label htmlFor="intensity">Intensity</label>
                  <input
                    id="intensity"
                    name="intensity"
                    type="range"
                    min="20"
                    max="100"
                    value={form.intensity}
                    onChange={handleChange('intensity')}
                    onBlur={handleBlur('intensity')}
                  />
                  <div className="field-meta">
                    <span>{form.intensity}% Focus</span>
                  </div>
                  {renderError('intensity')}
                </div>
              </div>

              <button type="submit" className="primary-button">
                Generate Vibe Forecast
              </button>
            </form>
          </section>

          <section className="panel preview-panel">
            <div className="preview-card" style={{ backgroundImage: activeTheme.gradient }}>
              <div className="preview-header">
                <h2>Vibe Forecast</h2>
                <span className="vibe-score">{vibeScore}</span>
              </div>
              <div className="preview-body">
                <p className="preview-highlight">
                  {form.dream
                    ? `"${form.dream}"`
                    : 'Describe your dream to ignite the forecast.'}
                </p>
                <ul>
                  <li>
                    <strong>Mission Lead:</strong> {form.name || '—'}
                  </li>
                  <li>
                    <strong>Signal:</strong> {form.email || '—'}
                  </li>
                  <li>
                    <strong>Timeline:</strong> {timelineOptions.find((option) => option.value === form.timeline)?.label}
                  </li>
                  <li>
                    <strong>Launch Date:</strong> {form.launchDate || '—'}
                  </li>
                </ul>
                <p className="preview-footnote">
                  {form.intensity >= 80
                    ? '🔥 High-octane energy detected. Make sure the crew can keep up!'
                    : form.intensity <= 35
                      ? '🌙 Soft launch mode active. Add more spark if you crave speed.'
                      : '⚡ Balanced drive locked in. Perfect for sustainable momentum.'}
                </p>
              </div>
              {submitted && (
                <div className="preview-footer">
                  <span>Zod Validation ✓</span>
                  <p>
                    Saved playbook for <strong>{submitted.name}</strong>. We will reach out at {submitted.email} with curated launch rituals.
                  </p>
                </div>
              )}
            </div>
            <div className="tip-card" style={{ borderColor: activeTheme.accent }}>
              <h3>What makes this special?</h3>
              <p>
                Every input runs through a Zod schema, so your plan stays crisp while React keeps the experience playful. Swap
                themes, shape timelines, and feel the vibe respond instantly.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
