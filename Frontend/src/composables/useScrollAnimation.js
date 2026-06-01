import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    once = true,
  } = options

  const observer = ref(null)
  const elements = ref(new Set())

  const reveal = (entry) => {
    const el = entry.target
    const delay = el.dataset.scrollDelay || 0

    setTimeout(() => {
      el.classList.add('scroll-revealed')
      el.classList.remove('scroll-hidden')

      if (once) {
        observer.value?.unobserve(el)
        elements.value.delete(el)
      }
    }, Number(delay))
  }

  const handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reveal(entry)
      } else if (!once) {
        entry.target.classList.remove('scroll-revealed')
        entry.target.classList.add('scroll-hidden')
      }
    })
  }

  const observe = (el) => {
    if (!el || !observer.value) return
    el.classList.add('scroll-hidden')
    elements.value.add(el)
    observer.value.observe(el)
  }

  const unobserve = (el) => {
    if (!el || !observer.value) return
    observer.value.unobserve(el)
    elements.value.delete(el)
    el.classList.remove('scroll-hidden', 'scroll-revealed')
  }

  onMounted(() => {
    observer.value = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    })
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
    elements.value.clear()
  })

  return { observe, unobserve }
}
