import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { School, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get the path they were trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/dashboard';

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="absolute top-0 left-0 m-8">
        <Link to="/" className="flex items-center">
          <School className="text-primary-800" size={32} />
          <span className="ml-2 font-heading font-bold text-xl">Campus ID</span>
        </Link>
      </div>
      
      <motion.div 
        className="max-w-md w-full mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
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
            <div className="mb-6">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                id="email" 
                className={`form-input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="you@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  }
                })}
              />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
              
              <div className="mt-1 text-sm text-gray-500">
                <p>Demo accounts:</p>
                <p>student@example.com / password</p>
                <p>admin@example.com / password</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="form-label">Password</label>
                <Link to="/forgot-password" className="text-sm text-primary-700 hover:text-primary-800">
                  Forgot password?
                </Link>
              </div>
              <input 
                type="password" 
                id="password" 
                className={`form-input ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="•••••••••"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary w-full py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-700 hover:text-primary-800 font-medium">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;