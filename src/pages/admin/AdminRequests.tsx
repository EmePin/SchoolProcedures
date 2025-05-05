import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, 
  Search, 
  Download, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Package
} from 'lucide-react';
import { mockRequests } from '../../mock/data';
import { IDRequest } from '../../types';

const AdminRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  
  // Add some more mock data for pagination demonstration
  const allRequests = [...mockRequests, ...mockRequests.map(req => ({
    ...req,
    id: `${req.id}-2`,
    studentId: `${req.studentId}-2`,
  }))];
  
  const itemsPerPage = 10;
  
  // Filter requests based on search term and status
  const filteredRequests = allRequests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || request.status.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Paginate results
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle checkbox selection
  const toggleRequestSelection = (id: string) => {
    setSelectedRequests(prevSelected => 
      prevSelected.includes(id) 
        ? prevSelected.filter(requestId => requestId !== id)
        : [...prevSelected, id]
    );
  };
  
  const toggleAllSelection = () => {
    if (selectedRequests.length === paginatedRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(paginatedRequests.map(req => req.id));
    }
  };
  
  // Batch actions for selected requests
  const handleBatchAction = (action: 'approve' | 'reject' | 'process') => {
    console.log(`Batch ${action} for IDs:`, selectedRequests);
    // In a real app, this would make an API call to process these requests
    
    // Clear selection after action
    setSelectedRequests([]);
  };
  
  // Get status badge component
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="status-badge status-pending flex items-center">
            <Clock size={12} className="mr-1" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="status-badge status-approved flex items-center">
            <CheckCircle size={12} className="mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="status-badge status-rejected flex items-center">
            <XCircle size={12} className="mr-1" />
            Rejected
          </span>
        );
      case 'processing':
        return (
          <span className="status-badge status-processing flex items-center">
            <Package size={12} className="mr-1" />
            Processing
          </span>
        );
      case 'ready':
        return (
          <span className="status-badge status-approved flex items-center">
            <CheckCircle size={12} className="mr-1" />
            Ready
          </span>
        );
      default:
        return (
          <span className="status-badge status-pending">
            {status}
          </span>
        );
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">ID Card Requests</h1>
          <p className="text-gray-600">Manage and process student ID card requests</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          {/* <Link to="/admin/requests/new" className="btn btn-primary flex items-center">
            <Plus size={16} className="mr-1" />
            New Request
          </Link> */}
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn btn-outline flex items-center"
          >
            <Filter size={16} className="mr-1" />
            Filters
          </button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              className="form-input pl-10 w-full"
              placeholder="Search by name, ID, or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="btn btn-outline flex items-center">
              <Download size={16} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        
        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="statusFilter" className="form-label">Status</label>
              <select
                id="statusFilter"
                className="form-input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="processing">Processing</option>
                <option value="ready">Ready</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="departmentFilter" className="form-label">Department</label>
              <select id="departmentFilter" className="form-input">
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Engineering">Engineering</option>
                <option value="Arts and Humanities">Arts and Humanities</option>
                <option value="Medicine">Medicine</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateFilter" className="form-label">Request Date</label>
              <select id="dateFilter" className="form-input">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="last_month">Last Month</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Batch Actions */}
      {selectedRequests.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-blue-700 font-medium mb-2 sm:mb-0">
            {selectedRequests.length} {selectedRequests.length === 1 ? 'request' : 'requests'} selected
          </p>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleBatchAction('approve')}
              className="btn bg-green-500 hover:bg-green-600 text-white text-sm py-1"
            >
              Approve
            </button>
            <button 
              onClick={() => handleBatchAction('reject')}
              className="btn bg-red-500 hover:bg-red-600 text-white text-sm py-1"
            >
              Reject
            </button>
            <button 
              onClick={() => handleBatchAction('process')}
              className="btn bg-blue-500 hover:bg-blue-600 text-white text-sm py-1"
            >
              Process
            </button>
          </div>
        </div>
      )}
      
      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2 rounded"
                      checked={selectedRequests.length === paginatedRequests.length && paginatedRequests.length > 0}
                      onChange={toggleAllSelection}
                    />
                    Student
                  </div>
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
              {paginatedRequests.length > 0 ? (
                paginatedRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-3 rounded"
                          checked={selectedRequests.includes(request.id)}
                          onChange={() => toggleRequestSelection(request.id)}
                        />
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
                      {getStatusBadge(request.status.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Link to={`/admin/requests/${request.id}`} className="text-primary-600 hover:text-primary-800 font-medium">
                        Details
                      </Link>
                      <span className="text-gray-300">|</span>
                      <button className="text-green-600 hover:text-green-800 font-medium">
                        Approve
                      </button>
                      <span className="text-gray-300">|</span>
                      <button className="text-red-600 hover:text-red-800 font-medium">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No requests found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredRequests.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} results
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`btn btn-outline p-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ArrowLeft size={16} />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`btn ${currentPage === pageNum ? 'bg-primary-100 text-primary-800' : 'bg-white text-gray-600 hover:bg-gray-50'} w-8 h-8 p-0 flex items-center justify-center rounded-md text-sm`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {totalPages > 5 && (
                  <>
                    <span className="flex items-center px-2">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`btn ${currentPage === totalPages ? 'bg-primary-100 text-primary-800' : 'bg-white text-gray-600 hover:bg-gray-50'} w-8 h-8 p-0 flex items-center justify-center rounded-md text-sm`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`btn btn-outline p-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRequests;