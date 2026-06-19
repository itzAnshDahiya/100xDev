import { useEffect, useRef } from 'react'

/**
 * usePrevious hook
 * Stores the previous value across renders and returns it.
 */
export default function usePrevious(value){
  const ref = useRef()
  useEffect(()=>{ ref.current = value }, [value])
  return ref.current
}
import { useEffect, useRef } from 'react'

/**
 * usePrevious hook
 * Stores the previous value across renders and returns it.
 */
export default function usePrevious(value){
  const ref = useRef()
  useEffect(()=>{ ref.current = value }, [value])
  return ref.current
}
