import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import AuthStore from './store/authStore.js'
import './index.css'
import Router from "./components/Router.jsx";

const store = new AuthStore();

export const Context = createContext({
    store,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Context.Provider value={{store}}>
          <Router/>
      </Context.Provider>
  </React.StrictMode>,
)
