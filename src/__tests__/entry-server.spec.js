import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createApp } from '@/main.server'
import router from '@/router'
import { createPinia } from 'pinia'
import { renderToString } from '@vue/server-renderer'
import { render } from '@/entry-server'

// mock the imports
vi.mock('@/main.server', () => ({
  createApp: vi.fn(() => ({
    app: {
      use: vi.fn()
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

vi.mock('@vue/server-renderer', () => ({
  renderToString: vi.fn().mockResolvedValue('<div>Mocked HTML</div>')
}))

describe('entry-server', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates the app and applies plugins', async () => {
    const mockApp = {
      use: vi.fn()
    }
    createApp.mockReturnValue({ app: mockApp })

    await render()

    expect(createApp).toHaveBeenCalled()

    // Check if createPinia was called
    expect(createPinia).toHaveBeenCalled()

    // Check if app.use was called with pinia and router
    expect(mockApp.use).toHaveBeenCalledTimes(2)
    expect(mockApp.use).toHaveBeenCalledWith(expect.any(Object))
    expect(mockApp.use).toHaveBeenCalledWith(router)

    // Check if renderToString was called with the app
    expect(renderToString).toHaveBeenCalledWith(mockApp)

  })
})