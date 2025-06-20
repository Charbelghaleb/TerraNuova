import React, { useState } from 'react';
import { Check, AlertCircle, ArrowLeft } from 'lucide-react';

interface ContactFormProps {
  onBack: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  projectDescription: string;
  propertyAddress: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: '',
    projectDescription: '',
    propertyAddress: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const serviceOptions = [
    'Chip System',
    'Quartz System',
    'Metallic System',
    'Solid Color Polyurea',
    'Solid Color Epoxy',
    'Polyurea Shop Floor System',
    'Formcove System',
    'Not Sure - Need Consultation'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Service Interest validation
    if (!formData.serviceInterest) {
      newErrors.serviceInterest = 'Please select a service of interest';
    }

    // Project Description validation
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required';
    } else if (formData.projectDescription.trim().length < 10) {
      newErrors.projectDescription = 'Please provide more details (at least 10 characters)';
    }

    // Property Address validation
    if (!formData.propertyAddress.trim()) {
      newErrors.propertyAddress = 'Property address is required';
    } else if (formData.propertyAddress.trim().length < 5) {
      newErrors.propertyAddress = 'Please enter a complete address';
    }

    // reCAPTCHA validation (simulated)
    if (!recaptchaVerified) {
      newErrors.recaptcha = 'Please verify that you are not a robot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Submit to Make.com webhook
      const response = await fetch('https://hook.us2.make.com/5mly6kt37xfjw23rc2lsed1vp6qylusv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          serviceInterest: formData.serviceInterest,
          projectDescription: formData.projectDescription,
          propertyAddress: formData.propertyAddress,
          submittedAt: new Date().toISOString(),
          source: 'Terra Nuova Website'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('There was an error submitting your form. Please try again or call us directly at (718) 200-4133.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecaptchaChange = () => {
    setRecaptchaVerified(true);
    if (errors.recaptcha) {
      setErrors(prev => ({
        ...prev,
        recaptcha: ''
      }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
            <Check className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0066CC] mb-4 md:mb-6">Thank You!</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
            Your request has been submitted successfully. Our team will contact you within 24 hours to discuss your project and schedule a free estimate.
          </p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-[#0066CC] to-purple-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[44px]"
          >
            Return to Home
          </button>
          
          {/* Logo at bottom */}
          <div className="flex justify-center mt-12 md:mt-16">
            <div className="w-24 h-24 md:w-32 md:h-32">
              <img 
                src="/images/logo/terra-nuova-logo.png" 
                alt="TERRA NUOVA Logo"
                className="w-full h-full object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 backdrop-blur-md bg-white/90 border-b border-gray-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/images/logo/terra-nuova-logo.png" 
              alt="TERRA NUOVA Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-xl md:text-2xl font-bold text-[#0066CC] tracking-wider">TERRA NUOVA</h1>
          </button>
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#0066CC] transition-colors min-h-[44px] px-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </nav>

      {/* Contact Form Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0066CC] mb-4 md:mb-6">Get Your Free Estimate</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your space? Fill out the form below and our team will contact you within 24 hours to discuss your project and provide a free, no-obligation estimate.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-base font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-colors text-base min-h-[44px] ${
                    errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#0066CC]'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email and Phone Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-colors text-base min-h-[44px] ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#0066CC]'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-base font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-colors text-base min-h-[44px] ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#0066CC]'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Service Interest */}
              <div>
                <label htmlFor="serviceInterest" className="block text-base font-semibold text-gray-700 mb-2">
                  Service of Interest *
                </label>
                <select
                  id="serviceInterest"
                  name="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-colors text-base min-h-[44px] ${
                    errors.serviceInterest ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#0066CC]'
                  }`}
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.serviceInterest && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.serviceInterest}
                  </p>
                )}
              </div>

              {/* Property Address */}
              <div>
                <label htmlFor="propertyAddress" className="block text-base font-semibold text-gray-700 mb-2">
                  Property Address *
                </label>
                <input
                  type="text"
                  id="propertyAddress"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-colors text-base min-h-[44px] ${
                    errors.propertyAddress ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#0066CC]'
                  }`}
                  placeholder="123 Main Street, City, State, ZIP"
                />
                {errors.propertyAddress && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.propertyAddress}
                  </p>
                )}
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="projectDescription" className="block text-base font-semibold text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-colors resize-none text-base ${
                    errors.projectDescription ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#0066CC]'
                  }`}
                  placeholder="Please describe your project, including the size of the area, current condition of the floor, and any specific requirements or preferences..."
                />
                {errors.projectDescription && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.projectDescription}
                  </p>
                )}
              </div>

              {/* reCAPTCHA Simulation */}
              <div>
                <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <input
                    type="checkbox"
                    id="recaptcha"
                    checked={recaptchaVerified}
                    onChange={handleRecaptchaChange}
                    className="w-5 h-5 text-[#0066CC] border-gray-300 rounded focus:ring-[#0066CC]"
                  />
                  <label htmlFor="recaptcha" className="text-base text-gray-700">
                    I'm not a robot
                  </label>
                  <div className="ml-auto text-xs text-gray-500">reCAPTCHA</div>
                </div>
                {errors.recaptcha && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.recaptcha}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 md:py-4 px-6 md:px-8 rounded-lg font-bold text-base md:text-lg transition-all duration-300 min-h-[44px] ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#0066CC] to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-2xl'
                  } text-white`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>

              {/* Submit Error */}
              {submitError && (
                <p className="text-sm text-red-600 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {submitError}
                </p>
              )}
            </form>
          </div>

          {/* Privacy Policy */}
          <div className="mt-6 md:mt-8 text-center text-sm text-gray-600">
            <p className="leading-relaxed">
              By submitting this form, you agree to our{' '}
              <a href="#" className="text-[#0066CC] hover:underline">Privacy Policy</a>{' '}
              and consent to being contacted by TERRA NUOVA regarding your flooring project. 
              We respect your privacy and will never share your information with third parties.
            </p>
          </div>

          {/* Logo at bottom */}
          <div className="flex justify-center mt-12 md:mt-16">
            <div className="w-32 h-32 md:w-40 md:h-40">
              <img 
                src="/images/logo/terra-nuova-logo.png" 
                alt="TERRA NUOVA Logo"
                className="w-full h-full object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;