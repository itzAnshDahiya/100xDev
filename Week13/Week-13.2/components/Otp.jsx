import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/**
 * OTP input component
 * Props:
 * - length: number of digits (default 6)
 * - onComplete(code: string): called when all boxes are filled
 * - autoFocus: automatically focus first input
 * - resendTimeout: seconds until resend becomes available (optional)
 * - showResend: whether to show the resend button
 */
export function Otp({ length = 6, onComplete, autoFocus = true, resendTimeout = 0, showResend = false }){
    const inputsRef = useRef([])
    const [values, setValues] = useState(() => Array(length).fill(''))
    const [disabledSubmit, setDisabledSubmit] = useState(true)

    // Resend timer
    const [timeLeft, setTimeLeft] = useState(resendTimeout)
    useEffect(()=>{
        if(resendTimeout <= 0) return
        setTimeLeft(resendTimeout)
    },[resendTimeout])
    useEffect(()=>{
        if(timeLeft <= 0) return
        const t = setInterval(()=> setTimeLeft(v => Math.max(0, v-1)), 1000)
        return ()=> clearInterval(t)
    },[timeLeft])

    useEffect(()=>{
        setDisabledSubmit(values.some(v=> v === ''))
        if(!values.some(v=> v==='')){
            onComplete?.(values.join(''))
        }
    },[values, onComplete])

    useEffect(()=>{
        if(autoFocus && inputsRef.current[0]) inputsRef.current[0].focus()
    },[autoFocus])

    const setValueAt = useCallback((idx, val)=>{
        setValues(prev => {
            const next = prev.slice()
            next[idx] = val
            return next
        })
    },[])

    const handleChange = useCallback((e, idx)=>{
        const raw = e.target.value
        // Accept only digits, if user pastes multiple characters take as many as fit
        const filtered = raw.replace(/\D/g,'')
        if(filtered.length === 0) return

        if(filtered.length === 1){
            setValueAt(idx, filtered)
            // move focus to next
            const next = inputsRef.current[idx+1]
            if(next) next.focus()
            return
        }

        // If user pasted a multi-char string, distribute across inputs
        let i = idx
        for(const ch of filtered){
            if(i >= length) break
            setValueAt(i, ch)
            i++
        }
        // focus after the last written
        const after = inputsRef.current[Math.min(i, length-1)]
        if(after) after.focus()
    },[length,setValueAt])

    const handleKey = useCallback((e, idx)=>{
        if(e.key === 'Backspace'){
            if(values[idx]){
                // clear current
                setValueAt(idx,'')
            } else {
                const prev = inputsRef.current[idx-1]
                if(prev){ prev.focus(); setValueAt(idx-1,'') }
            }
        } else if(e.key === 'ArrowLeft'){
            const prev = inputsRef.current[idx-1]
            if(prev) prev.focus()
        } else if(e.key === 'ArrowRight'){
            const next = inputsRef.current[idx+1]
            if(next) next.focus()
        }
    },[values,setValueAt])

    const onPaste = useCallback((e)=>{
        e.preventDefault()
        const clipboard = (e.clipboardData || window.clipboardData).getData('text') || ''
        const digits = clipboard.replace(/\D/g,'')
        if(!digits) return
        // paste starting at first empty
        let start = values.findIndex(v=> v === '')
        if(start === -1) start = 0
        let i = start
        for(const ch of digits){
            if(i >= length) break
            setValueAt(i, ch)
            i++
        }
        const after = inputsRef.current[Math.min(i, length-1)]
        if(after) after.focus()
    },[length, setValueAt, values])

    const inputs = useMemo(()=> Array.from({length}).map((_,i)=> (
        <input
            key={i}
            ref={el => inputsRef.current[i] = el}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={values[i]}
            onChange={(e)=> handleChange(e,i)}
            onKeyDown={(e)=> handleKey(e,i)}
            onPaste={onPaste}
            className="m-1 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-center text-lg outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={`Digit ${i+1}`}
        />
    )), [length, values, handleChange, handleKey, onPaste])

    return (
        <div className="flex flex-col items-center">
            <div className="flex">{inputs}</div>

            <div className="mt-4">
                <button disabled={disabledSubmit} onClick={()=> onComplete?.(values.join(''))} className={`btn ${disabledSubmit ? 'opacity-60 pointer-events-none' : ''}`}>
                    Verify
                </button>
                {showResend && (
                    <button disabled={timeLeft > 0} onClick={()=> setTimeLeft(resendTimeout)} className="ml-3 text-sm text-indigo-400">
                        {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend code'}
                    </button>
                )}
            </div>
        </div>
    )
}