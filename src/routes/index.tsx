import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import Hero from '../components/hero/hero'

export default component$(() => {
  return (
    <>
      <Hero />
      <div className="placeholder"></div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Leo Alfred'
}
