import { locale } from "primereact/api";
import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [layout,setLayout]=useState({
    locale:'en'
  })
  const toggleFavorite = (data) => {
    setFavorites(data);
  };
  const layoutConfig=(data)=>{
    setLayout(data);
    locale(data?.locale)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite,layoutConfig ,layout}}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
