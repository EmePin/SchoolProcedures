import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Package, 
  Calendar,
  ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { mockRequests } from '../mock/data';
import { IDRequest } from '../types';
import { format } from 'date-fns';

const TrackRequest = () => {
  const { id } = useParams<{ id?: string }>();
  const [request, setRequest] = useState<IDRequest | null>(null);
  const [searchId, setSearchId] = useState(id || '');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      findRequest(id);
    }
  }, [id]);
  
  const findRequest = (requestId: string) => {
    setIsSearching(true);
    setError(null);
    
    // Simulate API request
    setTimeout(() => {
      const foundRequest = mockRequests.find(req => req.id === requestId);
      
      if (foundRequest) {
        setRequest(foundRequest);
      } else {
        setError('Request not found. Please check the ID and try again.');
        setRequest(null);
      }
      
      setIsSearching(false);
    }, 800);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      findRequest(searchId.trim());
    }
  };
  
  // Define timeline based on status
  const getTimeline = (status: string) => {
    const baseTimeline = [
      { name: 'Application Submitted', status: 'complete', icon: <Calendar size={18} /> },
      { name: 'Application Review', status: 'current', icon: <Clock size={18} /> },
      { name: 'ID Card Production', status: 'upcoming', icon: <Package size={18} /> },
      { name: 'Ready for Pickup/Delivery', status: 'upcoming', icon: <CheckCircle size={18} /> },
    ];
    
    switch (status) {
      case 'pending':
        return baseTimeline.map((step, index) => ({
          ...step,
          status: index === 0 ? 'complete' : index === 1 ? 'current' : 'upcoming'
        }));
      case 'approved':
        return baseTimeline.map((step, index) => ({
          ...step,
          status: index <= 1 ? 'complete' : index === 2 ? 'current' : 'upcoming'
        }));
      case 'processing':
        return baseTimeline.map((step, index) => ({
          ...step,
          status: index <= 1 ? 'complete' : index === 2 ? 'current' : 'upcoming'
        }));
      case 'ready':
        return baseTimeline.map((step, index) => ({
          ...step,
          status: index <= 2 ? 'complete' : 'current'
        }));
      case 'delivered':
        return baseTimeline.map(step => ({ ...step, status: 'complete' }));
      case 'rejected':
        return baseTimeline.map((step, index) => ({
          ...step,
          status: index === 0 ? 'complete' : index === 1 ? 'rejected' : 'cancelled'
        }));
      default:
        return baseTimeline;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Track ID Card Request</h1>
        <p className="text-gray-600 mt-1">Enter your request ID to track the status of your student ID card</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-card p-6 mb-8">
        <form onSubmit={handleSearch}>
          <div className="flex">
            <div className="relative flex-grow">
              <input
                type="text"
                className="form-input pl-10 pr-4 py-3"
                placeholder="Enter Request ID (e.g., REQ-2023-0001)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              className={`btn btn-primary ml-2 ${isSearching ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSearching || !searchId.trim()}
            >
              {isSearching ? 'Searching...' : 'Track Request'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 mt-2 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {error}
            </p>
          )}
        </form>
      </div>
      
      {request && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Request Summary */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold mb-1">Request Status</h2>
                <p className="text-sm text-gray-500">ID: {request.id}</p>
              </div>
              <div className={`status-badge ${
                request.status.status === 'pending' ? 'status-pending' :
                request.status.status === 'approved' ? 'status-approved' :
                request.status.status === 'rejected' ? 'status-rejected' :
                request.status.status === 'processing' ? 'status-processing' :
                'status-approved'
              }`}>
                {request.status.statusText}
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Student Name</p>
                  <p className="font-medium">{request.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student ID</p>
                  <p className="font-medium">{request.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{request.department}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Program</p>
                  <p className="font-medium">{request.program}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="font-medium">{format(new Date(request.requestDate), 'MMMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className={`font-medium ${request.paymentStatus === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                    {request.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
                  </p>
                </div>
              </div>
            </div>
            
            {request.comments && (
              <div className="mt-4 p-3 bg-amber-50 rounded-md border-l-4 border-amber-500">
                <p className="text-sm text-amber-800">
                  <AlertCircle size={16} className="inline mr-1" />
                  {request.comments}
                </p>
              </div>
            )}
          </div>
          
          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Request Timeline</h2>
            
            <div className="flow-root">
              <ul className="-mb-8">
                {getTimeline(request.status.status).map((step, stepIdx, array) => (
                  <li key={stepIdx}>
                    <div className="relative pb-8">
                      {stepIdx !== array.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`
                            h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                            ${step.status === 'complete' ? 'bg-green-500' :
                              step.status === 'current' ? 'bg-blue-500' :
                              step.status === 'rejected' ? 'bg-red-500' :
                              step.status === 'cancelled' ? 'bg-gray-400' :
                              'bg-gray-300'}
                          `}>
                            <span className="text-white">{step.icon}</span>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 py-0.5">
                          <div className="flex items-center">
                            <span className={`text-sm font-medium ${
                              step.status === 'complete' ? 'text-green-700' :
                              step.status === 'current' ? 'text-blue-700' :
                              step.status === 'rejected' ? 'text-red-700' :
                              step.status === 'cancelled' ? 'text-gray-500' :
                              'text-gray-500'
                            }`}>
                              {step.name}
                            </span>
                            {step.status === 'complete' && (
                              <CheckCircle size={16} className="ml-2 text-green-500" />
                            )}
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {step.status === 'complete' && (
                              <p>Completed on {format(new Date(request.updatedAt), 'MMMM dd, yyyy')}</p>
                            )}
                            {step.status === 'current' && (
                              <p>In progress</p>
                            )}
                            {step.status === 'rejected' && (
                              <p>Rejected on {format(new Date(request.updatedAt), 'MMMM dd, yyyy')}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Photo Preview */}
          {request.photoUrl && (
            <div className="bg-white rounded-lg shadow-card p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">ID Card Photo</h2>
              
              <div className="flex justify-center">
                <div className="w-40 h-40 bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={request.photoUrl} 
                    alt="ID Card Photo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Next Steps */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <h2 className="text-lg font-bold mb-4">Next Steps</h2>
            
            {request.status.status === 'pending' && (
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-blue-700 mb-2">Your request is currently being reviewed by our staff.</p>
                <p className="text-blue-700">We will notify you once your application has been approved or if we need additional information.</p>
              </div>
            )}
            
            {request.status.status === 'approved' && (
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-green-700 mb-2">Your request has been approved! We are now processing your ID card.</p>
                <p className="text-green-700">You will receive a notification when your ID card is ready for pickup or has been shipped.</p>
              </div>
            )}
            
            {request.status.status === 'rejected' && (
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-700 mb-2">Unfortunately, your request has been rejected.</p>
                <p className="text-red-700">Please review the comments above and submit a new request with the required corrections.</p>
                <div className="mt-4">
                  <Link to="/request-id" className="btn btn-primary">
                    Submit New Request
                  </Link>
                </div>
              </div>
            )}
            
            {request.status.status === 'processing' && (
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-blue-700 mb-2">Your ID card is being produced and will be ready soon.</p>
                <p className="text-blue-700">You will receive a notification once it's ready for pickup or has been shipped.</p>
              </div>
            )}
            
            {request.status.status === 'ready' && (
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-green-700 mb-2">Your ID card is ready for pickup at the Student Services Center.</p>
                <p className="text-green-700 mb-2">Please bring a valid government-issued photo ID for verification.</p>
                <div className="mt-4 p-3 bg-white rounded border border-green-200">
                  <h3 className="font-medium text-green-800 mb-1">Pickup Location & Hours</h3>
                  <p className="text-sm">Student Services Center, Room 101</p>
                  <p className="text-sm">Monday to Friday: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            )}
            
            {request.status.status === 'delivered' && (
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-green-700 mb-2">Your ID card has been successfully delivered.</p>
                <p className="text-green-700">If you have any issues with your card, please contact the Student Services Center.</p>
              </div>
            )}
            
            <div className="mt-6 flex">
              <Link to="/dashboard" className="btn btn-outline flex items-center">
                Back to Dashboard
              </Link>
              {request.paymentStatus === 'pending' && (
                <Link to="/payment" className="btn btn-primary ml-4 flex items-center">
                  Complete Payment
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TrackRequest;