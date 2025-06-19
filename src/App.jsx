import './App.css'
import AppRouter from './AppRouter'
import { AuthProvider  } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <AuthProvider >
      <AppRouter />
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
