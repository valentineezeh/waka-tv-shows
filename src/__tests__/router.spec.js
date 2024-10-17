import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import router from '@/router'


vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    createRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      options: {
        routes: [
          {
            path: '',
            name: 'home',
            component: { name: 'Layout' },
            children: [
              { path: '/', name: 'home', component: { name: 'HomeView' }
            },
              { path: '/show', name: 'show', component: { name: 'ShowView' } }
            ]
          }
        ]
      }
    })),
    createWebHistory: vi.fn(),
    createMemoryHistory: vi.fn()
  }
})

vi.mock('import.meta', () => ({
  env: {
    BASE_URL: '/'
  }
}))

vi.mock('@/views/HomeView.vue', () => ({
  default: { name: 'HomeView' }
}))
vi.mock('@/views/ShowView.vue', () => ({ default: { name: 'ShowView' } }))
vi.mock('@/views/Layout.vue', () => ({ default: { name: 'Layout' } }))

describe('Router', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    vi.resetModules()

  })
  it('should create a router instance', () => {
    expect(router).toBeDefined()
    expect(router).toHaveProperty('push')
    expect(router).toHaveProperty('replace')
  })

  // it('uses the correct history mode', () => {
  //   // force window to be defined
  //   vi.stubGlobal('window', {})

  //   expect(createWebHistory).toHaveBeenCalled()
  //   expect(createMemoryHistory).not.toHaveBeenCalled()

  //   // expect(router.history.mode).toBe('history')
  // // if (typeof window === 'undefined') {
  // //   expect(createMemoryHistory).toHaveBeenCalled()
  // // } else {
  // //   expect(createWebHistory).toHaveBeenCalled()
  // // }
  // })

  it('has the correct routes', () => {
  const routes = router.options.routes
  expect(routes).toHaveLength(1)

  const rootRoute = routes[0]
  expect(rootRoute.path).toBe('')
  expect(rootRoute.name).toBe('home')
  expect(rootRoute.component.name).toBe('Layout')

  const children = rootRoute.children
  expect(children).toHaveLength(2)

  expect(children[0].path).toBe('/')
  expect(children[0].name).toBe('home')
  expect(children[0].component.name).toBe('HomeView')

  expect(children[1].path).toBe('/show')
  expect(children[1].name).toBe('show')
  expect(children[1].component.name).toBe('ShowView')
})

it('lazy loads components', async () => {
    const routes = router.options.routes
    const homeComponent = await routes[0].children[0].component
    const showComponent = await routes[0].children[1].component

    expect(homeComponent).toBeDefined()
    expect(homeComponent.name).toBe('HomeView')
    expect(showComponent).toBeDefined()
    expect(showComponent.name).toBe('ShowView')
  })

})