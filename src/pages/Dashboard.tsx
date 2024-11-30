import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { AlertTriangle, TrendingUp, Users, Wallet } from 'lucide-react';
import { useContracts } from '../hooks/useContracts';
import { formatCurrency } from '../utils/currency';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const { contracts, isLoading } = useContracts();

  // Calculate real statistics
  const activeContracts = contracts.filter(c => c.status === 'active');
  const expiringContracts = contracts.filter(c => c.status === 'expiring');
  const expiredContracts = contracts.filter(c => c.status === 'expired');

  const totalMonthlyRevenue = activeContracts.reduce((sum, contract) => 
    sum + contract.monthlyValue, 0
  );

  const totalCommissions = activeContracts.reduce((sum, contract) => {
    const commissionAmount = contract.commissionType === 'percentage'
      ? (contract.monthlyValue * contract.commissionValue) / 100
      : contract.commissionValue;
    return sum + commissionAmount;
  }, 0);

  const contractStatusData = {
    labels: ['Ativos', 'Próximos ao Vencimento', 'Expirados'],
    datasets: [
      {
        data: [
          activeContracts.length,
          expiringContracts.length,
          expiredContracts.length
        ],
        backgroundColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)',
        ],
      },
    ],
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Receita Mensal</p>
              <p className="text-2xl font-bold">{formatCurrency(totalMonthlyRevenue)}</p>
            </div>
            <TrendingUp className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Comissões</p>
              <p className="text-2xl font-bold">{formatCurrency(totalCommissions)}</p>
            </div>
            <Wallet className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Contratos Ativos</p>
              <p className="text-2xl font-bold">{activeContracts.length}</p>
            </div>
            <Users className="text-indigo-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Próx. Vencimento</p>
              <p className="text-2xl font-bold">{expiringContracts.length}</p>
            </div>
            <AlertTriangle className="text-yellow-500" size={24} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Status dos Contratos</h2>
          <div className="w-2/3 mx-auto">
            <Doughnut data={contractStatusData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;