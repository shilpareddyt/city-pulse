import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./screens/Login";
import Home from "./screens/Home";
import EventDetails from "./screens/EventDetails";
import { FavoritesProvider } from "./shared/hooks/useFavorites";
import Profile from "./screens/Profile";
import AppTopbar from "./screens/AppTopbar";
import 'primereact/resources/themes/lara-light-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';               // Core CSS
import 'primeicons/primeicons.css';                              // Icons
import 'primeflex/primeflex.css';
import { locale,addLocale } from "primereact/api";
import * as locales from "./shared/locale.json";
function App() {
   addLocale("en",locales["en"]);
  useEffect(()=>{
    locale('en');
    addLocale('ar',locales["ar"]);
  },[])

  return (
    <FavoritesProvider>
     <div className="app-topbar"><AppTopbar /></div> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event_details" element={<EventDetails />} />
          <Route path="/profile" element={<Profile />} />         
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
