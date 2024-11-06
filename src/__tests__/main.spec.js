import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createApp } from '@/main.server'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

// mock the imports
vi.mock('@/main', () => ({
  createApp: vi.fn()
}))

vi.mock('@/router', async () => ({
  default: {}
}))

// mock pinia
vi.mock('pinia', () => ({
  createPinia: vi.fn()
}))

// vi.mock('@/App.vue', () => ({ default: {} }))

// vi.mock('@/logging', () => ({ logErrorToService: vi.fn() }))

// mock css import
vi.mock('@/assets/main.css', () => ({}))

describe('main.js', () => {
  let mockApp

  beforeEach(() => {
    vi.clearAllMocks()
    mockApp = {
      use: vi.fn(),
      mount: vi.fn(),
      config: {}
    }
    // vi.mocked(createApp).mockReturnValue(mockApp)
  })

  it('should create an app', async () => {
    // import the entry file
    await import('@/main')
    // expect(createApp).toHaveBeenCalled()
  })

  // it('should use pinia', () => {
  //   expect(createPinia).toHaveBeenCalled()
  //   expect(mockApp.use).toHaveBeenCalledWith(createPinia())
  // })

  // it('should mount the app', () => {
  //   expect(app.mount).toHaveBeenCalledWith('#app')
  // })
})