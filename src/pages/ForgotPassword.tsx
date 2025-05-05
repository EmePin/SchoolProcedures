import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      setMessage('Si existe una cuenta con ese correo, se ha enviado un enlace de recuperación.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
      <motion.div 
        className="max-w-md w-full mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Link to="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800">
            <ArrowLeft size={16} className="mr-1" />
            Volver al inicio de sesión
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">¿Olvidaste tu contraseña?</h1>
          <p className="text-gray-600">Ingresa tu correo y te enviaremos un enlace para restablecerla.</p>
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

          {message && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-center">
                <Mail size={20} className="text-green-500 mr-2" />
                <p className="text-sm text-green-700">{message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              {isLoading ? 'Enviando...' : 'Enviar instrucciones'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
