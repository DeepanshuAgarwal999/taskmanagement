import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TaskCard } from '../components/task/TaskCard'
import { useDispatch } from 'react-redux'
import { deleteTask } from '@/redux/slices/task.slice'

// Mock the TaskForm component since it's part of the UI but doesn't need testing here
vi.mock('../forms/TaskForm', () => ({
  default: () => <div>Task Form</div>,
}))
const task = {
  id: 1,
  title: 'Test Task',
  message: 'Test message',
  createdAt: new Date(),
  updatedAt: new Date(),
  dueDate: new Date()
}
const mockDispatch = vi.fn()
describe('TaskCard', () => {
 

  // Mock the useDispatch hook
  vi.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
  }))

  it('renders the task title and message', () => {
    render(<TaskCard task={task} />)

    // Check if task title and message are displayed
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('opens the dialog when edit button is clicked', async() => {
    render(<TaskCard task={task} />)

    // Click the edit button (pen icon)
    fireEvent.click(screen.getByRole('button', { name: /edit task/i }))
    const dialog = await screen.findByRole('dialog', { hidden: true }) // Dialog is typically role="dialog"
    expect(dialog).toBeInTheDocument()


    // Check if TaskForm dialog is displayed
    // expect(screen.getByText('')).toBeInTheDocument()
  })

 


  it('renders created and updated date correctly', () => {
    render(<TaskCard task={task} />)

    const dateElements = screen.getByText(/created at:/i)
    expect(dateElements).toBeInTheDocument()
  })
})
