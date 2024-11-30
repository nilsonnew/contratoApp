import prisma from '../../lib/db'
import { getContractStatus } from '../../utils/dateUtils'

export interface ContractInput {
  clientName: string
  email: string
  startDate: string
  endDate: string
  monthlyValue: number
  responsible: string
  commissionType: 'percentage' | 'fixed'
  commissionValue: number
}

export const contractsApi = {
  async create(data: ContractInput) {
    return prisma.client.create({
      data: {
        name: data.clientName,
        email: data.email,
        contracts: {
          create: {
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            monthlyValue: data.monthlyValue,
            responsible: data.responsible,
            commissionType: data.commissionType,
            commissionValue: data.commissionValue,
            status: getContractStatus(data.endDate),
          },
        },
      },
      include: {
        contracts: true,
      },
    })
  },

  async getAll() {
    return prisma.contract.findMany({
      include: {
        client: true,
      },
    })
  },

  async getByStatus(status: string) {
    return prisma.contract.findMany({
      where: { status },
      include: {
        client: true,
      },
    })
  },
}