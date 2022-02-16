import { useCallback, useEffect, useState } from 'react'

/**
 * クリップボードのフック
 */
export const useClipbord = (text: string, initialMessage: string) => {

  const [message, setMessage] = useState(initialMessage)

  const copy = useCallback(() => {
    const successMessage = 'You Copied Me Successful!'
    const failureMessage = 'You Failed to Copy Me...'
    navigator.clipboard.writeText(text).then(
      () => setMessage(successMessage),
      () => setMessage(failureMessage),
    )
  }, [text])

  useEffect(() => {
    if (message === initialMessage) return
    setTimeout(() => setMessage(initialMessage), 1000)
  }, [initialMessage, message])

  return {
    message,
    copy,
  }
}
