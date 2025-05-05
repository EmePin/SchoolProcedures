import { useState } from 'react';
import { 
  FileText,
  Download,
  BarChart2,
  PieChart,
  Calendar,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { mockStats } from '../../mock/data';

const ReportCard = ({ title, description, icon: Icon, date }: {
  title: string;
  description: string;
  icon: React.ElementType;
  date: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{description}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg">
        <Icon size={20} className="text-gray-500" />
      </div>
    </div>
    <div className="flex mt-4 space-x-2">
      <button className="btn btn-outline text-sm py-1 px-3 flex items-center">
        <Download size={14} className="mr-1" />
        PDF
      </button>
      <button className="btn btn-outline text-sm py-1 px-3 flex items-center">
        <Download size={14} className="mr-1" />
        Excel
      </button>
      <button className="btn btn-primary text-sm py-1 px-3 flex items-center ml-auto">
        <ExternalLink size={14} className="mr-1" />
        View
      </button>
    </div>
  </div>
);

// Simple bar chart component for the demo
const SimpleBarChart = ({ data, labels }: { data: number[], labels: string[] }) => {
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

// Donut chart component for the demo
const DonutChart = ({ data }: { data: { name: string; value: number; color: string }[] }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let startAngle = 0;
  
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="#f9fafb" />
          {data.map((item, i) => {
            const angle = (item.value / total) * 360;
            const endAngle = startAngle + angle;
            
            // Convert angles to radians for calculation
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            
            // Calculate the path
            const x1 = 50 + 40 * Math.cos(startRad);
            const y1 = 50 + 40 * Math.sin(startRad);
            const x2 = 50 + 40 * Math.cos(endRad);
            const y2 = 50 + 40 * Math.sin(endRad);
            
            // Determine if the arc should be drawn as a large or small arc
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            // Create the path
            const path = `
              M 50 50
              L ${x1} ${y1}
              A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `;
            
            startAngle = endAngle;
            
            return <path key={i} d={path} fill={item.color} />;
          })}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>
      </div>
      
      <div className="ml-6">
        <ul className="space-y-2">
          {data.map((item, i) => (
            <li key={i} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm">{item.name} ({item.value})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AdminReports = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Mock chart data
  const statusData = [
    { name: 'Pending', value: mockStats.pending, color: '#f59e0b' },
    { name: 'Approved', value: mockStats.approved, color: '#10b981' },
    { name: 'Processing', value: mockStats.processing, color: '#3b82f6' },
    { name: 'Ready', value: mockStats.ready, color: '#0d9488' },
    { name: 'Rejected', value: mockStats.rejected, color: '#ef4444' },
  ];
  
  const generateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // In real app, you would redirect to a new report or open it
    }, 1500);
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-600">Generate and view reports about ID card requests and processing</p>
      </div>
      
      {/* Generate New Report */}
      <div className="bg-white rounded-lg shadow-card p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Generate New Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="form-label">Report Type</label>
            <select className="form-input">
              <option value="id_requests">ID Card Requests</option>
              <option value="student_stats">Student Statistics</option>
              <option value="processing_time">Processing Time Analysis</option>
              <option value="department_breakdown">Department Breakdown</option>
              <option value="monthly_comparison">Monthly Comparison</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Date Range</label>
            <select className="form-input">
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="last_quarter">Last Quarter</option>
              <option value="year_to_date">Year to Date</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Format</label>
            <select className="form-input">
              <option value="pdf">PDF Report</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV Data</option>
              <option value="online">Online Dashboard</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            onClick={generateReport} 
            className={`btn btn-primary ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={16} className="mr-2 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <FileText size={16} className="mr-2" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-card p-6 h-full">
            <h2 className="text-lg font-bold mb-4">Request Trends</h2>
            <SimpleBarChart 
              data={mockStats.monthlyData}
              labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Monthly ID card requests for the current year</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-card p-6 h-full">
            <h2 className="text-lg font-bold mb-4">Current Status</h2>
            <DonutChart data={statusData} />
            <div className="text-center">
              <p className="text-sm text-gray-500">ID card requests by current status</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent & Saved Reports */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Recent Reports</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReportCard 
            title="Monthly Request Summary"
            description="Overview of all ID card requests from the previous month"
            icon={BarChart2}
            date="Generated on April 1, 2025"
          />
          
          <ReportCard 
            title="Department Breakdown"
            description="Analysis of ID card requests by academic department"
            icon={PieChart}
            date="Generated on March 15, 2025"
          />
          
          <ReportCard 
            title="Processing Time Analysis"
            description="Average processing times for ID card requests"
            icon={Calendar}
            date="Generated on March 1, 2025"
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-bold mb-4">Saved Report Templates</h2>
        
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Template Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Generated
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Weekly Status Report</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">Weekly summary of ID card processing status</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Every Monday at 8:00 AM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">March 25, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button className="text-primary-600 hover:text-primary-800 font-medium">Run Now</button>
                  <span className="text-gray-300">|</span>
                  <button className="text-gray-600 hover:text-gray-800 font-medium">Edit</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Monthly Department Analysis</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">Breakdown of requests by department with trends</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">1st of every month</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">March 1, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button className="text-primary-600 hover:text-primary-800 font-medium">Run Now</button>
                  <span className="text-gray-300">|</span>
                  <button className="text-gray-600 hover:text-gray-800 font-medium">Edit</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Quarterly Performance Report</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">Comprehensive analysis of processing times and efficiency</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">End of each quarter</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">December 31, 2024</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button className="text-primary-600 hover:text-primary-800 font-medium">Run Now</button>
                  <span className="text-gray-300">|</span>
                  <button className="text-gray-600 hover:text-gray-800 font-medium">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;