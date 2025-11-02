import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import './App.css'

const heroSchema = z.object({
  badge: z.string(),
  title: z.string(),
  tagline: z.string(),
  primaryCta: z.object({
    label: z.string(),
    href: z.string().url(),
  }),
  secondaryCta: z.object({
    label: z.string(),
    href: z.string().url(),
  }),
})

const featureSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
)

const blueprintSchema = z.object({
  id: z.string(),
  layers: z.array(
    z.object({
      name: z.string(),
      focus: z.string(),
      schema: z.string(),
    }),
  ),
  successMetric: z.string(),
})

const projectTypeEnum = z.enum(['api', 'dashboard', 'sdk'])

const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Use a valid email'),
  projectType: projectTypeEnum,
  idea: z
    .string()
    .min(12, 'Tell us a bit more (min 12 characters)')
    .max(500, 'Keep it under 500 characters'),
})

const heroSeed = {
  badge: 'Zod-first Developer Studio',
  title: 'Ship type-safe products without guesswork',
  tagline:
    'We design, validate, and deliver developer tooling where Zod schemas define the contract from pitch to production.',
  primaryCta: { label: 'View the blueprint', href: '#blueprint' },
  secondaryCta: { label: 'Talk to the team', href: '#contact' },
}

const heroResult = heroSchema.safeParse(heroSeed)
const heroContent = heroResult.success ? heroResult.data : heroSeed

const featuresSeed = [
  {
    title: 'Schema-driven UX',
    description:
      'We start with Zod definitions that power docs, forms, and SDKs so your users get instant feedback.',
    icon: '📐',
  },
  {
    title: 'Executable Specs',
    description:
      'Schemas double as integration tests and type generators, letting QA shift left without friction.',
    icon: '⚙️',
  },
  {
    title: 'Runtime confidence',
    description:
      'Contracts fail fast in production with human-readable errors and automated rollbacks.',
    icon: '🛡️',
  },
]

const featuresResult = featureSchema.safeParse(featuresSeed)
const features = featuresResult.success ? featuresResult.data : featuresSeed

const blueprintSeed = {
  id: 'z-first-launchpad',
  layers: [
    {
      name: 'Contracts',
      focus: 'Derive TS types, OpenAPI, and docs from a single Zod source.',
      schema: "z.object({ slug: z.string(), status: z.enum(['draft','live']) })",
    },
    {
      name: 'Delivery',
      focus: 'CI verifies new builds against published schemas before deploy.',
      schema: 'releasePipelineSchema',
    },
    {
      name: 'Feedback',
      focus: 'Runtime analytics flag invalid payloads and generate shrink-wrapped bug reports.',
      schema: 'eventStreamSchema',
    },
  ],
  successMetric: 'Release twice as fast with zero breaking changes reported.',
}

const blueprintResult = blueprintSchema.safeParse(blueprintSeed)
const blueprint = blueprintResult.success ? blueprintResult.data : blueprintSeed

const snippet = `import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  API_URL: z.string().url(),
  RETRY_WINDOW: z.number().int().min(1).max(10),
});

type Environment = z.infer<typeof environmentSchema>;
`

const schemaPlaygroundPresets = [
  {
    id: 'webhook',
    label: 'Webhook event',
    description: 'Validate inbound events before they sync across your stack.',
    schema: z.object({
      event: z.enum(['user.created', 'user.updated', 'invoice.paid']),
      timestamp: z.string().datetime(),
      payload: z.object({
        id: z.string().min(6),
        email: z.string().email(),
        roles: z.array(z.string()).min(1),
      }),
    }),
    schemaSource: `const webhookEventSchema = z.object({
  event: z.enum(['user.created', 'user.updated', 'invoice.paid']),
  timestamp: z.string().datetime(),
  payload: z.object({
    id: z.string().min(6),
    email: z.string().email(),
    roles: z.array(z.string()).min(1),
  }),
});`,
    example: `{
  "event": "user.created",
  "timestamp": "2026-02-08T12:34:56.000Z",
  "payload": {
    "id": "user_934201",
    "email": "jamie@devstudio.dev",
    "roles": ["builder", "admin"]
  }
}`,
  },
  {
    id: 'feature-flag',
    label: 'Feature flag',
    description: 'Enforce type-safe config for experiment rollouts.',
    schema: z.object({
      key: z.string(),
      status: z.enum(['off', 'beta', 'ga']),
      rollout: z
        .object({
          percent: z.number().min(0).max(100),
          regions: z.array(z.string()).default([]),
        })
        .strict(),
      guard: z.object({
        minVersion: z.string().regex(/^v\d+\.\d+\.\d+$/),
        audience: z.enum(['internal', 'design-partners', 'public']),
      }),
    }),
    schemaSource: `const featureFlagSchema = z.object({
  key: z.string(),
  status: z.enum(['off', 'beta', 'ga']),
  rollout: z.object({
    percent: z.number().min(0).max(100),
    regions: z.array(z.string()).default([]),
  }).strict(),
  guard: z.object({
          minVersion: z.string().regex(/^v\\d+\\.\\d+\\.\\d+$/),
    audience: z.enum(['internal', 'design-partners', 'public']),
  }),
});`,
    example: `{
  "key": "workspace-insights",
  "status": "beta",
  "rollout": {
    "percent": 25,
    "regions": ["us-east-1", "eu-central-1"]
  },
  "guard": {
    "minVersion": "v2.3.0",
    "audience": "design-partners"
  }
}`,
  },
  {
    id: 'cli-command',
    label: 'CLI command',
    description: 'Lock input shape for developer tooling commands.',
    schema: z.object({
      command: z.string(),
      args: z.array(z.string()),
      flags: z
        .record(z.union([z.string(), z.boolean(), z.number()]))
        .default({}),
    }),
    schemaSource: `const cliCommandSchema = z.object({
  command: z.string(),
  args: z.array(z.string()),
  flags: z.record(z.union([z.string(), z.boolean(), z.number()])).default({}),
});`,
    example: `{
  "command": "deploy",
  "args": ["api"],
  "flags": {
    "dryRun": true,
    "profile": "prod",
    "retry": 2
  }
}`,
  },
]

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: projectTypeEnum.options[0],
    idea: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [selectedPresetId, setSelectedPresetId] = useState(
    schemaPlaygroundPresets[0].id,
  )
  const [sandboxInput, setSandboxInput] = useState(
    schemaPlaygroundPresets[0].example,
  )

  const liveValidation = useMemo(
    () => inquirySchema.safeParse(formData),
    [formData],
  )

  const activePreset = useMemo(
    () =>
      schemaPlaygroundPresets.find((preset) => preset.id === selectedPresetId) ??
      schemaPlaygroundPresets[0],
    [selectedPresetId],
  )

  useEffect(() => {
    setSandboxInput(activePreset.example)
  }, [activePreset])

  const sandboxResult = useMemo(() => {
    try {
      const raw = JSON.parse(sandboxInput)
      const validation = activePreset.schema.safeParse(raw)
      if (validation.success) {
        return {
          status: 'success',
          preview: JSON.stringify(validation.data, null, 2),
        }
      }

      const issues = validation.error.issues.map((issue) => {
        const path = issue.path.length ? issue.path.join('.') : 'root'
        return `${path}: ${issue.message}`
      })

      return {
        status: 'error',
        message: 'Schema mismatch detected.',
        issues,
      }
    } catch (error) {
      return {
        status: 'error',
        message:
          error instanceof Error
            ? `JSON parse error — ${error.message}`
            : 'Unable to parse JSON payload.',
      }
    }
  }, [activePreset, sandboxInput])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
    setStatus(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = inquirySchema.safeParse(formData)

    if (result.success) {
      setStatus({
        tone: 'success',
        message: 'Request captured — expect a reply within one business day.',
      })
      setErrors({})
      setFormData({
        name: '',
        email: '',
        projectType: projectTypeEnum.options[0],
        idea: '',
      })
    } else {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(fieldErrors)
      setStatus({
        tone: 'error',
        message: 'Fix the highlighted fields to satisfy the schema.',
      })
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <span className="badge">{heroContent.badge}</span>
        <h1>{heroContent.title}</h1>
        <p className="tagline">{heroContent.tagline}</p>
        <div className="cta-row">
          <a className="button primary" href={heroContent.primaryCta.href}>
            {heroContent.primaryCta.label}
          </a>
          <a className="button ghost" href={heroContent.secondaryCta.href}>
            {heroContent.secondaryCta.label}
          </a>
        </div>
      </header>

      <main>
        <section className="section features" id="services">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="icon">{feature.icon}</div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="section blueprint" id="blueprint">
          <div className="section-heading">
            <h2>Blueprint</h2>
            <p>Validated upfront by {blueprint.id}</p>
          </div>
          <ul className="layer-list">
            {blueprint.layers.map((layer) => (
              <li key={layer.name} className="layer-item">
                <h3>{layer.name}</h3>
                <p>{layer.focus}</p>
                <code>{layer.schema}</code>
              </li>
            ))}
          </ul>
          <p className="success-metric">{blueprint.successMetric}</p>
        </section>

        <section className="section snippet" aria-label="Schema snippet">
          <div className="section-heading">
            <h2>Reusable Schema</h2>
            <p>Zod definitions scale from runtime checks to TypeScript types.</p>
          </div>
          <pre>
            <code>{snippet}</code>
          </pre>
        </section>

        <section className="section playground" id="playground">
          <div className="section-heading">
            <h2>Schema Playground</h2>
            <p>
              Swap contracts and watch Zod validate JSON payloads as you type in
              real time.
            </p>
          </div>
          <div className="playground-body">
            <div className="preset-list" role="tablist" aria-label="Schema presets">
              {schemaPlaygroundPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  role="tab"
                  aria-selected={preset.id === activePreset.id}
                  className={`preset-button ${
                    preset.id === activePreset.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedPresetId(preset.id)}
                >
                  <span className="preset-label">{preset.label}</span>
                  <span className="preset-description">{preset.description}</span>
                </button>
              ))}
            </div>

            <div className="playground-panel" role="tabpanel">
              <div className="schema-display">
                <span className="schema-label">Active Schema</span>
                <pre>
                  <code>{activePreset.schemaSource}</code>
                </pre>
              </div>

              <div className="editor-display">
                <label htmlFor="schema-input">Payload</label>
                <textarea
                  id="schema-input"
                  value={sandboxInput}
                  onChange={(event) => setSandboxInput(event.target.value)}
                  spellCheck="false"
                />
                <div
                  className={`playground-status ${sandboxResult.status}`}
                  role="status"
                >
                  {sandboxResult.status === 'success'
                    ? '✅ Schema satisfied — payload is production ready.'
                    : sandboxResult.message ||
                      '⚠️ Adjust the JSON to satisfy the schema.'}
                </div>

                {sandboxResult.status === 'success' && sandboxResult.preview && (
                  <details className="validated-output" open>
                    <summary>Normalized output</summary>
                    <pre>
                      <code>{sandboxResult.preview}</code>
                    </pre>
                  </details>
                )}

                {sandboxResult.status === 'error' && (
                  <ul className="issue-list">
                    {sandboxResult.message && <li>{sandboxResult.message}</li>}
                    {sandboxResult.issues?.map((issue) => (
                      <li key={issue}>{issue}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section form-section" id="contact">
          <div className="section-heading">
            <h2>Start a Zod-first project</h2>
            <p>Every field below links back to the schema — no surprises.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <label>
              Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Developer"
                aria-invalid={Boolean(errors.name)}
                aria-describedby="name-error"
              />
              {errors.name && (
                <span id="name-error" className="error">
                  {errors.name[0]}
                </span>
              )}
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@team.dev"
                aria-invalid={Boolean(errors.email)}
                aria-describedby="email-error"
              />
              {errors.email && (
                <span id="email-error" className="error">
                  {errors.email[0]}
                </span>
              )}
            </label>

            <label>
              Project type
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                aria-invalid={Boolean(errors.projectType)}
                aria-describedby="type-error"
              >
                {projectTypeEnum.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <span id="type-error" className="error">
                  {errors.projectType[0]}
                </span>
              )}
            </label>

            <label>
              Project description
              <textarea
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                placeholder="What are we building together?"
                rows={4}
                aria-invalid={Boolean(errors.idea)}
                aria-describedby="idea-error"
              />
              {errors.idea && (
                <span id="idea-error" className="error">
                  {errors.idea[0]}
                </span>
              )}
            </label>

            <button type="submit" className="button primary">
              Validate the brief
            </button>

            {status && (
              <p className={`form-status ${status.tone}`}>
                {status.message}
              </p>
            )}
            <p className="live-result">
              {liveValidation.success
                ? '✅ Schema satisfied — ready for hand-off.'
                : '🚧 Schema pending — fill in the required fields.'}
            </p>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>Zod-first delivery crafted for developer experience teams.</p>
      </footer>
    </div>
  )
}

export default App
