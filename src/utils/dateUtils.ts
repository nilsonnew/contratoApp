import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
};

export const getContractStatus = (endDate: string) => {
  const daysUntilEnd = differenceInDays(new Date(endDate), new Date());
  
  if (daysUntilEnd < 0) return 'expired';
  if (daysUntilEnd <= 30) return 'expiring';
  return 'active';
};