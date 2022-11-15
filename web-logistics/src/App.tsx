import Header from './shared/components/Header'
import { BrowserRouter } from 'react-router-dom'
import MyRoutes from './shared/routes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <MyRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
