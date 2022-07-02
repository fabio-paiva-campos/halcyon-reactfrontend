import { ContextWrap } from './hooks/context'
import Layout from './components/layout'
import './styles/style.scss'

function App() {
  return (
      <ContextWrap>
        <div className='appDiv'>
          <Layout/>
        </div>
      </ContextWrap>
    )
}

export default App