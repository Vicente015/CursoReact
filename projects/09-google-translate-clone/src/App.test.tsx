import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import App from './App'

test('My app works as expected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)
  const textAreaFrom = app.getByPlaceholderText('Escriba el texto a traducir')

  await user.type(textAreaFrom, 'Hola mundo')
  await user.click(app.getByLabelText('Translate'))
  const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 5000 })

  expect(result).toBeTruthy()
})
