import './App.css';
import {Route, Routes} from "react-router-dom"
import Home from './components/Home';
import Profile from './components/profile/Profile';
import Login from './components/login/Login';
import LoginScreen from './components/register/LoginScreen';

import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import SearchResult from './components/search/SearchResult';



function App() {

  const [authUser, setAuthUser] = useState("");
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
              setAuthUser(user)
          } else {
              setAuthUser(null);
          }
        });
        return () => { listen() };
    },[]);

  return (
    <div className="App">
      <Routes>
            {
              authUser ===  null ?
              <>
              <Route path='/' element={<LoginScreen/>}/>
            <Route path='/login' element={<Login/>}/>
              </>
              :
              <><Route path='/' element={<LoginScreen/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/home' element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/search/:query' element={<SearchResult/>}/>
              </>
            }
            
      </Routes>
      
    </div>
  );
}

export default App;
