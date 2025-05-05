'use client'

import NavLink from './NavLink'

export default function MobileMenu({ 
  links, 
  isOpen, 
  closeMenu 
}) {
  if (!isOpen) return null

  return (
    <div className="md:hidden pb-4">
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            mobile
            onClick={closeMenu}
          />
        ))}
      </nav>
    </div>
  )
}