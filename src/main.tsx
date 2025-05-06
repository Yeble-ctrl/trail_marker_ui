import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Landing_page from './landing_page'
import GetStartedPage from './get_started_page'
import GetStartedPage2 from './get_started_page'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing_page />} />
      <Route path="/get_started_page" element={<GetStartedPage />} />
      <Route path="/get_started_page_2" element={<GetStartedPage2 />} />
    </Routes>
  </BrowserRouter>,
)
