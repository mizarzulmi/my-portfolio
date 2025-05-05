'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, label, mobile = false, onClick }) {
  const pathname = usePathname()
  const isActive = pathname === href

  // Style untuk desktop dan mobile
  const baseStyles = `hover:text-blue-600 dark:hover:text-blue-400 ${
    isActive ? 'text-blue-600 dark:text-blue-400' : ''
  }`

  const mobileStyles = `px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
    isActive ? 'font-medium' : ''
  }`

  return (
    <Link
      href={href}
      className={mobile ? `${baseStyles} ${mobileStyles}` : baseStyles}
      onClick={onClick}
    >
      {label}
    </Link>
  )
}