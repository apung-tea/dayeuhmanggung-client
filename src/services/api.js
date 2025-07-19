
const API_BASE_URL = 'https://api-g86hgaslx-apungs-projects-107307fb.vercel.app';

// Helper function untuk membuat request
const makeRequest = async (endpoint, options = {}, isFormData = false) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  const config = {
    mode: 'cors',
    credentials: 'omit',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Best Of Service
export const bestOfService = {
  getAll: async () => {
    return makeRequest('bestof');
  },
  
  getById: async (id) => {
    return makeRequest(`bestof/${id}`);
  },
  
  create: async (data, isFormData = false) => {
    return makeRequest('bestof', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    }, isFormData);
  },
  
  update: async (id, data, isFormData = false) => {
    return makeRequest(`bestof/${id}`, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
    }, isFormData);
  },
  
  delete: async (id) => {
    return makeRequest(`bestof/${id}`, {
      method: 'DELETE',
    });
  },
};

// Tentang Service
export const tentangService = {
  get: async () => {
    return makeRequest('tentang');
  },
  
  update: async (data) => {
    return makeRequest('tentang', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  upload: async (formData) => {
    return makeRequest('tentang', {
      method: 'POST',
      body: formData,
    }, true);
  },
};

// Review Service
export const reviewService = {
  getAll: async () => {
    return makeRequest('review');
  },
  
  getById: async (id) => {
    return makeRequest(`review/${id}`);
  },
  
  create: async (data) => {
    return makeRequest('review', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },
  
  update: async (id, data) => {
    return makeRequest(`review/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: async (id) => {
    return makeRequest(`review/${id}`, {
      method: 'DELETE',
    });
  },
};

// Artikel Service
export const artikelService = {
  getAll: async () => {
    return makeRequest('artikel');
  },
  
  getById: async (id) => {
    return makeRequest(`artikel/${id}`);
  },
  
  create: async (data, isFormData = false) => {
    return makeRequest('artikel', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    }, isFormData);
  },
  
  update: async (id, data, isFormData = false) => {
    return makeRequest(`artikel/${id}`, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
    }, isFormData);
  },
  
  delete: async (id) => {
    return makeRequest(`artikel/${id}`, {
      method: 'DELETE',
    });
  },
};

// Galeri Service
export const galeriService = {
  getAll: async () => {
    return makeRequest('galeri');
  },
  
  getById: async (id) => {
    return makeRequest(`galeri/${id}`);
  },
  
  create: async (data, isFormData = false) => {
    return makeRequest('galeri', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    }, isFormData);
  },
  
  update: async (id, data, isFormData = false) => {
    return makeRequest(`galeri/${id}`, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
    }, isFormData);
  },
  
  delete: async (id) => {
    return makeRequest(`galeri/${id}`, {
      method: 'DELETE',
    });
  },
};

// Dashboard Service
export const dashboardService = {
  getStats: async () => {
    return makeRequest('dashboard');
  },
};

// Auth Service
export const authService = {
  login: async (credentials) => {
    // credentials: { username, password }
    return makeRequest('admin', {
      method: 'POST',
      body: JSON.stringify({ ...credentials, login: 1 }),
    });
  },
  
  logout: async () => {
    return makeRequest('admin/logout', {
      method: 'POST',
    });
  },
  
  checkAuth: async () => {
    return makeRequest('admin/check-auth');
  },
};

// Profile Admin Service
export const profileAdminService = {
  get: async () => {
    return makeRequest('admin');
  },
  update: async (data, isFormData = false) => {
    return makeRequest('admin', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    }, isFormData);
  },
}; 

// Fasilitas Service
export const fasilitasService = {
  getAll: async () => {
    return makeRequest('fasilitas');
  },
  getById: async (id) => {
    return makeRequest(`fasilitas/${id}`);
  },
  create: async (data, isFormData = false) => {
    return makeRequest('fasilitas', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    }, isFormData);
  },
  update: async (id, data, isFormData = false) => {
    return makeRequest(`fasilitas/${id}`, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
    }, isFormData);
  },
  delete: async (id) => {
    return makeRequest(`fasilitas/${id}`, {
      method: 'DELETE',
    });
  },
}; 