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
      <span className="font-bold text-lg !border-none bg-header text-white">TechForing</span> {/* Optional text */}
    </Link>
  )
}