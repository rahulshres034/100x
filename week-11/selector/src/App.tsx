
import './App.css'
import Counter from './components/Counter'
import { RecoilRoot } from 'recoil'

function App() {

  return (
    <>
     <RecoilRoot>
      <div className='root'>
        <Counter/>      
        </div>
     </RecoilRoot>
    </>
  )
}

export default App
