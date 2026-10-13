import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateCompanyData, updateCompanyWithImage, getCompanyBySlug } from '@/services/userApi';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { 
  FaBuilding, 
  FaProjectDiagram, 
  FaCogs, 
  FaIndustry, 
  FaUsers, 
  FaShareAlt, 
  FaMapMarkerAlt, 
  FaImages,
  FaCheck,
  FaCircle,
  FaAdjust,
  FaInfoCircle,
  FaSave,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import ServiceLines from './ServiceLines';
import FocusLines from './FocusLines';
import Industries from './Industries';
import Clients from './Clients';

export default function CompanyEditForm({ slug, onBack }) {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('company-info');
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    website: '',
    linkedinUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    companyCountry: '',
    foundedYear: '',
    employees: '',
    minimumProjectSize: '',
    hourlyRate: '',
    services: [],
    focus: [],
    industries: [],
    clients: [],
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Define sections with their completion status
  const sections = [
    {
      id: 'company-info',
      name: 'Company Information',
      icon: FaBuilding,
      fields: ['companyName', 'description', 'minimumProjectSize', 'hourlyRate', 'foundedYear', 'employees', 'image']
    },
    {
      id: 'services',
      name: 'Services',
      icon: FaCogs,
      fields: ['services']
    },
    {
      id: 'focus',
      name: 'Focus Areas',
      icon: FaProjectDiagram,
      fields: ['focus']
    },
    {
      id: 'industries',
      name: 'Industries',
      icon: FaIndustry,
      fields: ['industries']
    },
    {
      id: 'clients',
      name: 'Clients',
      icon: FaUsers,
      fields: ['clients']
    },
    {
      id: 'contact-location',
      name: 'Contact & Location',
      icon: FaShareAlt,
      fields: ['website', 'linkedinUrl', 'facebookUrl', 'twitterUrl', 'companyCountry']
    }
  ];



  // Generate years for dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  // Check section completion status
  const getSectionStatus = (section) => {
    const requiredFields = section.fields;
    const filledFields = requiredFields.filter(field => {
      const value = formData[field];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value && value.toString().trim() !== '';
    });

    if (filledFields.length === 0) return 'not-started';
    if (filledFields.length === requiredFields.length) return 'completed';
    return 'in-progress';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="text-green-500" />;
      case 'in-progress':
        return <FaAdjust className="text-yellow-500" />;
      default:
        return <FaCircle className="text-gray-300" />;
    }
  };

  // Navigation functions
  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === activeSection);
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const goToPrevSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const isFirstSection = () => getCurrentSectionIndex() === 0;
  const isLastSection = () => getCurrentSectionIndex() === sections.length - 1;

  // Save progress without moving to next section
  const handleSaveProgress = async () => {
    setIsSubmitting(true);
    try {
      let result;
      
      if (imageFile) {
        // Use FormData when there's an image
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (key !== 'image') {
            if (key === 'services' || key === 'focus' || key === 'industries' || key === 'clients') {
              formDataToSend.append(key, JSON.stringify(formData[key]));
            } else {
              formDataToSend.append(key, formData[key]);
            }
          }
        });
        formDataToSend.append('image', imageFile);
        result = await updateCompanyWithImage(slug, formDataToSend);
      } else {
        // Use JSON when there's no image
        result = await updateCompanyData(slug, formData);
      }
      
      if (result.ok) {
        toast.success('Progress saved successfully!');
      } else {
        toast.error(result.message || 'Failed to save progress');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the active section content
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'company-info':
        return renderCompanyInfo();
      case 'services':
        return renderServices();
      case 'focus':
        return renderFocus();
      case 'industries':
        return renderIndustries();
      case 'clients':
        return renderClients();
      case 'contact-location':
        return renderContactLocation();
      default:
        return renderCompanyInfo();
    }
  };

  // Section render functions
  const renderCompanyInfo = () => (
    <div>
      {/* Basic Company Information */}
      <div className="bg-white   p-8 border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#4897de]/10 rounded-lg">
            <FaBuilding className="text-[#4897de] text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Basic Information</h3>
            <p className="text-gray-500 text-sm">Tell us about your company</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-800 mb-3">
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter your company name"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-[#4897de]/20 focus:border-[#4897de] transition-all duration-200 text-gray-800 placeholder-gray-400 text-base"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-3">
              Company Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your company, what you do, and what makes you unique..."
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-[#4897de]/20 focus:border-[#4897de] transition-all duration-200 text-gray-800 placeholder-gray-400 text-base resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">Describe your business in a few sentences</span>
              <span className="text-xs font-medium text-gray-600">
                {formData.description.length}/500
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Details */}
      <div className="bg-white  p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#4897de]/10 rounded-lg">
            <FaProjectDiagram className="text-[#4897de] text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Business Details</h3>
            <p className="text-gray-500 text-sm">Project pricing and company info</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="minimumProjectSize" className="block text-sm font-semibold text-gray-800 mb-3">
              Minimum Project Budget
            </label>
            <select
              id="minimumProjectSize"
              name="minimumProjectSize"
              value={formData.minimumProjectSize}
              onChange={handleChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-[#4897de]/20 focus:border-[#4897de] bg-white transition-all duration-200 text-gray-800 text-base"
            >
              <option value="" className="text-gray-400">Select budget range</option>
              <option value="$1k - $5k">$1,000 - $5,000</option>
              <option value="$5k - $10k">$5,000 - $10,000</option>
              <option value="$10k - $25k">$10,000 - $25,000</option>
              <option value="$25k - $50k">$25,000 - $50,000</option>
              <option value="$50k - $100k">$50,000 - $100,000</option>
              <option value="$100k+">$100,000+</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="hourlyRate" className="block text-sm font-semibold text-gray-800 mb-3">
              Hourly Rate Range
            </label>
            <select
              id="hourlyRate"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-[#4897de]/20 focus:border-[#4897de] bg-white transition-all duration-200 text-gray-800 text-base"
            >
              <option value="" className="text-gray-400">Select hourly rate</option>
              <option value="$25 - $49">$25 - $49 per hour</option>
              <option value="$50 - $99">$50 - $99 per hour</option>
              <option value="$100 - $149">$100 - $149 per hour</option>
              <option value="$150 - $199">$150 - $199 per hour</option>
              <option value="$200+">$200+ per hour</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="foundedYear" className="block text-sm font-semibold text-gray-800 mb-3">
              Year Founded
            </label>
            <select
              id="foundedYear"
              name="foundedYear"
              value={formData.foundedYear}
              onChange={handleChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-[#4897de]/20 focus:border-[#4897de] bg-white transition-all duration-200 text-gray-800 text-base"
            >
              <option value="" className="text-gray-400">Select year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="employees" className="block text-sm font-semibold text-gray-800 mb-3">
              Team Size
            </label>
            <select
              id="employees"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-[#4897de]/20 focus:border-[#4897de] bg-white transition-all duration-200 text-gray-800 text-base"
            >
              <option value="" className="text-gray-400">Select team size</option>
              <option value="Freelancer">Just me (Freelancer)</option>
              <option value="2-10">2-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>
        </div>
      </div>

      {/* Company Logo */}
      <div className="bg-white p-8 border border-gray-100 ">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#4897de]/10 rounded-lg">
            <FaImages className="text-[#4897de] text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Company Logo</h3>
            <p className="text-gray-500 text-sm">Upload your company logo or brand image</p>
          </div>
        </div>
        
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-gray-50/50 hover:bg-gray-50 transition-colors">
          {imagePreview ? (
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <Image 
                  src={imagePreview} 
                  alt="Company Logo Preview" 
                  width={120}
                  height={120}
                  className="max-w-[120px] max-h-[120px] object-contain rounded-2xl shadow-lg bg-white p-2"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <p className="text-sm font-medium text-gray-700">Logo uploaded successfully!</p>
              <p className="text-xs text-gray-500 mt-1">Click the × button to change it</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#4897de]/10 rounded-2xl flex items-center justify-center mb-4">
                <FaImages className="text-[#4897de] text-2xl" />
              </div>
              <div className="mb-4">
                <label className="bg-[#265ba3] hover:bg-[#01357a] text-white px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 inline-flex items-center gap-2 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600 mb-1">Choose your company logo</p>
              <p className="text-xs text-gray-400">Recommended: 400×400px, PNG or JPG format</p>
            </div>
          )}
        </div>
        
        {imageFile && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheck className="text-green-600 text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-800">{imageFile.name}</p>
                <p className="text-xs text-green-600">Size: {Math.round(imageFile.size / 1024)} KB</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );



  const renderServices = () => (
    <div className="bg-white  p-6">
      <ServiceLines 
        services={formData.services || []}
        onServicesChange={handleServicesChange}
      />
    </div>
  );

  const renderFocus = () => (
    <div className="bg-white  p-6">
      <FocusLines 
        focus={formData.focus || []}
        onFocusChange={handleFocusChange}
      />
    </div>
  );

  const renderIndustries = () => (
    <div className="bg-white  p-6">
      <Industries 
        industries={formData.industries || []}
        onIndustriesChange={handleIndustriesChange}
      />
    </div>
  );

  const renderClients = () => (
    <div className="bg-white p-6">
      <Clients 
        clients={formData.clients || []}
        onClientsChange={handleClientsChange}
      />
    </div>
  );

  const renderContactLocation = () => (
    <div >
      {/* Social Media & Website */}
      <div className="bg-white  p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaShareAlt className="text-[#4897de]" />
          Website & Social Media
        </h3>
        <div>
          <label htmlFor="website" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Company Website
            <FaInfoCircle className="text-gray-400 cursor-help" title="Your company's main website URL" />
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourcompany.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-[#4897de] transition-colors"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="linkedinUrl" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              LinkedIn URL
              <FaInfoCircle className="text-gray-400 cursor-help" title="Your company's LinkedIn page" />
            </label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-[#4897de] transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="facebookUrl" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Facebook URL
              <FaInfoCircle className="text-gray-400 cursor-help" title="Your company's Facebook page" />
            </label>
            <input
              type="url"
              id="facebookUrl"
              name="facebookUrl"
              value={formData.facebookUrl}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-[#4897de] transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="twitterUrl" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Twitter URL
              <FaInfoCircle className="text-gray-400 cursor-help" title="Your company's Twitter profile" />
            </label>
            <input
              type="url"
              id="twitterUrl"
              name="twitterUrl"
              value={formData.twitterUrl}
              onChange={handleChange}
              placeholder="https://twitter.com/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-[#4897de] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white  p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-[#4897de]" />
          Company Location
        </h3>
        <div>
          <label htmlFor="companyCountry" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Location
            <FaInfoCircle className="text-gray-400 cursor-help" title="Enter your company's location (city, country, etc.)" />
          </label>
          <input
            type="text"
            id="companyCountry"
            name="companyCountry"
            value={formData.companyCountry}
            onChange={handleChange}
            placeholder="Enter your location (e.g., New York, USA or London, UK)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#265ba3] focus:border-[#4897de] transition-colors"
          />
        </div>
      </div>
    </div>
  );

  // Transform industries data to handle both old (string array) and new (object array) formats
  const transformIndustriesData = (industries) => {
    if (!industries || !Array.isArray(industries)) return [];
    
    return industries.map(industry => {
      // If it's already in the correct format (object with industryName and percentage)
      if (typeof industry === 'object' && industry.industryName && industry.percentage) {
        return industry;
      }
      
      // If it's a string (old format), convert to new format with default percentage
      if (typeof industry === 'string') {
        return {
          industryName: industry,
          percentage: 10 // Default percentage for old data
        };
      }
      
      // Fallback for any other format
      return {
        industryName: String(industry),
        percentage: 10
      };
    });
  };

  // Function to get the full image URL
  const getImageUrl = (imagePath) => {
    // If it's already a full URL, return as is
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's a relative path, prepend the API base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://demand10.com/api/v1';
    // Remove /api/v1 prefix if it exists in the imagePath since uploads are served directly
    const cleanPath = imagePath.startsWith('/api/v1') ? imagePath.substring(7) : imagePath;
    // For uploads, we need to remove the /api/v1 part from the base URL
    const uploadBaseUrl = baseUrl.replace('/api/v1', '');
    return `${uploadBaseUrl}${cleanPath}`;
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await getCompanyBySlug(slug);
        
        if (companyData.ok) {
          const company = companyData.data;
          setCompany(company);
          setFormData({
            companyName: company.companyName || '',
            description: company.description || '',
            website: company.website || '',
            linkedinUrl: company.linkedinUrl || '',
            facebookUrl: company.facebookUrl || '',
            twitterUrl: company.twitterUrl || '',
            companyCountry: company.companyCountry || '',
            foundedYear: company.foundedYear || '',
            employees: company.employees || '',
            minimumProjectSize: company.minimumProjectSize || '',
            hourlyRate: company.hourlyRate || '',
            services: Array.isArray(company.services) ? company.services : [],
            focus: Array.isArray(company.focus) ? company.focus : [],
            industries: transformIndustriesData(company.industries),
            clients: Array.isArray(company.clients) ? company.clients : [],
            image: company.image || ''
          });
          
          // Set image preview with full URL
          const imageUrl = getImageUrl(company.image);
          setImagePreview(imageUrl || '');
        }
      } catch (err) {
        console.error('Error fetching company:', err);
        setError('Failed to load company data');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCompany();
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler functions for chart components with defensive programming
  const handleServicesChange = (services) => {
    if (typeof services !== 'undefined' && Array.isArray(services)) {
      setFormData(prev => ({
        ...prev,
        services: services
      }));
    }
  };

  const handleFocusChange = (focus) => {
    if (typeof focus !== 'undefined' && Array.isArray(focus)) {
      setFormData(prev => ({
        ...prev,
        focus: focus
      }));
    }
  };

  const handleIndustriesChange = (industries) => {
    if (typeof industries !== 'undefined' && Array.isArray(industries)) {
      setFormData(prev => ({
        ...prev,
        industries: industries
      }));
    }
  };

  const handleClientsChange = (clients) => {
    if (typeof clients !== 'undefined' && Array.isArray(clients)) {
      setFormData(prev => ({
        ...prev,
        clients: clients
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);
    
    try {
      let result;
      
      if (imageFile) {
        // Use FormData when there's an image
        const formDataToSend = new FormData();
        
        // Append all form fields
        Object.keys(formData).forEach(key => {
          if (key !== 'image') {
            if (key === 'services' || key === 'focus' || key === 'industries' || key === 'clients') {
              // Send array fields as JSON string for FormData
              formDataToSend.append(key, JSON.stringify(formData[key]));
            } else {
              formDataToSend.append(key, formData[key]);
            }
          }
        });
        
        formDataToSend.append('image', imageFile);
        result = await updateCompanyWithImage(slug, formDataToSend);
      } else {
        // Use JSON when there's no image
        result = await updateCompanyData(slug, formData);
      }
      
      if (result.ok) {
        toast.success('Company updated successfully!');
        setSuccess(true);
        // Show success message for 2 seconds then go back to list
        setTimeout(() => {
          onBack();
        }, 2000);
      } else {
        toast.error(result.message || 'Failed to update company');
        setError(result.message || 'Failed to update company');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const handleRemoveImage = () => {
    setImagePreview('');
    setImageFile(null);
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="flex h-screen">
          {/* Left Sidebar Skeleton */}
          <div className="bg-white shadow-2xl w-80 flex flex-col border-r border-gray-200">
            {/* Header Skeleton */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#265ba3] to-[#0d5fd4]">
              <div className="animate-pulse">
                <div className="h-6 bg-white bg-opacity-20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-white bg-opacity-15 rounded w-1/2"></div>
              </div>
            </div>

            {/* Navigation Menu Skeleton */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              <nav className="space-y-2">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="w-full flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm animate-pulse">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content Area Skeleton */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header Skeleton */}
            <div className="bg-white p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>

            {/* Form Content Skeleton */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Form Fields Skeleton */}
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-12 bg-gray-100 border border-gray-200 rounded-lg"></div>
                  </div>
                ))}
                
                {/* Image Upload Skeleton */}
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons Skeleton */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
                <div className="h-12 bg-gray-200 rounded-xl w-24 animate-pulse"></div>
                <div className="flex gap-3">
                  <div className="h-12 bg-gray-200 rounded-xl w-32 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded-xl w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-12">
          <p className="text-red-500 font-medium">{error}</p>
          <button 
            onClick={onBack}
            className="mt-4 bg-[#265ba3] hover:bg-[#01357a] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Back to Companies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className={`bg-white shadow-2xl transition-all duration-300 w-80
         flex flex-col border-r border-gray-200`}>
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-[#265ba3] to-[#1a365d]">
            <div className="flex items-center justify-between">
         
                <div>
                  <h1 className="text-xl font-bold text-white">Profile Sections</h1>
                  <p className="text-blue-100 text-sm mt-1">Complete your business profile to attract more clients</p>
                </div>
             
            </div>
            
            
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            <nav className="space-y-2">
              {sections.map((section) => {
                const status = getSectionStatus(section);
                const isActive = activeSection === section.id;
                const Icon = section.icon;

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 shadow-sm ${
                      isActive
                        ? 'bg-gradient-to-br from-[#265ba3] to-[#1a365d] text-white shadow-lg transform scale-105'
                        : 'hover:bg-white hover:shadow-md text-gray-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#4897de]'}`} />
                      
                        <span className="font-medium">{section.name}</span>
               
                    </div>
              
                      <div className="flex items-center">
                        {getStatusIcon(status)}
                      </div>
                  
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {sections.find(s => s.id === activeSection)?.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  {activeSection === 'company-info' && 'Basic company information and branding'}
                  {activeSection === 'services' && 'Services and capabilities you offer'}
                  {activeSection === 'focus' && 'Your areas of specialization and focus'}
                  {activeSection === 'industries' && 'Industries you work with'}
                  {activeSection === 'clients' && 'Client segments you serve'}
                  {activeSection === 'contact-location' && 'Contact information and company location'}
                </p>
              </div>
              <button 
                onClick={onBack}
                className="text-gray-500 hover:text-[#4897de] p-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto ">
            <div className="w-full mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                {renderActiveSection()}

                {/* Navigation Buttons */}
                <div className="flex pl-3 justify-between items-center pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={goToPrevSection}
                    disabled={isFirstSection()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isFirstSection()
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    <FaArrowLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleSaveProgress}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-3 bg-[#265ba3] hover:bg-[#01357a] text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
                    >
                      <FaSave className="w-4 h-4" />
                      Save Progress
                    </button>

                    {isLastSection() ? (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 bg-[#265ba3] hover:bg-[#01357a] text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <FaCheck className="w-4 h-4" />
                        {isSubmitting ? 'Saving...' : 'Complete Profile'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={goToNextSection}
                        className="flex items-center gap-2 px-6 py-3 bg-[#265ba3] hover:bg-[#01357a] text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Next
                        <FaArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}