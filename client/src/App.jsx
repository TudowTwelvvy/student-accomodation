import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateAccomodation from './pages/CreateAccomodation';
import UpdateAccomodation from './pages/UpdateAccomodation';
import Accomodation from './pages/Accomodation';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/accomodation/:accomodationId" element={<Accomodation/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/create-accomodation" element={<CreateAccomodation/>}/>
          <Route path="/update-accomodation/:accomodationId" element={<UpdateAccomodation/>}/>
        </Route>
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App