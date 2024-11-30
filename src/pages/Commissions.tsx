import { useContracts } from '../hooks/useContracts';
import { BarChart, DollarSign, TrendingUp } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { formatCurrency } from '../utils/currency';
import { calculateCommission } from '../utils/currency';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Commissions() {
  const { contracts, isLoading } = useContracts();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  // Get active contracts
  const activeContracts = contracts.filter(contract => contract.status === 'active');

  // Calculate commissions by responsible
  const commissionsByResponsible = activeContracts.reduce((acc, contract) => {
    const responsible = contract.responsible;
    const commission = calculateCommission(
      contract.monthlyValue,
      contract.commissionType,
      contract.commissionValue
    );

    if (!acc[responsible]) {
      acc[responsible] = {
        totalCommission: 0,
        contracts: 0,
        activeContracts: 0,
      };
    }

    acc[responsible].totalCommission += commission;
    acc[responsible].contracts += 1;
    acc[responsible].activeContracts += contract.status === 'active' ? 1 : 0;

    return acc;
  }, {} as Record<string, { totalCommission: number; contracts: number; activeContracts: number }>);

  // Prepare data for the chart
  const responsibles = Object.keys(commissionsByResponsible);
  const commissionData = {
    labels: responsibles,
    datasets: [
      {
        label: 'Comissões do Mês',
        data: responsibles.map(responsible => commissionsByResponsible[responsible].totalCommission),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  // Calculate totals
  const totalCommissions = Object.values(commissionsByResponsible)
    .reduce((sum, { totalCommission }) => sum + totalCommission, 0);

  const averageCommission = responsibles.length > 0
    ? totalCommissions / responsibles.length
    : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Comissões</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total em Comissões</p>
              <p className="text-2xl font-bold">{formatCurrency(totalCommissions)}</p>
            </div>
            <DollarSign className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Média por Vendedor</p>
              <p className="text-2xl font-bold">{formatCurrency(averageCommission)}</p>
            </div>
            <BarChart className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de Vendedores</p>
              <p className="text-2xl font-bold">{responsibles.length}</p>
            </div>
            <TrendingUp className="text-indigo-500" size={24} />
          </div>
        </div>
      </div>

      {/* Commission Chart */}
      {responsibles.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Comissões por Vendedor</h2>
          <Bar data={commissionData} />
        </div>
      )}

      {/* Top Sellers Table */}
      {responsibles.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Vendedores</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendedor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contratos Totais
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contratos Ativos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comissão Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {responsibles.map((responsible) => (
                  <tr key={responsible} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{responsible}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {commissionsByResponsible[responsible].contracts}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {commissionsByResponsible[responsible].activeContracts}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(commissionsByResponsible[responsible].totalCommission)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">Nenhum contrato com comissão cadastrado</p>
        </div>
      )}
    </div>
  );
}

export default Commissions;