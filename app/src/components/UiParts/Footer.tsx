import { useAppInfo } from '@/src/hooks/useAppInfo'
import { memo, VFC } from 'react'

export const Footer: VFC = memo(() => {
  const { name, year } = useAppInfo()
  return (
    <footer className='
      bg-black
      text-gray-50
    '>
      <div className='
        w-container
        h-footer
        mx-auto
        flex
        justify-center
        items-center
        font-light
      '>&copy; {year} {name}</div>
    </footer>
    )
  }
)