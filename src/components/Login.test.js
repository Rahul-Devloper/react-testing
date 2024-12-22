import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Login from './Login'

//mocking axios
jest.mock('axios', () => ({
  __esModule: true, // since we are using es6, we need this
  default: {
    get: () => ({
      //mocking the get method, returning a promise, with a resolved value
      data: { id: 1, name: 'John Doe' }, //mocking the resolved value
    }),
  },
}))

test('username input should be rendered', () => {
  render(<Login />)
  const userInputElement = screen.getByPlaceholderText('email')
  expect(userInputElement).toBeInTheDocument()
})

test('password input should be rendered', () => {
  render(<Login />)
  const passwordInputElement = screen.getByPlaceholderText('password')
  expect(passwordInputElement).toBeInTheDocument()
})

test('login button should be rendered', () => {
  render(<Login />)
  const loginButtonElement = screen.getByRole('button')
  expect(loginButtonElement).toBeInTheDocument()
})
test('email value should be empty', () => {
  render(<Login />)
  const userInputElement = screen.getByPlaceholderText('email')
  expect(userInputElement.value).toBe('')
})
test('password value should be empty', () => {
  render(<Login />)
  const passwordInputElement = screen.getByPlaceholderText('password')
  expect(passwordInputElement.value).toBe('')
})
test('login button should be disabled', () => {
  render(<Login />)
  const loginButtonElement = screen.getByRole('button')
  expect(loginButtonElement).toBeDisabled()
})
test('loading should be rendered', () => {
  render(<Login />)
  const loginButtonElement = screen.getByRole('button')
  expect(loginButtonElement).not.toHaveTextContent(/loading/i)
})

test('error message should not be visible by default', () => {
  render(<Login />)
  const errorMessageElement = screen.getByTestId('error')
  expect(errorMessageElement).not.toBeVisible()
})
test('username input should change', () => {
  render(<Login />)
  const userInputElement = screen.getByPlaceholderText('email')
  const testValue = 'test'
  fireEvent.change(userInputElement, { target: { value: testValue } })

  expect(userInputElement.value).toBe(testValue)
})
test('password input should change', () => {
  render(<Login />)
  const passwordInputElement = screen.getByPlaceholderText('password')
  const testValue = 'test'
  fireEvent.change(passwordInputElement, { target: { value: testValue } })

  expect(passwordInputElement.value).toBe(testValue)
})

test('login button should be enabled', () => {
  render(<Login />)
  const loginButtonElement = screen.getByRole('button')
  const userInputElement = screen.getByPlaceholderText('email')
  const passwordInputElement = screen.getByPlaceholderText('password')

  const testValue = 'test'

  fireEvent.change(userInputElement, { target: { value: testValue } })
  fireEvent.change(passwordInputElement, { target: { value: testValue } })

  expect(loginButtonElement).not.toBeDisabled()
})

test('loading should be rendered after login', () => {
  render(<Login />)
  const loginButtonElement = screen.getByRole('button')
  const userInputElement = screen.getByPlaceholderText('email')
  const passwordInputElement = screen.getByPlaceholderText('password')

  const testValue = 'test'

  fireEvent.change(userInputElement, { target: { value: testValue } })
  fireEvent.change(passwordInputElement, { target: { value: testValue } })

  fireEvent.click(loginButtonElement)
  expect(loginButtonElement).toHaveTextContent(/loading/i)
})

test('loading should not be rendered after fetching data', async () => {
  render(<Login />)
  const loginButtonElement = screen.getByRole('button')
  const userInputElement = screen.getByPlaceholderText('email')
  const passwordInputElement = screen.getByPlaceholderText('password')

  const testValue = 'test'

  fireEvent.change(userInputElement, { target: { value: testValue } })
  fireEvent.change(passwordInputElement, { target: { value: testValue } })

  fireEvent.click(loginButtonElement)
  await waitFor(() =>
    expect(loginButtonElement).not.toHaveTextContent(/loading/i)
  )
})

test('username should be rendered after fetching data', async () => {
  render(<Login />)
  const loginButtonElement = screen.getByRole('button')
  const userInputElement = screen.getByPlaceholderText('email')
  const passwordInputElement = screen.getByPlaceholderText('password')

  const testValue = 'test'

  fireEvent.change(userInputElement, { target: { value: testValue } })
  fireEvent.change(passwordInputElement, { target: { value: testValue } })

  fireEvent.click(loginButtonElement)
  const userName = await screen.findByText('John Doe') //John DOe is data received from promise, hence await is used to mock the await process of data received
  expect(userName).toBeInTheDocument()
})
