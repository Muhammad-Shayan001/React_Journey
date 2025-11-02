import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'react-journey-animated-todos'

const PRIORITY_OPTIONS = [
  { value: 'high', label: 'High impact' },
  { value: 'medium', label: 'Medium focus' },
  { value: 'low', label: 'Nice to have' }
]

const FILTERS = {
  all: {
    label: 'All',
    predicate: () => true
  },
  active: {
    label: 'Active',
    predicate: (todo) => !todo.completed
  },
  completed: {
    label: 'Completed',
    predicate: (todo) => todo.completed
  },
  favorites: {
    label: 'Favorites',
    predicate: (todo) => todo.favorite
  }
}

const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2
}

const starterTodos = [
  {
    id: 'welcome-plan',
    title: 'Explore the new animated workspace',
    note: 'Toggle states, favorite tasks, and enjoy the motion design.',
    priority: 'high',
    completed: false,
    favorite: true,
    createdAt: Date.now() - 1000 * 60 * 30
  },
  {
    id: 'create-first',
    title: 'Add your first real task',
    note: 'Use the form above, set a priority, and press enter to see it pop in.',
    priority: 'medium',
    completed: false,
    favorite: false,
    createdAt: Date.now() - 1000 * 60 * 12
  },
  {
    id: 'celebrate-progress',
    title: 'Mark tasks complete to trigger the glow',
    note: 'Clear completed items to keep your list focused.',
    priority: 'low',
    completed: false,
    favorite: false,
    createdAt: Date.now() - 1000 * 60 * 4
  }
]

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

const cloneStarterTodos = () => starterTodos.map((todo) => ({ ...todo }))

const priorityValues = PRIORITY_OPTIONS.map((option) => option.value)
const fallbackPriority = priorityValues[1] ?? priorityValues[0] ?? 'medium'

const normalizeTodo = (candidate) => {
  if (!candidate || typeof candidate !== 'object') {
    return null
  }
  const title = typeof candidate.title === 'string' ? candidate.title.trim() : ''
  const note = typeof candidate.note === 'string' ? candidate.note : ''
  const priority = priorityValues.includes(candidate.priority)
    ? candidate.priority
    : fallbackPriority

  return {
    id: candidate.id || createId(),
    title: title || 'Untitled task',
    note,
    priority,
    completed: Boolean(candidate.completed),
    favorite: Boolean(candidate.favorite),
    createdAt: typeof candidate.createdAt === 'number' ? candidate.createdAt : Date.now()
  }
}

const loadTodos = () => {
  if (typeof window === 'undefined') {
      return cloneStarterTodos()
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
        return cloneStarterTodos()
    }
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) {
        return cloneStarterTodos()
    }
    const normalized = parsed.map(normalizeTodo).filter(Boolean)
    return normalized.length ? normalized : cloneStarterTodos()
  } catch (error) {
    console.warn('Failed to parse saved todos, using starter set.', error)
      return cloneStarterTodos()
  }
}

function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [filterKey, setFilterKey] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [formState, setFormState] = useState({
    title: '',
    note: '',
    priority: PRIORITY_OPTIONS[0].value
  })
  const [enteringId, setEnteringId] = useState(null)
  const [celebrating, setCelebrating] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    if (todos.length === 0) {
      setCelebrating(false)
      return
    }
    const allCompleted = todos.every((todo) => todo.completed)
    if (allCompleted) {
      setCelebrating(true)
      const timer = setTimeout(() => setCelebrating(false), 1600)
      return () => clearTimeout(timer)
    }
    setCelebrating(false)
  }, [todos])

  const filteredTodos = useMemo(() => {
    const filter = FILTERS[filterKey] ?? FILTERS.all
    const lowered = searchTerm.trim().toLowerCase()
    return todos
      .filter((todo) => filter.predicate(todo))
      .filter((todo) => {
        if (!lowered) {
          return true
        }
        const haystack = `${todo.title} ${todo.note}`.toLowerCase()
        return haystack.includes(lowered)
      })
      .sort((a, b) => {
        if (a.favorite !== b.favorite) {
          return a.favorite ? -1 : 1
        }
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        }
        return b.createdAt - a.createdAt
      })
  }, [todos, filterKey, searchTerm])

  const totalCount = todos.length
  const completedCount = todos.filter((todo) => todo.completed).length
  const completionRatio = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedTitle = formState.title.trim()
    const trimmedNote = formState.note.trim()
    if (!trimmedTitle) {
      return
    }
    const newTodo = {
      id: createId(),
      title: trimmedTitle,
      note: trimmedNote,
      priority: formState.priority,
      completed: false,
      favorite: false,
      createdAt: Date.now()
    }
    setTodos((current) => [newTodo, ...current])
    setFormState({ title: '', note: '', priority: formState.priority })
    setEnteringId(newTodo.id)
      setTimeout(() => {
        setEnteringId(null)
      }, 700)
  }

  const handleToggleComplete = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed
            }
          : todo
      )
    )
  }

  const handleDelete = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  const handleToggleFavorite = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              favorite: !todo.favorite
            }
          : todo
      )
    )
  }

  const handleClearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.completed))
  }

  const handleReset = () => {
    setTodos(() => cloneStarterTodos())
    setFilterKey('all')
    setSearchTerm('')
  }

  const isEmpty = filteredTodos.length === 0

  return (
    <div className={`app-shell ${celebrating ? 'is-celebrating' : ''}`}>
      <div className="floating-orbs" aria-hidden="true" />
      <header className="app-header">
        <div className="title-stack">
          <h1>Pulse Todo Studio</h1>
          <p className="subtitle">
            Craft your day with style. Add tasks, set priorities, and watch each step come alive with motion.
          </p>
        </div>
        <section className="dashboard">
          <div className="stat-card">
            <span className="stat-label">Completed</span>
            <strong className="stat-value">{completedCount}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total</span>
            <strong className="stat-value">{totalCount}</strong>
          </div>
          <div className="progress-card">
            <div className="progress-head">
              <span className="stat-label">Momentum</span>
              <span className="progress-value">{completionRatio}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${completionRatio}%` }} />
            </div>
          </div>
        </section>
      </header>

      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="field" htmlFor="todo-title">
            <span className="field-label">Title</span>
            <input
              id="todo-title"
              type="text"
              placeholder="Plan the perfect launch..."
              value={formState.title}
              onChange={(event) => setFormState((state) => ({ ...state, title: event.target.value }))}
            />
          </label>
          <label className="field" htmlFor="todo-note">
            <span className="field-label">Notes</span>
            <textarea
              id="todo-note"
              placeholder="Add the why, the how, or a quick reminder. Optional but powerful."
              value={formState.note}
              onChange={(event) => setFormState((state) => ({ ...state, note: event.target.value }))}
              rows={3}
            />
          </label>
        </div>
        <div className="control-bar">
          <div className="priority-selector">
            {PRIORITY_OPTIONS.map((option) => (
              <label key={option.value} className={`priority-pill ${formState.priority === option.value ? 'is-active' : ''}`}>
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={formState.priority === option.value}
                  onChange={() => setFormState((state) => ({ ...state, priority: option.value }))}
                />
                <span className="pill-label">{option.label}</span>
              </label>
            ))}
          </div>
          <button className="primary-cta" type="submit">
            Add task
          </button>
        </div>
      </form>

      <section className="toolbar">
        <div className="filter-group" role="tablist" aria-label="Filter tasks">
          {Object.entries(FILTERS).map(([key, config]) => (
            <button
              key={key}
              type="button"
              role="tab"
              className={`filter-chip ${filterKey === key ? 'is-selected' : ''}`}
              onClick={() => setFilterKey(key)}
            >
              {config.label}
            </button>
          ))}
        </div>
        <div className="toolbar-actions">
          <div className="search-field">
            <input
              type="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <button className="ghost-button" type="button" onClick={handleClearCompleted} disabled={completedCount === 0}>
            Clear completed
          </button>
          <button className="ghost-button" type="button" onClick={handleReset}>
            Reset demo
          </button>
        </div>
      </section>

      <section className="todo-list-wrapper">
        {isEmpty ? (
          <div className="empty-state">
            <div className="empty-illustration" aria-hidden="true">
              <div className="spark" />
              <div className="spark" />
              <div className="spark" />
            </div>
            <h2>No tasks match yet</h2>
            <p>Add something above or tweak your filters to see the magic.</p>
          </div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => {
              const isEntering = todo.id === enteringId
              return (
                <li
                  key={todo.id}
                  className={`todo-card ${todo.completed ? 'is-complete' : ''} ${todo.favorite ? 'is-favorite' : ''} ${isEntering ? 'is-entering' : ''}`}
                >
                  <button
                    type="button"
                    className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                    onClick={() => handleToggleComplete(todo.id)}
                    aria-pressed={todo.completed}
                    aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
                  >
                    <span className="checkbox-box" aria-hidden="true" />
                  </button>
                  <div className="todo-content">
                    <div className="todo-heading">
                      <h3 className="todo-title">{todo.title}</h3>
                      <span className={`priority-tag priority-${todo.priority}`}>{todo.priority}</span>
                    </div>
                    {todo.note && <p className="todo-note">{todo.note}</p>}
                    <footer className="todo-meta">
                      <span className="meta-item">Added {new Date(todo.createdAt).toLocaleString()}</span>
                    </footer>
                  </div>
                  <div className="todo-actions">
                    <button
                      type="button"
                      className={`icon-button ${todo.favorite ? 'is-active' : ''}`}
                      onClick={() => handleToggleFavorite(todo.id)}
                      aria-pressed={todo.favorite}
                    >
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        role="presentation"
                        focusable="false"
                      >
                        <path
                          d="M12 4.248l1.755 3.555 3.922.57-2.838 2.767.67 3.902L12 13.896l-3.509 1.846.67-3.902-2.838-2.767 3.922-.57z"
                        />
                      </svg>
                      <span className="icon-label">Favorite</span>
                    </button>
                    <button type="button" className="icon-button" onClick={() => handleDelete(todo.id)}>
                      <svg className="icon" viewBox="0 0 24 24" role="presentation" focusable="false">
                        <path d="M6 7h12l-.844 13.5H6.844zM9 4h6l1 2H8z" />
                      </svg>
                      <span className="icon-label">Delete</span>
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App
