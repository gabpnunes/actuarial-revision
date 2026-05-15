import { useRef, useEffect } from 'react'

export default function CompoundPoissonCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let w, h

    const particles = []
    let totalS = 0
    let time = 0
    const stepPoints = [{ t: 0, s: 0 }]
    const lambda = 0.03
    const meanClaim = 30
    const histBins = new Array(20).fill(0)
    let simCount = 0

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function spawnClaim() {
      const size = -meanClaim * Math.log(Math.random())
      totalS += size
      stepPoints.push({ t: time, s: totalS })
      for (let i = 0; i < Math.min(Math.ceil(size / 8), 12); i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.6,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 120 + Math.random() * 80,
          maxLife: 120 + Math.random() * 80,
          r: 1.5 + Math.random() * 2,
        })
      }
    }

    function draw() {
      ctx.fillStyle = 'rgba(8, 9, 14, 0.15)'
      ctx.fillRect(0, 0, w, h)

      time++

      if (Math.random() < lambda) spawnClaim()

      if (time % 600 === 0) {
        const bin = Math.floor(Math.min(totalS / (meanClaim * 2), histBins.length - 1))
        if (bin >= 0 && bin < histBins.length) histBins[bin]++
        simCount++
        totalS = 0
        stepPoints.length = 0
        stepPoints.push({ t: time, s: 0 })
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life--
        if (p.life <= 0) { particles.splice(i, 1); continue }
        const alpha = (p.life / p.maxLife) * 0.6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(196, 181, 253, ${alpha})`
        ctx.fill()
      }

      const graphY = h * 0.65
      const graphH = h * 0.25
      const maxS = meanClaim * 15

      if (stepPoints.length > 1) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(196, 181, 253, 0.5)'
        ctx.lineWidth = 1.5
        const startT = stepPoints[0].t
        for (let i = 0; i < stepPoints.length; i++) {
          const pt = stepPoints[i]
          const x = ((pt.t - startT) / 600) * w
          const y = graphY + graphH - (pt.s / maxS) * graphH
          if (i === 0) ctx.moveTo(x, y)
          else {
            const prevY = graphY + graphH - (stepPoints[i - 1].s / maxS) * graphH
            ctx.lineTo(x, prevY)
            ctx.lineTo(x, y)
          }
        }
        const lastPt = stepPoints[stepPoints.length - 1]
        const endX = ((time - stepPoints[0].t) / 600) * w
        const endY = graphY + graphH - (lastPt.s / maxS) * graphH
        ctx.lineTo(endX, endY)
        ctx.stroke()
      }

      if (simCount > 2) {
        const barW = w / histBins.length
        const maxBin = Math.max(...histBins, 1)
        const histH = h * 0.08
        const histY = h * 0.92
        for (let i = 0; i < histBins.length; i++) {
          if (histBins[i] === 0) continue
          const barH = (histBins[i] / maxBin) * histH
          ctx.fillStyle = 'rgba(196, 181, 253, 0.15)'
          ctx.fillRect(i * barW + 1, histY - barH, barW - 2, barH)
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    ctx.fillStyle = '#08090E'
    ctx.fillRect(0, 0, w, h)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ zIndex: 0 }} />
  )
}
