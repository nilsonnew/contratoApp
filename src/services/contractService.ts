import prisma from '../lib/prisma';
import { addMonths, startOfMonth, endOfMonth } from 'date-fns';

export const contractService = {
  async createContract(data: {
    clientName: string;
    email: string;
    startDate: string;
    endDate: string;
    monthlyValue: number;
    responsible: string;
    commissionType: 'percentage' | 'fixed';
    commissionValue: number;
  }) {
    const client = await prisma.client.create({
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
          },
        },
      },
      include: {
        contracts: true,
      },
    });
    return client;
  },

  async getAllContracts() {
    return prisma.contract.findMany({
      include: {
        client: true,
      },
    });
  },

  async getContractsByStatus(status: string) {
    return prisma.contract.findMany({
      where: {
        status,
      },
      include: {
        client: true,
      },
    });
  },

  async calculateCommissions(month: Date) {
    const contracts = await prisma.contract.findMany({
      where: {
        startDate: {
          lte: endOfMonth(month),
        },
        endDate: {
          gte: startOfMonth(month),
        },
      },
    });

    const commissions = contracts.map((contract) => {
      const amount =
        contract.commissionType === 'percentage'
          ? (contract.monthlyValue * contract.commissionValue) / 100
          : contract.commissionValue;

      return {
        responsible: contract.responsible,
        amount,
        month: startOfMonth(month),
      };
    });

    return prisma.commission.createMany({
      data: commissions,
    });
  },

  async getCommissionsByMonth(month: Date) {
    return prisma.commission.findMany({
      where: {
        month: {
          gte: startOfMonth(month),
          lte: endOfMonth(month),
        },
      },
    });
  },
};