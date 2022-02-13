import { ChangeEvent, VFC } from 'react'

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

export const CheckBoxItem: VFC<Props> = props => {
  return (
    <section>
      {
        props.label != null && (
          <h2 className='text-lg font-bold mb-1'>{props.label}</h2>
        )
      } {
        props.items.map(({ id, label }) => (
          <div key={id}>
            <input
              name={props.label}
              type={props.type}
              id={id}
              onChange={props.onChange}
              checked={props.value.includes(id)}
              className='cursor-pointer'
            />
            <label
              htmlFor={id}
              className='select-none cursor-pointer'
            >{label}</label>
          </div>
        ))
      }
    </section>
  )
}
