import { prisma } from '../../lib/db';
import { getContractStatus } from '../../utils/dateUtils';
import type { ContractInput } from '../../api/contracts';

export const contractService = {
  async getAllContracts() {
    return prisma.contract.findMany({
      include: {
        client: true,
      },
    });
  },

  async createContract(data: ContractInput) {
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
    });
  },
};