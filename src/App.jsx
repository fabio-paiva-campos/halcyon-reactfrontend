import Login from './components/login'
import Palcos from './components/palcos'
import { ContextWrap, useAppContext } from './hooks/context'
import './styles/style.scss'

function App() {
  return (
    <div className='appDiv'>
      <Palcos/>
    </div>
  )
}

export default App