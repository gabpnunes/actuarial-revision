import { useRef, useLayoutEffect } from 'react'
import katex from 'katex'

export default function MathBlock({ math, display }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (ref.current && math) {
      katex.render(math, ref.current, {
        displayMode: !!display,
        throwOnError: false,
        strict: false,
      })
    }
  }, [math, display])

  return display
    ? <div ref={ref} className="my-4 overflow-x-auto py-2" />
    : <span ref={ref} className="inline" />
}
