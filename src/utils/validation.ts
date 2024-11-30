import { z } from 'zod'

export const contractSchema = z.object({
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  email: z.string().email('E-mail inválido'),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de término é obrigatória'),
  monthlyValue: z.number().positive('Valor deve ser maior que zero'),
  responsible: z.string().min(1, 'Responsável é obrigatório'),
  commissionType: z.enum(['percentage', 'fixed']),
  commissionValue: z.number().positive('Valor deve ser maior que zero'),
})

export type ContractFormData = z.infer<typeof contractSchema>