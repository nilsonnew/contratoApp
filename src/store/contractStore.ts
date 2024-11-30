import { create } from 'zustand';
import { contractsApi, type ContractWithClient, type ContractInput } from '../api/contracts';

interface ContractStore {
  contracts: ContractWithClient[];
  isLoading: boolean;
  error: string | null;
  fetchContracts: () => Promise<void>;
  addContract: (contract: ContractInput) => Promise<void>;
}

export const useContractStore = create<ContractStore>((set) => ({
  contracts: [],
  isLoading: false,
  error: null,

  fetchContracts: async () => {
    set({ isLoading: true });
    try {
      const contracts = await contractsApi.getAll();
      set({ contracts, isLoading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addContract: async (contractData) => {
    set({ isLoading: true });
    try {
      await contractsApi.create(contractData);
      const contracts = await contractsApi.getAll();
      set({ contracts, isLoading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));