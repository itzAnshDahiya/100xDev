import { useEffect, useRef } from 'react'

/**
 * usePreviousHook - returns the previous value for the given input
 */
export default function usePreviousHook(value){
  const ref = useRef()
  useEffect(()=>{ ref.current = value }, [value])
  return ref.current
}
