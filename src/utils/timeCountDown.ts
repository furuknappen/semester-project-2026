

export function formatTimeLeft(endTime: string, now: number = Date.now()): string {
 
const end = new Date(endTime).getTime()
let remaining = Math.max(0, end - now)

const days = Math.floor(remaining / 86_400_000)
remaining %= 86_400_000

const hours = Math.floor(remaining / 3_600_000)
remaining %= 3_600_000
const minutes = Math.floor(remaining / 60_000)
remaining %= 60_000
const seconds = Math.floor(remaining / 1000
)

return `${days}d ${hours}h ${minutes}m ${seconds}s left`
}



export function startCountdown(
  element: HTMLElement, 
  endsAt: string, 
  onEnd?: ()=> void,
): () => void {
   const endTime = new Date(endsAt).getTime()
    let timer: number | undefined

  const tick = (): void => {
   
    if(Date.now() >= endTime){
      element.textContent= "Ended"
      if(timer!== undefined) clearInterval(timer)
      onEnd?.()
        return
    } 
    element.textContent = formatTimeLeft(endsAt)
  }
  tick()
  if(Date.now() < endTime) {
    timer = window.setInterval(tick, 1000);
  }

  return () => {
    if(timer !== undefined)clearInterval(timer)
  }
  
}

