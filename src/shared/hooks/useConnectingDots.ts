import { useEffect, type RefObject } from 'react'

type Dot = { x: number; y: number; dx: number; dy: number }

/**
 * "Connecting dots" hero animation drawn on a <canvas> that fills its parent element:
 * drifting dots, joined by lines when close, and lines to the pointer.
 * Replaces the identical 125-line effect that was copy-pasted into the home page, the
 * academy page and the agency template.
 */
export function useConnectingDots(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const cnvs = canvasRef.current
    if (!cnvs) return
    // Non-null alias for the nested functions below (TypeScript cannot carry the guard into closures).
    const canvas: HTMLCanvasElement = cnvs

    let animationId = 0
    let running = true
    let mx = 0
    let my = 0
    let dots: Dot[] = []
    let c!: CanvasRenderingContext2D
    let width = 0
    let height = 0
    let dpr = window.devicePixelRatio || 1

    // Responsive parameters
    function getParams() {
      const isMobile = width < 640
      return {
        dots_num: isMobile ? 30 : 70,
        r: 1,
        mouse_ol: isMobile ? 80 : 150,
        dots_ol: isMobile ? 80 : 150,
        max_speed: 1,
        max_ms_opac: 1,
        max_dots_opac: 1,
        uni_divs: isMobile ? 10 : 30,
      }
    }

    function resizeCanvas() {
      // Use parent container's size
      const parent = canvas.parentElement
      width = parent ? parent.offsetWidth : window.innerWidth
      height = parent ? parent.offsetHeight : window.innerHeight
      dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      c = canvas.getContext('2d') as CanvasRenderingContext2D
      c.setTransform(1, 0, 0, 1, 0, 0) // reset transform
      c.scale(dpr, dpr)
    }

    function updtMouse(e: MouseEvent | TouchEvent) {
      // Get mouse position relative to canvas
      const rect = canvas.getBoundingClientRect()
      const point = 'touches' in e ? e.touches[0] : e
      mx = point.clientX - rect.left
      my = point.clientY - rect.top
    }

    function init() {
      dots = []
      const { dots_num, uni_divs } = getParams()
      for (let i = 0; i < dots_num; i++) {
        const x = Math.floor((Math.random() * width) / uni_divs + Math.floor(i / (dots_num / uni_divs)) * (width / uni_divs))
        const y = Math.floor(Math.random() * height)
        let dx = Math.random() * 1 + 0.1
        let dy = Math.random() * 1 + 0.1
        if (i % 2 == 0) {
          dx *= -1
          dy *= -1
        }
        dots.push({ x, y, dx, dy })
      }
    }

    function update() {
      if (!running) return
      c.clearRect(0, 0, width, height)
      const { dots_num, mouse_ol, dots_ol, max_ms_opac, max_dots_opac } = getParams()
      for (let i = 0; i < dots_num; i++) {
        const dot = dots[i]
        dot.x += dot.dx
        dot.y += dot.dy
        if (dot.x > width || dot.x < 0) dot.dx *= -1
        if (dot.y > height || dot.y < 0) dot.dy *= -1
        const x = dot.x
        const y = dot.y
        const d = Math.sqrt((x - mx) * (x - mx) + (y - my) * (y - my))
        if (d < mouse_ol) {
          c.strokeStyle = `rgba(100, 180, 255, ${(max_ms_opac * (mouse_ol - d)) / mouse_ol})`
          c.lineWidth = 2
          c.beginPath()
          c.moveTo(x, y)
          c.lineTo(mx, my)
          c.stroke()
        }
        for (let j = i + 1; j < dots_num; j++) {
          const x1 = dots[j].x
          const y1 = dots[j].y
          const d2 = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y))
          if (d2 < dots_ol) {
            c.strokeStyle = `rgba(157, 210, 255, ${(max_dots_opac * (dots_ol - d2)) / dots_ol})`
            c.lineWidth = 1
            c.beginPath()
            c.moveTo(x1, y1)
            c.lineTo(x, y)
            c.stroke()
          }
        }
      }
      animationId = requestAnimationFrame(update)
    }

    function handleResize() {
      resizeCanvas()
      init()
    }

    resizeCanvas()
    init()
    update()
    window.addEventListener('mousemove', updtMouse)
    window.addEventListener('touchmove', updtMouse, { passive: false })
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    return () => {
      running = false
      window.removeEventListener('mousemove', updtMouse)
      window.removeEventListener('touchmove', updtMouse)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      if (animationId) cancelAnimationFrame(animationId)
    }
    // runs once on mount, like the original effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
