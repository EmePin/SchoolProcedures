import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  ArrowRight,
  School
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { mockRequests, mockNotifications } from '../mock/data';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const [latestRequest, setLatestRequest] = useState(mockRequests[0]);
  const [recentNotifications, setRecentNotifications] = useState(mockNotifications.slice(0, 3));

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
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name}</h1>
        <p className="text-gray-600">Here's an overview of your ID card status and recent activities</p>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Status Card */}
        <motion.div variants={itemVariants} className="card bg-gradient-to-br from-primary-700 to-primary-900 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold">ID Card Status</h2>
              <p className="text-primary-100 mt-1">Last updated: {format(new Date(latestRequest.updatedAt), 'MMM dd, yyyy')}</p>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <CreditCard size={24} />
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              latestRequest.status.status === 'approved' ? 'bg-green-400' :
              latestRequest.status.status === 'pending' ? 'bg-amber-400' :
              latestRequest.status.status === 'rejected' ? 'bg-red-400' :
              latestRequest.status.status === 'processing' ? 'bg-blue-400' :
              'bg-teal-400'
            }`}></div>
            <span className="text-lg font-medium">{latestRequest.status.statusText}</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-primary-100">Student ID</span>
              <span className="font-medium">{user?.studentId || 'Not assigned'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-100">Request ID</span>
              <span className="font-medium">{latestRequest.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-100">Payment</span>
              <span className={`font-medium ${latestRequest.paymentStatus === 'paid' ? 'text-green-300' : 'text-amber-300'}`}>
                {latestRequest.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <Link to={`/track-request/${latestRequest.id}`} className="inline-flex items-center text-white hover:text-primary-100">
              Track your request
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Link to="/request-id" className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center mb-2">
                <CreditCard size={20} />
              </div>
              <span className="text-sm font-medium text-center">Request ID Card</span>
            </Link>
            
            <Link to="/track-request" className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mb-2">
                <Clock size={20} />
              </div>
              <span className="text-sm font-medium text-center">Track Request</span>
            </Link>
            
            {/* <Link to="/help" className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center mb-2">
                <CheckCircle size={20} />
              </div>
              <span className="text-sm font-medium text-center">Help Center</span>
            </Link>
            
            <Link to="/contact" className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-red-100 text-red-800 rounded-full flex items-center justify-center mb-2">
                <AlertCircle size={20} />
              </div>
              <span className="text-sm font-medium text-center">Report Issue</span>
            </Link> */}
          </div>
          
          <div className="mt-6">
            <div className="bg-primary-50 border border-primary-100 rounded-md p-4">
              <div className="flex items-start">
                <div className="bg-primary-100 text-primary-800 rounded-full p-2 mr-3">
                  <Calendar size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">ID Card Office Hours</h3>
                  <p className="text-sm text-primary-700 mt-1">Mon-Fri: 9:00 AM - 4:00 PM</p>
                  <p className="text-sm text-primary-700">Location: Student Services Center, Room 101</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Recent Notifications */}
        <motion.div variants={itemVariants} className="card md:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Notifications</h2>
            {/* <Link to="/notifications" className="text-sm text-primary-700 hover:text-primary-800">View all</Link> */}
          </div>
          
          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className={`p-3 rounded-md border-l-4 ${
                notification.type === 'success' ? 'bg-green-50 border-green-500' :
                notification.type === 'error' ? 'bg-red-50 border-red-500' :
                notification.type === 'warning' ? 'bg-amber-50 border-amber-500' :
                'bg-blue-50 border-blue-500'
              }`}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-gray-500">{notification.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
            ))}
          </div>
          
          {recentNotifications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No new notifications</p>
            </div>
          )}
        </motion.div>
      </motion.div>
      
      {/* ID Card Preview (if approved or ready) */}
      {(latestRequest.status.status === 'approved' || latestRequest.status.status === 'ready' || latestRequest.status.status === 'delivered') && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold mb-4">Your ID Card Preview</h2>
          
          <div className="bg-white shadow-card rounded-lg p-4">
            <div className="aspect-[1.586/1] max-w-md mx-auto bg-gradient-to-r from-primary-800 to-primary-900 rounded-lg overflow-hidden shadow-lg relative">
              <div className="absolute top-0 left-0 w-full p-4">
                <div className="flex items-center">
                  <School className="text-white" size={32} />
                  <div className="ml-2">
                    <h3 className="text-white font-bold text-lg">University Name</h3>
                    <p className="text-primary-100 text-xs">Student Identification Card</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white/10 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden mr-3">
                    {latestRequest.photoUrl && (
                      <img src={latestRequest.photoUrl} alt="Student" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{user?.name}</h3>
                    <p className="text-primary-100 text-xs">{user?.studentId}</p>
                    <p className="text-primary-100 text-xs">{user?.program}</p>
                    <div className="mt-2 bg-white/20 text-white text-xs px-2 py-1 rounded inline-block">
                      Valid until: {format(new Date().setFullYear(new Date().getFullYear() + 1), 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4">
                <svg className="h-12 w-12 text-white/20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">This is a preview of your ID card. The actual card may vary slightly.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;