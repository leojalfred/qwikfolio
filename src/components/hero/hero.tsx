import {
  component$,
  useSignal,
  useStore,
  useClientEffect$
} from '@builder.io/qwik'
import Fadable from '../fadable/fadable'
import Icons from './icons/icons'

export default component$(() => {
  const subtitle = useSignal<HTMLHeadingElement>()
  const store = useStore({ index: 0 })

  useClientEffect$(() => {
    const children = subtitle.value?.children
    if (children) {
      setInterval(() => {
        children[store.index].classList.remove('text-gradient--highlighted')

        store.index = (store.index + 1) % children.length
        children[store.index].classList.add('text-gradient--highlighted')
      }, 3000)
    }
  })

  return (
    <Fadable>
      <div>
        <h1>
          Hi, I'm Leo.
          <br />I bring ideas to life.
        </h1>
        <h2 className="subtitle" ref={subtitle}>
          <span className="text-gradient text-gradient--red-grape text-gradient--highlighted">
            Full Stack Development,
          </span>{' '}
          <span className="text-gradient text-gradient--blue-indigo">
            Mobile Development,
          </span>{' '}
          <span className="text-gradient text-gradient--orange-yellow">
            UX/UI,
          </span>{' '}
          <span className="text-gradient text-gradient--cyan-green">
            Design,
          </span>{' '}
          <span className="text-gradient text-gradient--orange-pink">
            Search Engine Optimization
          </span>
        </h2>
      </div>
      <div>
        <Icons />
      </div>
    </Fadable>
  )
})
