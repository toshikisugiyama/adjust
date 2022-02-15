import Head from 'next/head'
import { VFC, ReactNode } from 'react'
import { Header } from '@/components/UiParts/Header'
import { Footer } from '@/components/UiParts/Footer'
import { useAppInfo } from '@/hooks/useAppInfo'

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
      <main className='
        bg-gray-50
        h-main
        overflow-auto
      '>
        <div className='
          w-container
          mx-auto
          py-[60px]
        '>{children}</div>
      </main>
      <Footer />
    </>
  )
}
