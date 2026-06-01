let observer = null

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target
        const delay = el.dataset.scrollDelay || 0

        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('scroll-revealed')
            el.classList.remove('scroll-hidden')
          }, Number(delay))
          observer.unobserve(el)
        }
      })
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    })
  }
  return observer
}

const parseValue = (value) => {
  if (!value) return {}
  const parts = value.split(',').map(s => s.trim())
  const modifiers = {}

  parts.forEach(part => {
    const [key, val] = part.split('=').map(s => s.trim())
    if (val !== undefined) {
      modifiers[key] = isNaN(val) ? val : Number(val)
    } else {
      modifiers[key] = true
    }
  })

  return modifiers
}

const applyDirection = (el, modifiers) => {
  const dir = modifiers.direction || modifiers.dir
  const side = modifiers.side

  if (dir === 'left' || side === 'left') el.dataset.scrollDirection = 'left'
  else if (dir === 'right' || side === 'right') el.dataset.scrollDirection = 'right'
  else if (dir === 'scale') el.dataset.scrollDirection = 'scale'
  else if (dir === 'blur') el.dataset.scrollDirection = 'blur'
  else el.dataset.scrollDirection = 'up'

  if (modifiers.delay !== undefined) el.dataset.scrollDelay = modifiers.delay
  if (modifiers.speed === 'slow') el.dataset.scrollSpeed = 'slow'
  if (modifiers.speed === 'fast') el.dataset.scrollSpeed = 'fast'
}

const vScrollReveal = {
  mounted(el, binding) {
    const modifiers = binding.value || parseValue(binding.arg)

    if (typeof modifiers === 'string') {
      applyDirection(el, { direction: modifiers })
    } else {
      applyDirection(el, modifiers)
    }

    const obs = getObserver()
    el.classList.add('scroll-hidden')
    requestAnimationFrame(() => {
      obs.observe(el)
    })
  },

  updated(el, binding) {
    const modifiers = binding.value || parseValue(binding.arg)

    if (typeof modifiers === 'string') {
      applyDirection(el, { direction: modifiers })
    } else {
      applyDirection(el, modifiers)
    }
  },

  unmounted(el) {
    const obs = getObserver()
    obs.unobserve(el)
    el.classList.remove('scroll-hidden', 'scroll-revealed')
  },
}

export default vScrollReveal
