import { z } from 'zod';

export const ContractSchema = z.object({
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  email: z.string().email('E-mail inválido'),
  startDate: z.string(),
  endDate: z.string(),
  monthlyValue: z.number().positive('Valor deve ser maior que zero'),
  responsible: z.string().min(1, 'Responsável é obrigatório'),
  commissionType: z.enum(['percentage', 'fixed']),
  commissionValue: z.number().positive('Valor deve ser maior que zero'),
});

export type ContractInput = z.infer<typeof ContractSchema>;

export interface Contract extends ContractInput {
  id: number;
  status: 'active' | 'expiring' | 'expired';
  createdAt: string;
  updatedAt: string;
  clientId: number;
}