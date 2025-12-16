import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignInPage from './pages/SignInPage'
import Layout from './utils/Layout'
import OverviewPage from './pages/OverviewPage'
import SurgeryRecords from './pages/SurgeryRecords'
import FillSurgeryForm from './pages/FillSurgeryForm'
import SurgeryDetailsPage from './pages/SurgeryDetailsPage'
import PrivateRoute from './utils/PrivateRoute'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={<SignInPage />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />


      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Layout />}>
          <Route index element={<OverviewPage />} />
          <Route path='profile' element={<Profile />} />
          <Route path='records' element={<SurgeryRecords />} />
          <Route path='records/:id' element={<SurgeryDetailsPage />} />
          <Route path="fill-surgery-form/:surgeryType" element={<FillSurgeryForm />} />


        </Route>
      </Route>

    </Routes>
  )
}

export default App
