import packageJson from '@/../package.json'
import { useMemo } from 'react'

/**
 * アプリ情報フック
 */
export const useAppInfo = () => {
  const title = useMemo<string>(() => packageJson.name.toUpperCase() ?? '', [packageJson])
  const name = useMemo<string>(() => packageJson.person.name ?? '', [packageJson])
  const startYear: number = 2022
  const currentYear: number = new Date().getFullYear()
  const year = useMemo<string>(() => (
    currentYear === startYear
      ? startYear.toString()
      : `${startYear}-${currentYear}`
  ), [startYear, currentYear])

  return {
    title,
    name,
    year,
  }

}
