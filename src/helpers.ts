export function fadeInFadables() {
  const fadables = document.querySelectorAll('.fadable:not(.fadable--shown)')
  fadables.forEach(fadable => {
    if (fadable.getBoundingClientRect().top >= 0)
      fadable.classList.add('fadable--shown')
  })
}
