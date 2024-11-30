import type { Contract, Client } from '@prisma/client';

const API_URL = '/api';

export interface ContractWithClient extends Contract {
  client: Client;
}

export interface ContractInput {
  clientName: string;
  email: string;
  startDate: string;
  endDate: string;
  monthlyValue: number;
  responsible: string;
  commissionType: 'percentage' | 'fixed';
  commissionValue: number;
}

export const contractsApi = {
  async getAll(): Promise<ContractWithClient[]> {
    const response = await fetch(`${API_URL}/contracts`);
    if (!response.ok) {
      throw new Error('Failed to fetch contracts');
    }
    return response.json();
  },

  async create(data: ContractInput): Promise<ContractWithClient> {
    const response = await fetch(`${API_URL}/contracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create contract');
    }
    return response.json();
  },
};