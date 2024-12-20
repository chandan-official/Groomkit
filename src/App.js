import './App.css';
import Login from './components/Login';
import './components/Navbar';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Otpregister from './components/Otpregister';
import Dropdown from './components/Dropdown';
import Landing from './components/Landing';
import Homepage from './components/Homepage';
import Service from './components/Service';
import Store from './components/Store';
import Accountdrop from './components/Accountdrop'
import Userpage from './components/Userpage';
import Usernav from './components/Usernav';
import Profile from './components/Profile';
function App() {
  return (
    
    <div className='container my-3'>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/nav' element={<Navbar title='GroomKit'/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/dropdown' element={<Dropdown/>}/>
      <Route path='/landing' element={<Landing/>}/>
      <Route path='/otpregister' element={<Otpregister/>}/>
      <Route path='/service'element={<Service/>}/>
      <Route path='/store'element={<Store/>}/>
      <Route path='accountdrop'element={<Accountdrop/>}/>
      <Route path='userpage'element={<Userpage/>}/>
      <Route path='usernav'element={<Usernav/>}/>
      <Route path='profile'element={<Profile/>}/>
     </Routes>
     </BrowserRouter>
    </div>

  );
}

export default App;
