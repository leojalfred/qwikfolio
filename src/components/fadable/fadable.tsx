import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik'
import styles from './fadable.scss?inline'

interface Props {
  className?: string
}

export default component$(({ className }: Props) => {
  useStylesScoped$(styles)

  return (
    <section className={`${className} fadable`}>
      <Slot />
    </section>
  )
})
