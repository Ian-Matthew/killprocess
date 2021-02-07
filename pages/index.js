import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
export default function Home() {
  const [port, setPort] = React.useState(null)
  const debouncedPortVal = useDebounce(port, 300)
  const [command, setCommand] = React.useState(formatCopyCommand(port))
  const inputRef = React.useRef(null)
  const otherRef = React.useRef(null)
  const copyOnChange = (e) => {
  e.preventDefault();
  setPort(e.target.value)
  }
  React.useEffect(() => {
    if(debouncedPortVal) {
      inputRef.current.value = formatCopyCommand(debouncedPortVal)
      setCommand(inputRef.current.value)
    }
    else{
      inputRef.current.value = null
      setCommand(formatCopyCommand(null))
    }
  },[debouncedPortVal])
  React.useEffect(() => {
    if(otherRef.current){
      otherRef.current.focus()
    }
  },[otherRef.current])
  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center">
      <div className="flex flex-col font-mono max-w-prose w-full">
      <input className="absolute opacity-0 pointer-events-none -left-full" value={port} ref={inputRef} type="text"/>
      <input autoFocus={true} onChange={copyOnChange} ref={otherRef} className="text-lg flex-1 p-2 border-black focus:outline-none focus:ring focus:ring-green-200 border-solid border-2" placeholder="Port Number" type="text"/>
      <code className="bg-gray-800 p-2 mt-6 text-white text-sm flex flex-row items-center justify-between">
        <div><span className='select-none'>~ </span>{command}</div>
        <button className='select-none'>copy again</button>
      </code>
      </div>
    </div>
  )
}

function formatCopyCommand(port){
  return `lsof -ti :${port || "{PORT}"} | xargs kill`
}

// Credit to ... https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
