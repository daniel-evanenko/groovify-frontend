import { createRoot } from 'react-dom/client'
import './assets/styles/main.scss'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>

)
