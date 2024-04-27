import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const tasks= [
  {
    id:"Todo-0",
    name:'Eat',
    complete: true
  },
  {
    id:"Todo-1",
    name:'csdvd',
    complete: false
  },
  {
    id:"Todo-2",
    name:'Eat',
    complete: false
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tasks={tasks}/>
  </React.StrictMode>,
)
