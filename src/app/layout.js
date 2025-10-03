import { FormProvider } from '@/context/FormContext'
import './globals.css'
import Image from 'next/image'
import { TarotProvider } from '@/context/TarotContext'

export const metadata = {
  title: 'Tarot Web App',
  description: 'A simple tarot web app built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-custom-gradient relative min-w-full ">
        <FormProvider>
          <TarotProvider>{children}</TarotProvider>
        </FormProvider>

        {/* Top Left */}
        <Image
          src="/stars-top-left.png"
          alt="stars top left"
          width={300}
          height={100}
          className="fixed top-0 left-0 z-[-100] w-[35vw] h-auto"
        />

        {/* Top Right */}
        <Image
          src="/stars-top-right.png"
          alt="stars top right"
          width={250}
          height={100}
          className="fixed top-0 right-0 z-[-100] w-[30vw] h-auto"
        />

        {/* Bottom Left */}
        <Image
          src="/stars-bot-left.png"
          alt="stars bottom left"
          width={250}
          height={200}
          className="fixed bottom-0 left-0 z-[-100] w-[30vw] h-auto"
        />

        {/* Bottom Right */}
        <Image
          src="/stars-bot-right.png"
          alt="stars bottom right"
          width={350}
          height={200}
          className="fixed bottom-0 right-0 z-[-100] w-[40vw] h-auto"
        />
      </body>
    </html>
  )
}
