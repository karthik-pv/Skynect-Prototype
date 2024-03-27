import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import OnBoard from './pages/OnBoard'
import UserList from './pages/UserList'
import Profile from './pages/Profile'
import GrantList from './pages/GrantList'
import GrantPage from './pages/GrantPage'
import CreateGrant from './pages/CreateGrant'
import VCList from './pages/VCList'
import VCPage from './pages/VCPage'
import CreateVC from './pages/CreateVC'
import Incubators from './pages/Incubators'
import Accelerators from './pages/Accelerators'
import Home from './pages/Home'
import Jargon from './pages/Jargon'
import CreateIncubator from './pages/CreateIncubator'
import CreateAccelerator from './pages/CreateAccelerator'
import EditProfile from './pages/EditProfile'
import ProdDevList from './pages/ProdDevList'
import EditGrant from './pages/EditGrant'
import EditVC from './pages/EditVC'
import EditAccelerator from './pages/EditAccelerator'
import EditIncubator from './pages/EditIncubator'
import { useAdminContext } from './contexts/AdminContext'

const App = () => {

  const {isAdmin , setIsAdmin} = useAdminContext();

  return (
  
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/onboard' element={<OnBoard />} />
        <Route path='/home' element={<Home />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/grantlist' element={<GrantList />} />
        <Route path='/grant' element={<GrantPage/>}/>
        <Route path='/creategrant'element={isAdmin ? <CreateGrant/> : <Home/>}/>
        <Route path='/vclist' element={<VCList/>}/>
        <Route path='/vc' element={<VCPage />} />
        <Route path='/createvc' element={isAdmin ? <CreateVC/> : <Home/>}/>
        <Route path='/incubators' element={<Incubators/>}/>
        <Route path='/accelerators' element={<Accelerators/>}/>
        <Route path='/createincubator' element = {isAdmin ? <CreateIncubator/> : <Home/>}/>
        <Route path='/createaccelerator' element = {isAdmin ? <CreateAccelerator/> : <Home/>}/>
        <Route path='/jargon' element = {<Jargon/>}/>
        <Route path='/editprofile' element = {<EditProfile/>}/>
        <Route path='/proddevs' element = {<ProdDevList/>}/>
        <Route path='/editgrant' element = {<EditGrant/>}/>
        <Route path='/editvc' element = {<EditVC/>}/>
        <Route path='/editaccelerator' element = {<EditAccelerator/>}/>
        <Route path='/editincubator' element = {<EditIncubator/>}/>
      </Routes>

  )
}

export default App