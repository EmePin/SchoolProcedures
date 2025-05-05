export interface IDRequestStatus {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'ready' | 'delivered';
  statusText: string;
  color: string;
}

export interface IDRequest {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  program: string;
  requestDate: string;
  status: IDRequestStatus;
  photoUrl?: string;
  comments?: string;
  paymentStatus?: 'pending' | 'paid';
  updatedAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  program: string;
  enrollmentDate: string;
  idCardStatus?: IDRequestStatus;
}

export interface NotificationType {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface RequestFormData {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  program: string;
  issueType: 'new' | 'replacement';
  reason?: string;
  deliveryMethod: 'pickup' | 'mail';
  address?: string;
  consentToTerms: boolean;
}