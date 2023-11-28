import App from "./App";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StaLogin from "./components/stalogin";
import StuLogin from "./components/stulogin";
import Years from "./components/years";
import Admissions from "./components/admissions";
import OneAdmission from "./components/admissions/oneadmission";
import Profile from "./components/profile";
import Apply from "./components/apply";
import Room from "./components/room";
import Token from "./components/token";
import Test from "./components/test";
const Router = () => {
    return(
        <BrowserRouter>
    
              <Routes>
              <Route path='/test' element={<Test/>}/>
              <Route path='/slogin' element={<StuLogin/>}/>
              <Route path='/slogin/profile/:s_id' element={<Profile/>}/>
              <Route path='/slogin/apply' element={<Apply/>}/>
              <Route path='/slogin/selectroom/:s_id' element={<Room/>}/>
              <Route path='/slogin/token' element={<Token/>}/>
              <Route path='/tlogin' element={<StaLogin/>}/>
              <Route path='/tlogin/chooseyr' element={<Years/>}/>
              <Route path='/tlogin/:year' element={<Admissions/>}/>
              <Route path='/tlogin/:year/:ano' element={<OneAdmission/>}/>
              <Route path='/' element={<App/>}/>
              </Routes>
        </BrowserRouter>
      )
    }
    
    export default Router;