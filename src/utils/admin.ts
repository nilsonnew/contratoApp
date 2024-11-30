import { api } from './api'

export const cleanDatabase = async () => {
  try {
    await api.post('/admin/clean-database')
    return { success: true, message: 'Database cleaned successfully' }
  } catch (error) {
    console.error('Failed to clean database:', error)
    throw new Error('Failed to clean database')
  }
}