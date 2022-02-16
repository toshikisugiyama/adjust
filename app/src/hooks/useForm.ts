import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import { Checkbox } from '@/types'

/**
 * フォームのフック
 */
export const useForm = (group?: Checkbox[]) => {

  const [val, setVal] = useState<string | string[]>('')

  const handleForm = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { type, id, value } = e.target
    // text or textarea
    if (['text', 'textarea'].includes(type)) {
      setVal(value)
      return
    }
    // radio or checkobox
    const { checked } = <HTMLInputElement>e.target
    if (checked && type === 'radio') {
      setVal(() => [id])
      return
    }
    if (checked) {
      setVal(item => [id, ...(<string[]>item)])
      return
    }
    if (group != null && Array.isArray(val) && val.length === 1 && val[0] === value) {
      setVal([value])
      return
    }
    setVal(item => (<string[]>item).filter(item => item !== id))
  }, [val, group])

  const reset = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (!val.length) return
    setVal('')
  }, [val])

  useEffect(() => {
    if (group != null && !val.length) {
      setVal(() => [group[0].id])
    }
  }, [val, group])

  return {
    val,
    handleForm,
    reset,
  }
}
