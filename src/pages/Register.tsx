import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { School, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

interface RegisterFormData {
  name: string;
  email: string;
  studentId: string;
  department: string;
  program: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register: registerField, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await register({
        name: data.name,
        email: data.email,
        studentId: data.studentId,
        department: data.department,
        program: data.program,
        password: data.password,
      });
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
      <div className="absolute top-0 left-0 m-8">
        <Link to="/" className="flex items-center">
          <School className="text-primary-800" size={32} />
          <span className="ml-2 font-heading font-bold text-xl">Campus ID</span>
        </Link>
      </div>
      
      <motion.div 
        className="max-w-md w-full mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Link to="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800">
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create an account</h1>
          <p className="text-gray-600">Get started with your student ID card</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-center">
                <AlertCircle size={20} className="text-red-500 mr-2" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className={`form-input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="John Doe"
                {...registerField('name', { required: 'Full name is required' })}
              />
              {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                id="email" 
                className={`form-input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="you@example.com"
                {...registerField('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  }
                })}
              />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="studentId" className="form-label">Student ID (if existing)</label>
              <input 
                type="text" 
                id="studentId" 
                className="form-input"
                placeholder="e.g., ST-12345"
                {...registerField('studentId')}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="department" className="form-label">Department</label>
                <select 
                  id="department" 
                  className="form-input"
                  {...registerField('department', { required: 'Department is required' })}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Arts and Humanities">Arts and Humanities</option>
                  <option value="Medicine">Medicine</option>
                </select>
                {errors.department && <p className="form-error">{errors.department.message}</p>}
              </div>
              
              <div>
                <label htmlFor="program" className="form-label">Program</label>
                <select 
                  id="program" 
                  className="form-input"
                  {...registerField('program', { required: 'Program is required' })}
                >
                  <option value="">Select Program</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="Doctorate">Doctorate</option>
                  <option value="Certificate">Certificate</option>
                </select>
                {errors.program && <p className="form-error">{errors.program.message}</p>}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                id="password" 
                className={`form-input ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="•••••••••"
                {...registerField('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  }
                })}
              />
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                className={`form-input ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="•••••••••"
                {...registerField('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'The passwords do not match'
                })}
              />
              {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary w-full py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-700 hover:text-primary-800 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;