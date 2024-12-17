import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
test('checking list item', () => {
  render(<App />)
  const listElements = screen.getAllByRole('listitem')
  expect(listElements).toHaveLength(3)
})

test('checking sum', () => {
  render(<App />)
  const sumElement = screen.getByTitle('sum')
  expect(sumElement.textContent).toBe('5')
})
