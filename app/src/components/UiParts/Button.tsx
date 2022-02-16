import { memo, MouseEvent, VFC } from 'react'

type Props = {
  onClick: (e: MouseEvent<HTMLElement>) => void;
  disabled: boolean;
  text: string;
  bgColor: string;
  hoverBgColor?: string;
  hoverFontColor?: string;
  fontColor: string;
}

export const Button: VFC<Props> = memo(function ButtonMemo(props) {
  const bgColor: string = props.disabled
    ? `bg-gray-500`
    : `${props.bgColor} ${props.hoverBgColor}`
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`
        px-5
        py-1.5
        rounded-lg
        ${props.fontColor}
        ${props.hoverFontColor}
        ${bgColor}
    `}>{props.text}</button>
  )
})
