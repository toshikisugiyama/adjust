import Head from 'next/head'
import { VFC, ReactNode } from 'react'
import { Header } from '@/src/components/UiParts/Header'
import { Footer } from '@/src/components/UiParts/Footer'
import { useAppInfo } from '@/src/hooks/useAppInfo'

type Props = {
  children: ReactNode;
}

export const Layout: VFC<Props> = ({ children }) => {
  const { title } = useAppInfo()
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className='bg-gray-50'>
        <div className='
          w-container
          mx-auto
          py-[60px]
          min-h-main
          overflow-auto
        '>{children}</div>
      </main>
      <Footer />
    </>
  )
}
