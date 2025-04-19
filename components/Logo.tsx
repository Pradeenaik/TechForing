import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex bg-header !border-none items-center gap-2">
      <Image
        className='bg-header !border-none'
        src="/images/logo.png"
        alt="Your Company Logo"
        width={40}  // Adjust to match your logo dimensions
        height={40}
        priority
      />
    <div className="!border-none bg-header flex flex-col leading-tight">
    <span className="!border-none bg-header font-bold text-lg text-white">TechForing</span>
    <span className="!border-none bg-header font-bold text-xs text-white">Shaping Tomorrows Cybersecurity</span> 
  </div>
    </Link>
  )
}