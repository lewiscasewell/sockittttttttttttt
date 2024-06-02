import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useWebSocket } from './use-websocket'


function App() {
  const [count, setCount] = useState(0);
  const {sendMessage, receivedMessage, status} = useWebSocket();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          const newCount = count + 1;
          setCount(newCount);
          sendMessage(newCount.toString());
        }}>
          count is {count}
        </button>

        <p>
          Received message: {JSON.stringify(receivedMessage)}
        </p>
      </div>
      <p className="read-the-docs">
        Current status: {status}
      </p>
    </>
  )
}

export default App
