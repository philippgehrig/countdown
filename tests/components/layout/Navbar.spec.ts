import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '../../../components/layout/Navbar.vue'

// Mock vue-router
vi.mock('vue-router', () => ({
  useRoute: () => ({
    path: '/',
    fullPath: '/',
    matched: []
  })
}))

describe('Navbar', () => {
  beforeEach(() => {
    document.body.innerHTML = ''

    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    window.addEventListener = vi.fn()
    window.removeEventListener = vi.fn()
  })

  it('renders the site title/logo', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Gina Countdown')
    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
  })

  it('renders all navigation items', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })

    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Countdown')
    expect(wrapper.text()).toContain('Mission')
    expect(wrapper.text()).not.toContain('Gimmicks')
  })

  it('toggles mobile menu when button is clicked', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })

    expect(wrapper.find('.mobile-nav').exists()).toBe(false)

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.mobile-nav').exists()).toBe(true)

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.mobile-nav').exists()).toBe(false)
  })

  it('updates scroll state when scrolled', async () => {
    let scrollHandler: Function | null = null
    vi.spyOn(window, 'addEventListener').mockImplementation((event: string, handler: any) => {
      if (event === 'scroll') {
        scrollHandler = handler
      }
    })
    
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })

    // Simulate scrolling past the threshold (scrolled = scrollY > 16)
    Object.defineProperty(window, 'scrollY', { value: 20, configurable: true })
    if (scrollHandler) {
      scrollHandler()
    }

    await wrapper.vm.$nextTick()

    const header = wrapper.find('header')
    expect(header.classes()).toContain('bg-white/80')
    expect(header.classes()).toContain('backdrop-blur-xl')
  })

  it('adds event listeners on mount and removes on unmount', () => {
    const wrapper = mount(Navbar)

    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })

    wrapper.unmount()

    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
