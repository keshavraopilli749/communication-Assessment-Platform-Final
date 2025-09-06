// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  ME: `${API_BASE_URL}/auth/me`,
  
  // Modules
  MODULES: `${API_BASE_URL}/modules`,
  MODULE_SECTIONS: (slug: string) => `${API_BASE_URL}/modules/${slug}/sections`,
  SECTION_RULES: (sectionId: string) => `${API_BASE_URL}/sections/${sectionId}/rules`,
  
  // Assessments
  ASSESSMENTS: `${API_BASE_URL}/assessments`,
  ASSESSMENT: (id: string) => `${API_BASE_URL}/assessments/${id}`,
  ASSESSMENT_QUESTIONS: (id: string) => `${API_BASE_URL}/assessments/${id}/questions`,
  ASSESSMENT_SUBMIT: (id: string) => `${API_BASE_URL}/assessments/${id}/submit`,
  ASSESSMENT_RESULTS: (id: string) => `${API_BASE_URL}/assessments/${id}/results`,
  
  // Responses
  RESPONSES: `${API_BASE_URL}/responses`,
  
  // Upload
  UPLOAD: `${API_BASE_URL}/upload`,
  
  // AI
  AI_GENERATE: `${API_BASE_URL}/ai/generate-questions`,
};

// API helper functions
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Auth API functions
export const authAPI = {
  register: (data: { name?: string; email: string; password: string }) =>
    apiRequest(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  login: (data: { email: string; password: string }) =>
    apiRequest(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  getProfile: () => apiRequest(API_ENDPOINTS.ME),
};

// Modules API functions
export const modulesAPI = {
  getModules: () => apiRequest(API_ENDPOINTS.MODULES),
  
  getModuleSections: (slug: string) => 
    apiRequest(API_ENDPOINTS.MODULE_SECTIONS(slug)),
  
  getSectionRules: (sectionId: string) => 
    apiRequest(API_ENDPOINTS.SECTION_RULES(sectionId)),
};

// Assessments API functions
export const assessmentsAPI = {
  getAssessment: (id: string) => 
    apiRequest(API_ENDPOINTS.ASSESSMENT(id)),
  
  getAssessmentQuestions: (id: string, page: number = 1, limit: number = 1) => 
    apiRequest(`${API_ENDPOINTS.ASSESSMENT_QUESTIONS(id)}?page=${page}&limit=${limit}`),
  
  submitAssessment: (id: string, data: any) =>
    apiRequest(API_ENDPOINTS.ASSESSMENT_SUBMIT(id), {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  getAssessmentResults: (id: string, userId?: string) => {
    const url = userId 
      ? `${API_ENDPOINTS.ASSESSMENT_RESULTS(id)}?userId=${userId}`
      : API_ENDPOINTS.ASSESSMENT_RESULTS(id);
    return apiRequest(url);
  },
};

// Responses API functions
export const responsesAPI = {
  saveResponse: (data: any) =>
    apiRequest(API_ENDPOINTS.RESPONSES, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  getResponses: (userId?: string, assessmentId?: string) => {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (assessmentId) params.append('assessmentId', assessmentId);
    const url = params.toString() 
      ? `${API_ENDPOINTS.RESPONSES}?${params.toString()}`
      : API_ENDPOINTS.RESPONSES;
    return apiRequest(url);
  },
};

// Upload API functions
export const uploadAPI = {
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiRequest(API_ENDPOINTS.UPLOAD, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  },
};
