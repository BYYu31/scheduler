import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    
    setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), newMode] : [...prev, newMode])
  }

  function back() {
    if (history.length > 0) {
    setHistory(prev => [...prev.slice(0, prev.length - 1)])
    } 
  }
  return { mode: history.length > 0 ? history[history.length - 1] : initial, transition, back };
}