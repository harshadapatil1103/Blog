import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'flowbite/dist/flowbite.css';

//redux
import { persistReducer } from 'redux-persist';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './redux/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
 < PersistGate persistor={ persistor}>
  <Provider store={store}>
  <BrowserRouter>
  <App />
  </BrowserRouter>  
  </Provider>
  </PersistGate>
)
