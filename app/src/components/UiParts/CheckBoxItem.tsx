import { ChangeEvent, memo, VFC } from 'react'

type Props = {
  type: 'checkbox' | 'radio';
  label?: string;
  id: string;
  items: {
    label: string;
    id: string;
  }[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string[];
}

export const CheckBoxItem: VFC<Props> = memo(function CheckBoxItemMemo(props) {
  return (
    <section>
      {
        props.label != null && (
          <h2 className='text-lg font-bold mb-1'>{props.label}</h2>
        )
      } {
        props.items.map(({ id, label }, index) => (
          <div
            key={id}
            className={`
              relative
              p-3
              rounded-lg
              ${!!index && 'mt-3'}
              ${props.value.includes(id) ? 'bg-black' : 'bg-gray-200 outline outline-1 outline-gray-300'}
          `}>
            <input
              name={props.id}
              type={props.type}
              id={id}
              onChange={props.onChange}
              checked={props.value.includes(id)}
              className='cursor-pointer'
            />
            <label
              htmlFor={id}
              className={`
                select-none
                cursor-pointer
                absolute
                top-0
                left-0
                right-0
                bottom-0
                pt-3
                pl-10
                ${props.value.includes(id) ? 'text-gray-50' : 'text-black'}
            `}>{label}</label>
          </div>
        ))
      }
    </section>
  )
})
