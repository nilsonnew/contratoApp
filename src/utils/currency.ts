export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const calculateCommission = (
  value: number,
  type: 'percentage' | 'fixed',
  commissionValue: number
): number => {
  if (type === 'percentage') {
    return (value * commissionValue) / 100
  }
  return commissionValue
}