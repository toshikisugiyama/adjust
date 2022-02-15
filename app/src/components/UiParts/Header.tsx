import { useAppInfo } from '@/hooks/useAppInfo'
import { memo, VFC } from 'react'

export const Header: VFC = memo(() => {
  const { title } = useAppInfo()
  return (
    <header className='
      bg-black
      text-gray-50
    '>
      <div className='
        w-container
        h-header
        mx-auto
        flex
        items-center
      '>
        <h1 className='
          font-bold
          text-3xl
        '>{title}</h1>
      </div>
    </header>
  )
})
