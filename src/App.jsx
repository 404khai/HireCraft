import './App.css'
import AppRouter from './AppRouter'
import { AuthProvider  } from './AuthContext'

function App() {

  return (
    <>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>,      
    </>
  )
}

export default App
