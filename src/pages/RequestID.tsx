import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  Info, 
  HelpCircle, 
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { RequestFormData } from '../types';

const steps = [
  { id: 1, name: 'Personal Information' },
  { id: 2, name: 'Photo Upload' },
  { id: 3, name: 'Review & Submit' },
  { id: 4, name: 'Payment' },
];

const RequestID = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RequestFormData>({
    defaultValues: {
      studentId: user?.studentId || '',
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      department: user?.department || '',
      program: user?.program || '',
      issueType: 'new',
      deliveryMethod: 'pickup',
      consentToTerms: false,
    }
  });
  
  const watchIssueType = watch('issueType');
  const watchDeliveryMethod = watch('deliveryMethod');
  const watchAllFields = watch();
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For demo purposes, we're using a placeholder image instead of actual file upload
      const placeholderImage = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      setPhotoUrl(placeholderImage);
    }
  };
  
  const onSubmit = (data: RequestFormData) => {
    // In a real application, this would submit the form data to a server
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to a success page or back to dashboard
      navigate('/track-request/REQ-2023-0006');
    }, 1500);
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Request ID Card</h1>
        <p className="text-gray-600 mt-1">Complete the form below to request your student ID card</p>
      </div>
      
      {/* Step Progress */}
      <div className="mb-8">
        <div className="hidden sm:block">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {steps.map((step, stepIdx) => (
                <li key={step.id} className={`relative ${stepIdx !== steps.length - 1 ? 'flex-1' : ''}`}>
                  {currentStep > step.id ? (
                    <div className="group">
                      <span className="flex items-center">
                        <span className="flex h-9 items-center">
                          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white">
                            <CheckCircle size={18} />
                          </span>
                        </span>
                        {stepIdx !== steps.length - 1 && (
                          <span className="absolute top-4 w-full bg-primary-600 h-0.5" />
                        )}
                      </span>
                      <span className="mt-2 block text-sm font-medium">{step.name}</span>
                    </div>
                  ) : currentStep === step.id ? (
                    <div className="group" aria-current="step">
                      <span className="flex items-center">
                        <span className="flex h-9 items-center">
                          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-600 bg-white">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                          </span>
                        </span>
                        {stepIdx !== steps.length - 1 && (
                          <span className="absolute top-4 w-full bg-gray-200 h-0.5" />
                        )}
                      </span>
                      <span className="mt-2 block text-sm font-medium text-primary-700">{step.name}</span>
                    </div>
                  ) : (
                    <div className="group">
                      <span className="flex items-center">
                        <span className="flex h-9 items-center">
                          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                            <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                          </span>
                        </span>
                        {stepIdx !== steps.length - 1 && (
                          <span className="absolute top-4 w-full bg-gray-200 h-0.5" />
                        )}
                      </span>
                      <span className="mt-2 block text-sm font-medium text-gray-500">{step.name}</span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
        
        <div className="sm:hidden">
          <p className="text-sm font-medium text-primary-700">
            Step {currentStep} of {steps.length} - {steps[currentStep - 1].name}
          </p>
          <div className="mt-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-primary-600 rounded-full"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Form */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white rounded-lg shadow-card p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-lg font-bold mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="studentId" className="form-label">Student ID</label>
                  <input 
                    type="text" 
                    id="studentId" 
                    className="form-input bg-gray-50" 
                    readOnly
                    {...register('studentId')}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      }
                    })}
                  />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="department" className="form-label">Department</label>
                    <select 
                      id="department" 
                      className={`form-input ${errors.department ? 'border-red-500' : ''}`}
                      {...register('department', { required: 'Department is required' })}
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
                      className={`form-input ${errors.program ? 'border-red-500' : ''}`}
                      {...register('program', { required: 'Program is required' })}
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
                  <label className="form-label">ID Card Type</label>
                  <div className="mt-2 space-y-3">
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        id="new" 
                        value="new" 
                        className="mt-0.5 mr-2"
                        {...register('issueType')}
                      />
                      <div>
                        <label htmlFor="new" className="font-medium text-gray-700">New Card</label>
                        <p className="text-sm text-gray-500">First time requesting an ID card</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        id="replacement" 
                        value="replacement" 
                        className="mt-0.5 mr-2"
                        {...register('issueType')}
                      />
                      <div>
                        <label htmlFor="replacement" className="font-medium text-gray-700">Replacement Card</label>
                        <p className="text-sm text-gray-500">Lost, stolen, or damaged card</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {watchIssueType === 'replacement' && (
                  <div className="mb-4 bg-amber-50 p-4 rounded-md border-l-4 border-amber-500">
                    <label htmlFor="reason" className="form-label">Reason for Replacement</label>
                    <select 
                      id="reason" 
                      className={`form-input ${errors.reason ? 'border-red-500' : ''}`}
                      {...register('reason', { required: watchIssueType === 'replacement' ? 'Reason is required' : false })}
                    >
                      <option value="">Select Reason</option>
                      <option value="lost">Lost</option>
                      <option value="stolen">Stolen</option>
                      <option value="damaged">Damaged</option>
                      <option value="name_change">Name Change</option>
                      <option value="expired">Expired</option>
                    </select>
                    {errors.reason && <p className="form-error">{errors.reason.message}</p>}
                    <p className="text-sm text-amber-600 mt-2">
                      <Info size={14} className="inline mr-1" />
                      A replacement fee of $20 will be charged for lost, stolen, or damaged cards.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Step 2: Photo Upload */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-lg font-bold mb-4">Photo Upload</h2>
                
                <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500 mb-6">
                  <h3 className="font-medium text-blue-800 flex items-center">
                    <Info size={18} className="mr-1" />
                    Photo Requirements
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-blue-700">
                    <li>• Passport-style photo with white background</li>
                    <li>• Taken within the last 6 months</li>
                    <li>• No hats, sunglasses, or headphones</li>
                    <li>• Neutral facial expression or natural smile</li>
                    <li>• Face should take up 70-80% of the frame</li>
                    <li>• File format: JPEG or PNG, max 5MB</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <div className="flex flex-col items-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    {photoUrl ? (
                      <div className="text-center">
                        <div className="relative mb-4">
                          <img 
                            src={photoUrl} 
                            alt="Uploaded photo" 
                            className="w-40 h-40 object-cover rounded-md mx-auto"
                          />
                          <button 
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            onClick={() => setPhotoUrl(null)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                        <p className="text-green-600 font-medium flex items-center justify-center">
                          <CheckCircle size={16} className="mr-1" />
                          Photo uploaded successfully
                        </p>
                        <button 
                          type="button"
                          className="mt-4 text-primary-700 hover:text-primary-800 text-sm font-medium"
                          onClick={() => setPhotoUrl(null)}
                        >
                          Upload a different photo
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-3">
                          <Camera size={48} className="text-gray-400" />
                        </div>
                        <p className="mb-3 text-gray-700 font-medium">Drag and drop your photo here</p>
                        <p className="mb-4 text-gray-500 text-sm">or</p>
                        <label className="btn btn-primary flex items-center cursor-pointer">
                          <Upload size={16} className="mr-1" />
                          Browse Files
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="form-label">Delivery Method</label>
                  <div className="mt-2 space-y-3">
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        id="pickup" 
                        value="pickup" 
                        className="mt-0.5 mr-2"
                        {...register('deliveryMethod')}
                      />
                      <div>
                        <label htmlFor="pickup" className="font-medium text-gray-700">Pickup</label>
                        <p className="text-sm text-gray-500">Pick up your ID card at the Student Services Center</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        id="mail" 
                        value="mail" 
                        className="mt-0.5 mr-2"
                        {...register('deliveryMethod')}
                      />
                      <div>
                        <label htmlFor="mail" className="font-medium text-gray-700">Mail</label>
                        <p className="text-sm text-gray-500">Have your ID card mailed to your address (additional fee applies)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {watchDeliveryMethod === 'mail' && (
                  <div className="mb-4">
                    <label htmlFor="address" className="form-label">Mailing Address</label>
                    <textarea 
                      id="address" 
                      className={`form-input ${errors.address ? 'border-red-500' : ''}`}
                      rows={3}
                      placeholder="Enter your complete mailing address"
                      {...register('address', { required: watchDeliveryMethod === 'mail' ? 'Address is required' : false })}
                    ></textarea>
                    {errors.address && <p className="form-error">{errors.address.message}</p>}
                    <p className="text-sm text-gray-500 mt-1">
                      A shipping fee of $5 will be added to your total.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-lg font-bold mb-4">Review Your Information</h2>
                
                <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium">Personal Information</h3>
                  </div>
                  <div className="p-4 space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Name:</p>
                      <p className="font-medium">{watchAllFields.firstName} {watchAllFields.lastName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Student ID:</p>
                      <p className="font-medium">{watchAllFields.studentId}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Email:</p>
                      <p className="font-medium">{watchAllFields.email}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Department:</p>
                      <p className="font-medium">{watchAllFields.department}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Program:</p>
                      <p className="font-medium">{watchAllFields.program}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium">Request Details</h3>
                  </div>
                  <div className="p-4 space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">ID Card Type:</p>
                      <p className="font-medium capitalize">{watchAllFields.issueType}</p>
                    </div>
                    {watchAllFields.issueType === 'replacement' && (
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-gray-500">Reason:</p>
                        <p className="font-medium capitalize">{watchAllFields.reason?.replace('_', ' ')}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Delivery Method:</p>
                      <p className="font-medium capitalize">{watchAllFields.deliveryMethod}</p>
                    </div>
                    {watchAllFields.deliveryMethod === 'mail' && (
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-gray-500">Mailing Address:</p>
                        <p className="font-medium">{watchAllFields.address}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium">Photo</h3>
                  </div>
                  <div className="p-4 flex justify-center">
                    {photoUrl ? (
                      <img 
                        src={photoUrl} 
                        alt="ID Photo" 
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    ) : (
                      <p className="text-red-500 py-4">No photo uploaded yet. Please go back and upload a photo.</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      id="consentToTerms" 
                      className="mt-1 mr-2"
                      {...register('consentToTerms', { 
                        required: 'You must agree to the terms and conditions'
                      })}
                    />
                    <div>
                      <label htmlFor="consentToTerms" className="font-medium text-gray-700">Terms and Conditions</label>
                      <p className="text-sm text-gray-500 mt-1">
                        I confirm that the information provided is accurate and consent to the processing of my personal data for the purpose of issuing a student ID card. I have read and agree to the <Link to="/terms" className="text-primary-700 hover:text-primary-800">terms and conditions</Link>.
                      </p>
                      {errors.consentToTerms && <p className="form-error">{errors.consentToTerms.message}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-blue-50 p-4 rounded-md flex items-start">
                  <HelpCircle size={18} className="text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-700">
                      After submitting your request, you will be directed to the payment page where you can complete the process. The standard fee for a student ID card is $15. Additional fees may apply for replacement cards or mail delivery.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-lg font-bold mb-4">Payment</h2>
                
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-3">Order Summary</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>ID Card Fee (Standard)</span>
                      <span className="font-medium">$15.00</span>
                    </div>
                    
                    {watchAllFields.issueType === 'replacement' && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Replacement Fee</span>
                        <span className="font-medium">$20.00</span>
                      </div>
                    )}
                    
                    {watchAllFields.deliveryMethod === 'mail' && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Shipping Fee</span>
                        <span className="font-medium">$5.00</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-2 font-medium">
                      <span>Total</span>
                      <span className="text-lg">
                        ${15 + 
                          (watchAllFields.issueType === 'replacement' ? 20 : 0) + 
                          (watchAllFields.deliveryMethod === 'mail' ? 5 : 0)
                        }.00
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                    <select 
                      id="paymentMethod" 
                      className="form-input"
                    >
                      <option value="">Select Payment Method</option>
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                      <option value="student">Charge to Student Account</option>
                    </select>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-md border-l-4 border-yellow-400">
                    <p className="text-sm text-yellow-700">
                      <Info size={14} className="inline mr-1" />
                      For demo purposes, no actual payment will be processed. Click "Complete Payment" to simulate a successful payment.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button 
                  type="button"
                  onClick={prevStep}
                  className="btn btn-outline"
                >
                  Back
                </button>
              ) : (
                <Link to="/dashboard" className="btn btn-outline">Cancel</Link>
              )}
              
              {currentStep < steps.length ? (
                <button 
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                  disabled={currentStep === 2 && !photoUrl}
                >
                  Continue
                  <ChevronRight size={16} className="ml-1" />
                </button>
              ) : (
                <button 
                  type="submit"
                  className={`btn btn-primary flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Payment
                      <ChevronRight size={16} className="ml-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RequestID;