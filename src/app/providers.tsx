'use client'

import { Toaster } from 'react-hot-toast'
import { ChristmasProvider } from '@/contexts/ChristmasContext'
import ChristmasEffects from '@/components/ChristmasEffects'

/** Client-side providers and the global toaster (what the Pages Router `_app` wrapped every page in). */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChristmasProvider>
        <ChristmasEffects />
        {children}
      </ChristmasProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#172840', color: '#fff' },
          success: { duration: 3000, iconTheme: { primary: '#4ade80', secondary: '#fff' } },
          error: { duration: 5000, iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </>
  )
}
