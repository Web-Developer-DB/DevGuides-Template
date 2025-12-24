import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './router'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-dracula-background">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[-15%] h-72 w-72 rounded-full bg-brand-200/25 blur-3xl transition-colors duration-300 ease-out dark:bg-brand-400/30 sm:h-80 sm:w-80" />
        <div className="absolute right-[-10%] bottom-[-25%] h-96 w-96 rounded-full bg-brand-300/20 blur-[140px] transition-colors duration-300 ease-out dark:bg-brand-500/30 sm:right-[-5%]" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-600/10 blur-[120px] transition-colors duration-300 ease-out dark:bg-brand-600/30" />
      </div>
      <div className="flex min-h-screen flex-col bg-white/80 backdrop-blur transition-colors duration-300 ease-out dark:bg-dracula-background/90">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <AppRoutes />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
