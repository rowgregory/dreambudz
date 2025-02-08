import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Plus_Jakarta_Sans } from 'next/font/google'
import ReduxWrapper from './redux-wrapper'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Dream Budz',
  description: 'Innovative Cannabis Experience'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const userData = headersList.get('x-user')

  let parsedUserData: any
  if (userData) {
    parsedUserData = JSON.parse(userData)
  }

  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className}`}>
        <ReduxWrapper
          data={{
            isAuthenticated: parsedUserData?.isAuthenticated,
            userId: parsedUserData?.id,
            isAdmin: parsedUserData?.isAdmin
          }}
        >
          {children}
        </ReduxWrapper>
      </body>
    </html>
  )
}
