import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, handleApiError } from '../utils/api'
import type { ContractFormData } from '../utils/validation'

interface Contract extends ContractFormData {
  id: number
  status: 'active' | 'expiring' | 'expired'
  createdAt: string
  updatedAt: string
}

export function useContracts() {
  const queryClient = useQueryClient()

  const { data: contracts = [], isLoading, error } = useQuery<Contract[]>({
    queryKey: ['contracts'],
    queryFn: async () => {
      try {
        return await api.get('/contracts')
      } catch (error) {
        throw new Error(handleApiError(error))
      }
    },
  })

  const { mutate: createContract, isPending: isCreating } = useMutation({
    mutationFn: async (data: ContractFormData) => {
      try {
        return await api.post('/contracts', data)
      } catch (error) {
        throw new Error(handleApiError(error))
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    },
  })

  return {
    contracts,
    isLoading,
    error,
    createContract,
    isCreating,
  }
}