import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contractSchema, type ContractFormData } from '../utils/validation'

interface ContractFormProps {
  onSubmit: (data: ContractFormData) => void
  isSubmitting?: boolean
}

export function ContractForm({ onSubmit, isSubmitting }: ContractFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
            Nome do Cliente
          </label>
          <input
            id="clientName"
            type="text"
            {...register('clientName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.clientName && (
            <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Data de Início
          </label>
          <input
            id="startDate"
            type="date"
            {...register('startDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            Data de Término
          </label>
          <input
            id="endDate"
            type="date"
            {...register('endDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="monthlyValue" className="block text-sm font-medium text-gray-700">
            Valor Mensal
          </label>
          <input
            id="monthlyValue"
            type="number"
            step="0.01"
            {...register('monthlyValue', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.monthlyValue && (
            <p className="mt-1 text-sm text-red-600">{errors.monthlyValue.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="responsible" className="block text-sm font-medium text-gray-700">
            Responsável
          </label>
          <input
            id="responsible"
            type="text"
            {...register('responsible')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.responsible && (
            <p className="mt-1 text-sm text-red-600">{errors.responsible.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="commissionType" className="block text-sm font-medium text-gray-700">
            Tipo de Comissão
          </label>
          <select
            id="commissionType"
            {...register('commissionType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="percentage">Percentual</option>
            <option value="fixed">Valor Fixo</option>
          </select>
          {errors.commissionType && (
            <p className="mt-1 text-sm text-red-600">{errors.commissionType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="commissionValue" className="block text-sm font-medium text-gray-700">
            Valor da Comissão
          </label>
          <input
            id="commissionValue"
            type="number"
            step="0.01"
            {...register('commissionValue', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.commissionValue && (
            <p className="mt-1 text-sm text-red-600">{errors.commissionValue.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Contrato'}
        </button>
      </div>
    </form>
  )
}