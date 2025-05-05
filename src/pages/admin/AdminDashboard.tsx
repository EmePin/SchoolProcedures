import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart2,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Calendar
} from 'lucide-react';
import { mockStats, mockRequests } from '../../mock/data';
import { motion } from 'framer-motion';

// Component for displaying stats in a card
const StatCard = ({ title, value, icon, trend, trendValue, color }: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-card">
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        
        {trend && trendValue && (
          <div className={`flex items-center mt-2 text-sm ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {trend === 'up' ? (
              <TrendingUp size={16} className="mr-1" />
            ) : trend === 'down' ? (
              <TrendingDown size={16} className="mr-1" />
            ) : null}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className={`${color} p-3 rounded-full`}>
        {icon}
      </div>
    </div>
  </div>
);

// Simple line chart component
const LineChart = ({ data, labels }: { data: number[], labels: string[] }) => {
  // Find max value for scaling
  const maxValue = Math.max(...data);
  
  return (
    <div className="h-40">
      <div className="flex items-end h-full space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-primary-600 hover:bg-primary-700 transition-all rounded-t"
              style={{ height: `${(value / maxValue) * 100}%` }}
            ></div>
            <span className="text-xs text-gray-500 mt-1">{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');
  
  // Generate week day labels
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Generate month labels
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of ID card requests and student activity</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="flex space-x-2">
            <Link to="/admin/requests" className="btn btn-primary flex items-center">
              <CreditCard size={16} className="mr-1" />
              View All Requests
            </Link>
          </div>
        </div>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Total Requests"
            value={mockStats.total}
            icon={<CreditCard size={24} className="text-primary-700" />}
            trend="up"
            trendValue="+12% from last month"
            color="bg-primary-50"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Pending Requests"
            value={mockStats.pending}
            icon={<Clock size={24} className="text-amber-700" />}
            trend="down"
            trendValue="-5% from last month"
            color="bg-amber-50"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Processed Today"
            value="15"
            icon={<CheckCircle size={24} className="text-green-700" />}
            color="bg-green-50"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Requires Attention"
            value="8"
            icon={<AlertTriangle size={24} className="text-red-700" />}
            trend="up"
            trendValue="+3 since yesterday"
            color="bg-red-50"
          />
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-2"
        >
          {/* Chart */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">ID Card Requests</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setTimeRange('weekly')}
                  className={`px-3 py-1 rounded text-sm ${
                    timeRange === 'weekly' 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setTimeRange('monthly')}
                  className={`px-3 py-1 rounded text-sm ${
                    timeRange === 'monthly' 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
            
            <LineChart 
              data={timeRange === 'weekly' ? mockStats.weeklyData : mockStats.monthlyData}
              labels={timeRange === 'weekly' ? weekDays : months}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-lg font-bold">{mockStats.total}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-lg font-bold text-amber-600">{mockStats.pending}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-lg font-bold text-green-600">{mockStats.approved}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-lg font-bold text-red-600">{mockStats.rejected}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-card p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Recent Activity</h2>
              {/* <Link to="/admin/activity" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link> */}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <CheckCircle size={16} className="text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">ID card approved</p>
                  <p className="text-xs text-gray-500">John Smith (STU-2023-1234)</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <CreditCard size={16} className="text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">New ID request submitted</p>
                  <p className="text-xs text-gray-500">Sarah Johnson (STU-2023-2345)</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <AlertTriangle size={16} className="text-red-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">ID request rejected</p>
                  <p className="text-xs text-gray-500">Emily Davis (STU-2023-4567)</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Clock size={16} className="text-amber-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">ID card ready for pickup</p>
                  <p className="text-xs text-gray-500">David Wilson (STU-2023-5678)</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Users size={16} className="text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">New student registered</p>
                  <p className="text-xs text-gray-500">Robert Johnson (STU-2023-6789)</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8"
      >
        <div className="bg-white rounded-lg shadow-card">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold">Recent ID Card Requests</h2>
            <Link to="/admin/requests" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
              View All
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {request.photoUrl ? (
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            <img src={request.photoUrl} alt="" className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="text-gray-500 font-medium">{request.studentName.charAt(0)}</span>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.studentName}</div>
                          <div className="text-sm text-gray-500">{request.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.requestDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge ${
                        request.status.status === 'pending' ? 'status-pending' :
                        request.status.status === 'approved' ? 'status-approved' :
                        request.status.status === 'rejected' ? 'status-rejected' :
                        request.status.status === 'processing' ? 'status-processing' :
                        'status-approved'
                      }`}>
                        {request.status.statusText}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link to={`/admin/requests/${request.id}`} className="text-primary-600 hover:text-primary-800 font-medium">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          
          <div className="space-y-2">
            <Link to="/admin/requests/new" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors">
              <div className="bg-primary-100 p-2 rounded-full mr-3">
                <CreditCard size={18} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Create New ID Card</p>
                <p className="text-xs text-gray-500">Manually create a new ID card</p>
              </div>
            </Link>
            
            <Link to="/admin/students/import" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Users size={18} className="text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Import Student Data</p>
                <p className="text-xs text-gray-500">Bulk import from CSV</p>
              </div>
            </Link>
            
            <Link to="/admin/reports/generate" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors">
              <div className="bg-amber-100 p-2 rounded-full mr-3">
                <BarChart2 size={18} className="text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Generate Reports</p>
                <p className="text-xs text-gray-500">Create custom reports</p>
              </div>
            </Link>
            
            <Link to="/admin/settings" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <Calendar size={18} className="text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Schedule Batch Processing</p>
                <p className="text-xs text-gray-500">Set up automated processing</p>
              </div>
            </Link>
          </div>
        </div>
        
        {/* System Status */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-bold mb-4">System Status</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Server Status</p>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Operational</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">98% uptime in the last 30 days</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Database</p>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Operational</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">100% uptime in the last 30 days</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">ID Card Printer</p>
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Low Ink</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Cyan cartridge needs replacement soon</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Storage</p>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Healthy</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">42% of 1TB used</p>
            </div>
          </div>
        </div>
        
        {/* Upcoming Schedule */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-bold mb-4">Upcoming Schedule</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-primary-500 pl-3">
              <p className="text-sm font-medium">Batch Processing</p>
              <p className="text-xs text-gray-500">Today, 6:00 PM</p>
              <p className="text-xs text-gray-600 mt-1">45 cards scheduled for printing</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-3">
              <p className="text-sm font-medium">System Maintenance</p>
              <p className="text-xs text-gray-500">Tomorrow, 2:00 AM</p>
              <p className="text-xs text-gray-600 mt-1">Estimated downtime: 30 minutes</p>
            </div>
            
            <div className="border-l-4 border-amber-500 pl-3">
              <p className="text-sm font-medium">Bulk Card Distribution</p>
              <p className="text-xs text-gray-500">May 15, 9:00 AM</p>
              <p className="text-xs text-gray-600 mt-1">Engineering Department</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-3">
              <p className="text-sm font-medium">New Semester Registration</p>
              <p className="text-xs text-gray-500">August 20-25</p>
              <p className="text-xs text-gray-600 mt-1">Expected high volume of requests</p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            {/* <Link to="/admin/schedule" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View Full Schedule
            </Link> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;