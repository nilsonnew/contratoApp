import prisma from '../../lib/db'
import { startOfMonth, endOfMonth } from 'date-fns'

export const commissionsApi = {
  async calculate(month: Date) {
    const contracts = await prisma.contract.findMany({
      where: {
        startDate: { lte: endOfMonth(month) },
        endDate: { gte: startOfMonth(month) },
        status: 'active',
      },
    })

    const commissions = contracts.map((contract) => ({
      responsible: contract.responsible,
      amount: contract.commissionType === 'percentage'
        ? (contract.monthlyValue * contract.commissionValue) / 100
        : contract.commissionValue,
      month: startOfMonth(month),
    }))

    return prisma.commission.createMany({
      data: commissions,
    })
  },

  async getByMonth(month: Date) {
    return prisma.commission.findMany({
      where: {
        month: {
          gte: startOfMonth(month),
          lte: endOfMonth(month),
        },
      },
    })
  },
}