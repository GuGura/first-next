import './globals.css'
import type {Metadata} from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Inter} from 'next/font/google'
import {Container} from "@/app/components/bootstrap";
import NavBar from "@/app/NavBar";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'NextJS 13.5 Image Gallery',
  description: 'Tutorial project by Coding in Flow',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <NavBar/>
      <main>
        <Container className='py-4'>
          {children}
        </Container>
      </main>
    </body>
    </html>
  )
}
