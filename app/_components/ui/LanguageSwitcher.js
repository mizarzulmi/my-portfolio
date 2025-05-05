// app/_components/ui/LanguageSwitcher.js
'use client'

import { useLanguage } from '@/app/_contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useLanguage();
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('id')}
        className={`px-3 py-1 rounded-md ${lang === 'id' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
      >
        ID
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md ${lang === 'en' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
      >
        EN
      </button>
    </div>
  )
}