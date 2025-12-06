import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Dataadd from '../src/components/dataadd.jsx'
import Sidemenu from './components/sideMenu.jsx'
import Tasklist from '../src/components/taskslist.jsx'
import './index.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [ getdata, setGetData ] = useState([])

  return (
    <>
      <Router>
        <div className="layout">
          <Sidemenu />
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/tasks" />} />
              <Route path='/tasks' element={<Tasklist setGetData={setGetData} />} />
            </Routes>
          </div>
          <Dataadd getdata={getdata}/>
        </div>
      </Router>
    </>
  )
}

export default App
