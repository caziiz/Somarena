import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Crown,
  Gamepad2,
  LayoutDashboard,
  Map,
  MessageSquare,
  Shield,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react'
import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
    },
  },
})

const games = [
  {
    name: 'PUBG Mobile',
    tag: 'Battle Royale',
    description: 'Squad-focused competitive play with tactical pressure and high-stakes pushes.',
  },
  {
    name: 'eFootball',
    tag: 'Football',
    description: 'Precision tactics, rivalry matches, and skill-driven competitive play.',
  },
]

const tournamentPreview = ['Somalia Community Cup', 'Nairobi Clash', 'Weekend Showdown']
const clanPreview = ['Mogadishu Legends', 'Hargeisa Strikers', 'Garowe Guardians']
const publicFeatures = ['Arena feed preview', 'Community competitions', 'Esports leaderboards', 'Clan discovery']

function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" aria-label="SomArena home">
          <span className="brand-mark">S</span>
          <span>
            <strong>SomArena</strong>
            <small>The Home of Somali Gamers</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/games">Games</NavLink>
          <NavLink to="/tournaments">Tournaments</NavLink>
          <NavLink to="/clans">Clans</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="header-actions">
          <Link to="/login" className="button button-ghost">
            Login
          </Link>
          <Link to="/register" className="button button-primary">
            Join Now
          </Link>
        </div>
      </div>
    </header>
  )
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="empty-state">
      <ShieldCheck size={28} />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <Header />
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand brand-footer">
              <span className="brand-mark">S</span>
              <span>
                <strong>SomArena</strong>
                <small>The Home of Somali Gamers</small>
              </span>
            </div>
          </div>

          <div>
            <h4>Platform</h4>
            <ul>
              <li>Games</li>
              <li>Tournaments</li>
              <li>Clans</li>
              <li>Leaderboard</li>
            </ul>
          </div>

          <div>
            <h4>Community</h4>
            <ul>
              <li>About</li>
              <li>Support</li>
              <li>Rules</li>
              <li>Safety</li>
            </ul>
          </div>

          <div>
            <h4>Follow</h4>
            <ul>
              <li>Discord</li>
              <li>X</li>
              <li>Instagram</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PublicHomePage() {
  return (
    <MainLayout>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Somalia’s competitive gaming hub</span>
            <h1>Rise with the Somali gaming community.</h1>
            <p>
              SomArena brings players together for tournaments, clan competition, community moments,
              and esports growth across Somalia and the diaspora.
            </p>
            <div className="cta-row">
              <Link to="/register" className="button button-primary">
                Create account <ArrowRight size={18} />
              </Link>
              <Link to="/tournaments" className="button button-secondary">
                Explore tournaments
              </Link>
            </div>
            <ul className="feature-list">
              {publicFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="hero-panel panel">
            <div className="mini-badges">
              <span className="status-pill">Live Arena</span>
              <span className="status-pill status-muted">Community ready</span>
            </div>
            <div className="stats-surface">
              <div>
                <strong>2</strong>
                <span>Supported games</span>
              </div>
              <div>
                <strong>Live</strong>
                <span>Community-driven</span>
              </div>
            </div>
            <div className="float-card">
              <Gamepad2 size={18} />
              <div>
                <p>Featured games</p>
                <h3>PUBG Mobile • eFootball</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Supported games</span>
            <h2>Built for the games Somali players love.</h2>
          </div>
        </div>

        <div className="card-grid three-up">
          {games.map((game) => (
            <article key={game.name} className="panel card">
              <div className="card-icon">
                <Crown size={18} />
              </div>
              <p className="tag">{game.tag}</p>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Community</span>
            <h2>Featured competitions and teams.</h2>
          </div>
        </div>

        <div className="two-column-grid">
          <div className="panel list-panel">
            <h3>Featured tournaments</h3>
            <ul className="stack-list">
              {tournamentPreview.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="panel list-panel">
            <h3>Featured clans</h3>
            <ul className="stack-list">
              {clanPreview.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="panel leaderboard-panel">
          <div className="section-heading narrow">
            <div>
              <span className="eyebrow">Leaderboard preview</span>
              <h2>Rankings adapt to the backend data.</h2>
            </div>
          </div>
          <EmptyState
            title="Leaderboard data is not available yet"
            message="When the backend exposes leaderboard endpoints, this section will render the live rankings automatically."
          />
        </div>
      </section>

      <section className="container section-block">
        <div className="panel feed-panel">
          <div className="section-heading narrow">
            <div>
              <span className="eyebrow">Arena feed preview</span>
              <h2>Public community moments appear here.</h2>
            </div>
          </div>
          <EmptyState
            title="No public arena feed data"
            message="The frontend respects visibility rules and only shows feed content that the backend authorizes."
          />
        </div>
      </section>

      <section className="container section-block">
        <div className="cta-banner panel">
          <div>
            <span className="eyebrow">Ready to play</span>
            <h2>Build your profile and join the next Somali esports moment.</h2>
          </div>
          <Link to="/register" className="button button-primary">
            Sign up now
          </Link>
        </div>
      </section>
    </MainLayout>
  )
}

function GamesPage() {
  return (
    <MainLayout>
      <div className="container page-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Games</span>
            <h1>Supported titles</h1>
          </div>
        </div>
        <div className="card-grid two-up">
          {games.map((game) => (
            <article key={game.name} className="panel card">
              <div className="card-icon">
                <Gamepad2 size={18} />
              </div>
              <p className="tag">{game.tag}</p>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

function TournamentsPage() {
  return (
    <MainLayout>
      <div className="container page-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Tournaments</span>
            <h1>Live and upcoming competitions</h1>
          </div>
        </div>
        <EmptyState
          title="No tournament data exposed"
          message="The tournament list will render from the real backend when the API is connected to this frontend."
        />
      </div>
    </MainLayout>
  )
}

function TournamentDetailPage() {
  return (
    <MainLayout>
      <div className="container page-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Tournament</span>
            <h1>Bracket and participant details</h1>
          </div>
        </div>
        <EmptyState
          title="Tournament detail view pending backend contract"
          message="This page is ready for live bracket, registration, draw, and result data once the real backend endpoints are confirmed."
        />
      </div>
    </MainLayout>
  )
}

function ClansPage() {
  return (
    <MainLayout>
      <div className="container page-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Clans</span>
            <h1>Find a team and build chemistry</h1>
          </div>
        </div>
        <EmptyState
          title="Clan directory unavailable"
          message="The clan list is intentionally empty until the real backend provides the clan API and visibility rules."
        />
      </div>
    </MainLayout>
  )
}

function ClanDetailPage() {
  return (
    <MainLayout>
      <div className="container page-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Clan</span>
            <h1>Clan profile and roster</h1>
          </div>
        </div>
        <EmptyState
          title="Clan detail view pending API support"
          message="This page will surface member roles, join requests, announcements, and history once the backend contract is connected."
        />
      </div>
    </MainLayout>
  )
}

function LeaderboardPage() {
  return (
    <MainLayout>
      <div className="container page-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Leaderboard</span>
            <h1>Competitive rankings</h1>
          </div>
        </div>
        <EmptyState
          title="No leaderboard API available"
          message="The frontend will render official rankings and pagination only when the backend exposes the ranking source."
        />
      </div>
    </MainLayout>
  )
}

function AboutPage() {
  return (
    <MainLayout>
      <div className="container page-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">About</span>
            <h1>Built for Somali gamers.</h1>
          </div>
        </div>
        <div className="panel page-copy">
          <p>
            SomArena is the digital home for Somali gamers, teams, and competitive communities. The
            platform supports community play, tournaments, clan growth, profile visibility, and esports
            discovery.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

function AuthPage({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="auth-layout">
      <div className="auth-card panel">
        <div className="auth-brand">
          <span className="brand-mark">S</span>
          <div>
            <strong>SomArena</strong>
            <small>{subtitle}</small>
          </div>
        </div>

        <h1>{title}</h1>
        {children}
      </div>
    </div>
  )
}

function LoginPage() {
  return (
    <AuthPage title="Welcome back" subtitle="The Home of Somali Gamers">
      <form className="form-stack">
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input type="password" placeholder="••••••••" />
        </label>
        <button type="button" className="button button-primary full-width">
          Login
        </button>
        <div className="form-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Create account</Link>
        </div>
      </form>
    </AuthPage>
  )
}

function RegisterPage() {
  return (
    <AuthPage title="Create your account" subtitle="Join the community">
      <form className="form-stack">
        <label>
          Username
          <input type="text" placeholder="gamername" />
        </label>
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Create a secure password" />
        </label>
        <button type="button" className="button button-primary full-width">
          Register
        </button>
        <div className="form-links">
          <Link to="/login">Already have an account?</Link>
        </div>
      </form>
    </AuthPage>
  )
}

function ForgotPasswordPage() {
  return (
    <AuthPage title="Reset your password" subtitle="Account recovery">
      <form className="form-stack">
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <button type="button" className="button button-primary full-width">
          Send reset link
        </button>
      </form>
    </AuthPage>
  )
}

function ResetPasswordPage() {
  return (
    <AuthPage title="Choose a new password" subtitle="Secure access">
      <form className="form-stack">
        <label>
          New password
          <input type="password" placeholder="New password" />
        </label>
        <label>
          Confirm password
          <input type="password" placeholder="Confirm password" />
        </label>
        <button type="button" className="button button-primary full-width">
          Update password
        </button>
      </form>
    </AuthPage>
  )
}

function VerifyEmailPage() {
  return (
    <AuthPage title="Verify your email" subtitle="Complete setup">
      <div className="info-box">
        <BadgeCheck size={20} />
        <p>Your email verification flow is ready to connect to the backend’s real verification API.</p>
      </div>
    </AuthPage>
  )
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className="loading-shell">Loading your SomArena session...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function AppDashboardShell() {
  return (
    <div className="app-shell app-shell-dashboard">
      <aside className="sidebar">
        <div className="brand sidebar-brand">
          <span className="brand-mark">S</span>
          <span>
            <strong>SomArena</strong>
            <small>Dashboard</small>
          </span>
        </div>

        <nav className="sidebar-nav" aria-label="App navigation">
          <NavLink to="/arena"><LayoutDashboard size={16} /> Arena</NavLink>
          <NavLink to="/dashboard"><LayoutDashboard size={16} /> Dashboard</NavLink>
          <NavLink to="/games"><Gamepad2 size={16} /> Games</NavLink>
          <NavLink to="/clans"><Users size={16} /> Clans</NavLink>
          <NavLink to="/tournaments"><Trophy size={16} /> Tournaments</NavLink>
          <NavLink to="/matches"><Map size={16} /> Matches</NavLink>
          <NavLink to="/leaderboard"><Shield size={16} /> Leaderboard</NavLink>
          <NavLink to="/messages"><MessageSquare size={16} /> Messages</NavLink>
          <NavLink to="/notifications"><Bell size={16} /> Notifications</NavLink>
          <NavLink to="/wallet"><Crown size={16} /> Wallet</NavLink>
          <NavLink to="/profile"><Users size={16} /> Profile</NavLink>
        </nav>
      </aside>

      <div className="content-panel">
        <header className="dashboard-header">
          <div>
            <span className="eyebrow">Authenticated workspace</span>
            <h2>SomArena dashboard</h2>
          </div>
          <button className="button button-primary">Create match</button>
        </header>

        <Routes>
          <Route path="/dashboard" element={<EmptyState title="Dashboard is ready" message="Connect the real API to fill this section with live metrics, notifications, and account activity." />} />
          <Route path="/arena" element={<EmptyState title="Arena feed unavailable" message="Only authorized backend content will appear here." />} />
          <Route path="/games" element={<EmptyState title="Games section" message="PUBG Mobile and eFootball are the supported titles in the current configuration." />} />
          <Route path="/clans" element={<EmptyState title="Clan tools" message="Roles, join requests, and roster actions are gated by the backend permissions." />} />
          <Route path="/tournaments" element={<EmptyState title="Tournament tools" message="Registration, payment, and bracket logic are shown only after backend confirmation." />} />
          <Route path="/matches" element={<EmptyState title="Match tools" message="Score verification and dispute workflow remain backend-controlled." />} />
          <Route path="/leaderboard" element={<EmptyState title="Rankings" message="Leaderboard data will be displayed using the backend-provided ranking source." />} />
          <Route path="/messages" element={<EmptyState title="Messages" message="Private messaging remains behind the backend chat contract and auth checks." />} />
          <Route path="/notifications" element={<EmptyState title="Notifications" message="Unread counts and toast updates are driven by the backend API." />} />
          <Route path="/wallet" element={<EmptyState title="Wallet" message="Transactions, deposits, and withdrawals will only display after backend confirmation." />} />
          <Route path="/profile" element={<EmptyState title="Profile" message="User details, avatar, and profile stats appear here when the backend profile API is connected." />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<PublicHomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
          <Route path="/clans" element={<ClansPage />} />
          <Route path="/clans/:id" element={<ClanDetailPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          <Route
            path="/*"
            element={
              <RequireAuth>
                <AppDashboardShell />
              </RequireAuth>
            }
          />
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
