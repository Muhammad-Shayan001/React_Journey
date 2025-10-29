import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2 font-bold" href="/">
              <span className="hidden font-bold sm:inline-block">Acme Inc</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/docs">Docs</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/components">Components</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/blog">Blog</a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
             <div className="w-full flex-1 md:w-auto md:flex-none">
             </div>
             <nav className="flex items-center">
                <Button variant="outline" className="ml-auto mr-2">Login</Button>
                <Button>Sign Up</Button>
             </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Build your next idea even faster.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Beautifully designed components that you can copy and paste into your
              apps. Accessible. Customizable. Open Source.
            </p>
            <div className="space-x-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">View Demo</Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              This project is an experiment to see how a modern app, with features like auth, subscriptions, API routes, and static pages would work in Next.js 13 app dir.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Next.js 13</CardTitle>
                <CardDescription>
                  App dir, Routing, Layouts, Loading UI and API routes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Learn more about the new features in Next.js 13.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>React 18</CardTitle>
                <CardDescription>
                  Server and Client Components. Use key features like Suspense.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Latest React features are supported out of the box.</p>
              </CardContent>
            </Card>
            <Card>
               <CardHeader>
                <CardTitle>Database</CardTitle>
                <CardDescription>
                  ORM using Prisma and deployed on PlanetScale.
                </CardDescription>
              </CardHeader>
               <CardContent>
                <p>Robust data handling with modern tooling.</p>
              </CardContent>
            </Card>
            <Card>
               <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>
                  UI components built using Radix UI and styled with Tailwind CSS.
                </CardDescription>
              </CardHeader>
               <CardContent>
                <p>Accessible and customizable components.</p>
              </CardContent>
            </Card>
            <Card>
               <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>
                  Authentication using NextAuth.js and middlewares.
                </CardDescription>
              </CardHeader>
               <CardContent>
                <p>Secure usage patterns for your app.</p>
              </CardContent>
            </Card>
            <Card>
               <CardHeader>
                <CardTitle>Subscriptions</CardTitle>
                <CardDescription>
                  Stripe subscriptions with webhooks and checkout sessions.
                </CardDescription>
              </CardHeader>
               <CardContent>
                <p>Monetize your application easily.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by <a href="#" className="font-medium underline underline-offset-4">You</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
