import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Guides from './pages/Guides'
import Guide from './pages/Guide'
import Topics from './pages/Topics'
import Topic from './pages/Topic'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/guides/:slug" element={<Guide />} />
      <Route path="/topics" element={<Topics />} />
      <Route path="/topics/:topic" element={<Topic />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
