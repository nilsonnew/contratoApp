import { useNavigate } from 'react-router-dom'
import { ContractForm } from '../components/ContractForm'
import { useContracts } from '../hooks/useContracts'
import type { ContractFormData } from '../utils/validation'

function NewContract() {
  const navigate = useNavigate()
  const { createContract, isCreating } = useContracts()

  const handleSubmit = async (data: ContractFormData) => {
    try {
      await createContract(data)
      navigate('/contracts')
    } catch (error) {
      console.error('Error creating contract:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Novo Contrato</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ContractForm onSubmit={handleSubmit} isSubmitting={isCreating} />
      </div>
    </div>
  )
}

export default NewContract