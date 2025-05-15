import { createRoot } from 'react-dom/client'
import './index.css'
import Landing_page from './landing_page'
import GetStartedPage from './get_started_page'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GetStartedPage2 from './get_started_page_2'
import HomePage from './home_page'
import LoginPage from './login_page'
import WelcomePage from './welcome_page'
import SetUpProfilePage from './setup_profile_page'
import SetUpProfilePage2 from './setup_profile_page_2'
import FinishSetUpPage from './finish_profile_setup_page'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing_page />} />
      <Route path="/get_started_page" element={<GetStartedPage />} />
      <Route path="/get_started_page_2" element={<GetStartedPage2 />} />
      <Route path='login_page' element={<LoginPage/>}/>
      <Route path='/home_page' element={<HomePage/>} />
      <Route path='/setup_profile_page' element={<SetUpProfilePage/>} />
      <Route path='/setup_profile_page_2' element={<SetUpProfilePage2/>}/>
      <Route path='/welcome_page' element={<WelcomePage/>} />
      <Route path='/finish_profile_setup_page' element={<FinishSetUpPage/>} />
    </Routes>
  </BrowserRouter>,
)
