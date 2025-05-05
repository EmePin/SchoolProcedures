import { IDRequest, Student, NotificationType } from '../types';
import { format, subDays } from 'date-fns';

// Helper function to generate past dates
const getPastDate = (days: number): string => {
  return format(subDays(new Date(), days), 'yyyy-MM-dd');
};

// ID Request Status Types
export const requestStatuses = {
  pending: { 
    id: 'pending', 
    status: 'pending', 
    statusText: 'Pending', 
    color: 'text-amber-500',
  },
  approved: { 
    id: 'approved', 
    status: 'approved', 
    statusText: 'Approved', 
    color: 'text-green-500',
  },
  rejected: { 
    id: 'rejected', 
    status: 'rejected', 
    statusText: 'Rejected', 
    color: 'text-red-500',
  },
  processing: { 
    id: 'processing', 
    status: 'processing', 
    statusText: 'Processing', 
    color: 'text-blue-500',
  },
  ready: { 
    id: 'ready', 
    status: 'ready', 
    statusText: 'Ready for Pickup', 
    color: 'text-teal-500',
  },
  delivered: { 
    id: 'delivered', 
    status: 'delivered', 
    statusText: 'Delivered', 
    color: 'text-gray-500',
  },
};

// Mock ID Requests
export const mockRequests: IDRequest[] = [
  {
    id: 'REQ-2023-0001',
    studentId: 'STU-2023-1234',
    studentName: 'John Smith',
    department: 'Computer Science',
    program: 'BSc Computer Science',
    requestDate: getPastDate(2),
    status: requestStatuses.approved,
    photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    paymentStatus: 'paid',
    updatedAt: getPastDate(1),
  },
  {
    id: 'REQ-2023-0002',
    studentId: 'STU-2023-2345',
    studentName: 'Sarah Johnson',
    department: 'Business Administration',
    program: 'MBA',
    requestDate: getPastDate(3),
    status: requestStatuses.pending,
    paymentStatus: 'pending',
    updatedAt: getPastDate(3),
  },
  {
    id: 'REQ-2023-0003',
    studentId: 'STU-2023-3456',
    studentName: 'Michael Brown',
    department: 'Engineering',
    program: 'MSc Electrical Engineering',
    requestDate: getPastDate(5),
    status: requestStatuses.processing,
    photoUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    paymentStatus: 'paid',
    updatedAt: getPastDate(2),
  },
  {
    id: 'REQ-2023-0004',
    studentId: 'STU-2023-4567',
    studentName: 'Emily Davis',
    department: 'Arts and Humanities',
    program: 'BA Fine Arts',
    requestDate: getPastDate(7),
    status: requestStatuses.rejected,
    comments: 'Photo does not meet requirements. Please upload a new photo with a white background.',
    paymentStatus: 'paid',
    updatedAt: getPastDate(6),
  },
  {
    id: 'REQ-2023-0005',
    studentId: 'STU-2023-5678',
    studentName: 'David Wilson',
    department: 'Medicine',
    program: 'MD',
    requestDate: getPastDate(10),
    status: requestStatuses.ready,
    photoUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    paymentStatus: 'paid',
    updatedAt: getPastDate(3),
  },
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    studentId: 'STU-2023-1234',
    department: 'Computer Science',
    program: 'BSc Computer Science',
    enrollmentDate: getPastDate(100),
    idCardStatus: requestStatuses.approved,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    studentId: 'STU-2023-2345',
    department: 'Business Administration',
    program: 'MBA',
    enrollmentDate: getPastDate(90),
    idCardStatus: requestStatuses.pending,
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    studentId: 'STU-2023-3456',
    department: 'Engineering',
    program: 'MSc Electrical Engineering',
    enrollmentDate: getPastDate(120),
    idCardStatus: requestStatuses.processing,
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    studentId: 'STU-2023-4567',
    department: 'Arts and Humanities',
    program: 'BA Fine Arts',
    enrollmentDate: getPastDate(80),
    idCardStatus: requestStatuses.rejected,
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    studentId: 'STU-2023-5678',
    department: 'Medicine',
    program: 'MD',
    enrollmentDate: getPastDate(150),
    idCardStatus: requestStatuses.ready,
  },
];

// Mock Notifications
export const mockNotifications: NotificationType[] = [
  {
    id: '1',
    title: 'ID Card Approved',
    message: 'Your ID card request has been approved. It is now being processed.',
    date: getPastDate(1),
    read: false,
    type: 'success',
  },
  {
    id: '2',
    title: 'Photo Rejected',
    message: 'Your photo was rejected. Please upload a new photo that meets the requirements.',
    date: getPastDate(3),
    read: true,
    type: 'error',
  },
  {
    id: '3',
    title: 'ID Card Ready',
    message: 'Your ID card is ready for pickup at the Student Services Center.',
    date: getPastDate(5),
    read: false,
    type: 'info',
  },
  {
    id: '4',
    title: 'Payment Required',
    message: 'Please complete the payment for your ID card request.',
    date: getPastDate(7),
    read: true,
    type: 'warning',
  },
];

// Mock statistics for dashboard
export const mockStats = {
  total: 120,
  pending: 45,
  approved: 35,
  processing: 25,
  ready: 10,
  rejected: 5,
  weeklyData: [12, 19, 15, 7, 9, 3, 5],
  monthlyData: [65, 85, 90, 81, 67, 72, 92, 98, 110, 120, 105, 98],
};