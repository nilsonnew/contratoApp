import { format, differenceInDays, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: string | Date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'dd/MM/yyyy', { locale: ptBR })
}

export const getContractStatus = (endDate: string | Date) => {
  const parsedDate = typeof endDate === 'string' ? parseISO(endDate) : endDate
  const daysUntilEnd = differenceInDays(parsedDate, new Date())
  
  if (daysUntilEnd < 0) return 'expired'
  if (daysUntilEnd <= 30) return 'expiring'
  return 'active'
}

export const isContractExpiring = (endDate: string | Date) => {
  const parsedDate = typeof endDate === 'string' ? parseISO(endDate) : endDate
  const daysUntilEnd = differenceInDays(parsedDate, new Date())
  return daysUntilEnd <= 30 && daysUntilEnd >= 0
}