import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { useForm } from '@/hooks/useForm'
import { TextBoxItem } from '@/components/UiParts/TextBoxItem'
import { CheckBoxItem } from '@/components/UiParts/CheckBoxItem'
import { Checkbox } from '@/types'
import { MouseEvent, useCallback, useEffect, useMemo } from 'react'
import { useAppInfo } from '@/hooks/useAppInfo'
import { Button } from '@/components/UiParts/Button'
import { useClipbord } from '@/hooks/useClipbord'

const Home: NextPage = () => {

  const { title } = useAppInfo()

  const options1: Checkbox[] = [{
    id: 'remove-empty-line',
    label: 'Remove Empty Lines',
  }, {
    id: 'no-change-line',
    label: 'Remove Change Lines',
  }]

  const options2: Checkbox[] = [{
    id: 'sepalate-with-space',
    label: 'Separate with Space',
  }, {
    id: 'cepalate-with-comma',
    label: 'Separate with Comma (,)',
  }, {
    id: 'cepalate-with-semicolon',
    label: 'Separate with Semicolon (;)',
  }]

  const options3: Checkbox[] = [{
    id: 'no-sort',
    label: 'No Sort',
  }, {
    id: 'desc',
    label: 'DESC',
  }, {
    id: 'asc',
    label: 'ASC',
  }]

  const {
    val: contentValue,
    handleForm: handleContentForm,
    reset: resetContentForm,
  } = useForm()

  const {
    val: optionValue1,
    handleForm: handleOptionValue1,
    reset: resetOptionValue1,
  } = useForm(options1)

  const {
    val: optionValue2,
    handleForm: handleOptionValue2,
    reset: resetOptionValue2,
  } = useForm(options2)

  const {
    val: optionValue3,
    handleForm: handleOptionValue3,
    reset: resetOptionValue3,
  } = useForm(options3)

  const optionFilter1 = useCallback((texts: string[]): string[] => {
    const filter = (target: string) => target.replace(/^[ |　]*/g, '').replace(/[;|,]$/g, '')
    if (optionValue1.includes('remove-empty-line')) {
      return texts.reduce((acc: string[], cur) => (
        !['\n', ''].includes(cur) ? [...acc, `${filter(cur)}\n`] : acc
      ), [])
    }
    if (optionValue1.includes('no-change-line')) {
      return texts.reduce((acc: string[], cur) => (
        !['\n', ''].includes(cur) ? [...acc, `${filter(cur).replace(/\n/g, '')}`] : acc
      ), [])
    }
    return Array.isArray(optionValue1) ? optionValue1 : []
  }, [optionValue1])

  const optionFilter2 = useCallback((texts: string[]) => {
    const filter = (cepalater: string): string[] => {
      const suffix: string = optionValue1.includes('remove-empty-line') ? '\n' : ' '
      return texts.reduce((acc: string[], cur) => {
        if (optionValue1.includes('remove-empty-line')) {
          return [...acc, cur.replace(/\n/g, `${cepalater}${suffix}`)]
        }
        return [...acc, `${cur}${cepalater}${suffix}`.replace(/  /g, ' ')]
      }, [])
    }
    if (optionValue2.includes('sepalate-with-space')) return filter(' ')
    if (optionValue2.includes('cepalate-with-comma')) return filter(',')
    if (optionValue2.includes('cepalate-with-semicolon')) return filter(';')
    return Array.isArray(optionValue2) ? optionValue2 : []
  }, [optionValue1, optionValue2])

  const optionFilter3 = useCallback((texts: string[]) => (
    optionValue3.includes('desc')
      ? texts.sort()
      : optionValue3.includes('asc')
        ? texts.sort(() => -1)
        : texts
  ), [optionValue3])

  const adjustedContent = useMemo(() => {
    if (Array.isArray(contentValue)) return ''
    const dummy: string = 'z?d}&#Pv[}M>#S3W'
    let target: string[] = contentValue.replace(/\r?\n/g, `${dummy}\n${dummy}`).split(dummy)
    target = optionFilter3(optionFilter2(optionFilter1(target)))
    return target.join('')
  }, [contentValue, optionFilter1, optionFilter2, optionFilter3])

  const initialMessage = 'Copy Me!'

  const {
    message,
    copy,
  } = useClipbord(adjustedContent, initialMessage)

  const reset = useCallback((e: MouseEvent<HTMLElement>) => {
    resetContentForm(e)
    resetOptionValue1(e)
    resetOptionValue2(e)
    resetOptionValue3(e)
  }, [resetContentForm, resetOptionValue1, resetOptionValue2, resetOptionValue3])

  return (
    <Layout>
      <h1 className='
        text-6xl
        font-bold
        text-center
      '>{title}</h1>
      <div className='
        mt-10
        border
        border-black
        p-5
        rounded-lg
        relative
      '>
        {
          !!adjustedContent.length &&
            <div className='
              absolute
              top-1
              right-1
            '>
              <Button
                onClick={copy}
                disabled={false}
                text={message}
                bgColor='bg-gray-300'
                hoverBgColor='hover:bg-gray-400'
                fontColor='text-black'
                hoverFontColor='hover:text-gray-50'
              />
            </div>
        }
        {
          !adjustedContent.length
            ? <p className='text-center text-lg font-bold'>I will Display the Result Here.</p>
            : <pre>{adjustedContent}</pre>
        }
      </div>
      <form>
        <div className='mt-10 relative'>
          <div className='
            absolute
            top-0
            right-0
          '>
            <Button
              onClick={reset}
              disabled={!contentValue.length}
              text='Reset Me!'
              bgColor='bg-black'
              hoverBgColor='hover:bg-gray-700'
              fontColor='text-gray-50'
            />
          </div>
          <TextBoxItem
            label='Input Texts Here!'
            id='content'
            type='textarea'
            value={!Array.isArray(contentValue) ? contentValue : ''}
            onChange={handleContentForm}
          />
        </div>
        <div className='grid grid-cols-3 gap-x-12 gap-y-4'>
          <div className='mt-10'>
            <CheckBoxItem
              label='Select Us!'
              type='radio'
              id='option1'
              onChange={handleOptionValue1}
              items={options1}
              value={Array.isArray(optionValue1) ? optionValue1 : []}
            />
          </div>
          <div className='mt-10'>
            <CheckBoxItem
              label='Select Us!'
              type='radio'
              id='option2'
              onChange={handleOptionValue2}
              items={options2}
              value={Array.isArray(optionValue2) ? optionValue2 : []}
            />
          </div>
          <div className='mt-10'>
            <CheckBoxItem
              label='Select Us!'
              type='radio'
              id='option3'
              onChange={handleOptionValue3}
              items={options3}
              value={Array.isArray(optionValue3) ? optionValue3 : []}
            />
          </div>
        </div>
      </form>
    </Layout>
  )
}

export default Home
