import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createApp } from '@/main.server'
import { createPinia } from 'pinia'

// mock the imports
vi.mock('@/main.server', () => ({
  createApp: vi.fn(() => ({
    app: {
      use: vi.fn(),
      mount: vi.fn(),
    }
  }))
}))

vi.mock('@/router', async () => ({
  default: {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }
}))

// mock pinia
vi.mock('pinia', () => ({
  createPinia: vi.fn()
}))

// mock css import
vi.mock('@/assets/main.css', () => ({}))

describe('entry-client', () => {
  let mockApp;

  beforeEach(() => {
    vi.clearAllMocks()
    mockApp = {
      use: vi.fn(),
      mount: vi.fn()
    }
    createApp.mockReturnValue({ app: mockApp })
  })

  it('creates the app and applies plugins', async () => {
    // import the entry file
    await import('@/entry-client')

    // check if the create app was called
    expect(createApp).toHaveBeenCalled()

    // Check if createPinia was called
    expect(createPinia).toHaveBeenCalled()

    // Check if app.use was called with pinia and router
    expect(mockApp.use).toHaveBeenCalledTimes(2)
    expect(mockApp.use).toHaveBeenCalledWith(expect.any(Object)) // Pinia
    // expect(app.use).toHaveBeenCalledWith(router)

    // Check if app.mount was called with the correct element
    // expect(app.mount).toHaveBeenCalledWith('#app-server')

  })
})