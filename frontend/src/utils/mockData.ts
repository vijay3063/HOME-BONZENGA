// Mock data utility functions
import customerData from '@/mockData/customers.json';
import vendorData from '@/mockData/vendors.json';
import beauticianData from '@/mockData/beauticians.json';
import adminData from '@/mockData/admin.json';
import managerData from '@/mockData/managers.json';

export const getMockData = {
  customers: () => customerData,
  vendors: () => vendorData,
  beauticians: () => beauticianData,
  admin: () => adminData,
  managers: () => managerData,
};

export const findMockUser = (userId: string, type: 'customer' | 'vendor' | 'beautician') => {
  switch (type) {
    case 'customer':
      return customerData.customers.find(c => c.id === userId) || customerData.customers[0];
    case 'vendor':
      return vendorData.vendors.find(v => v.id === userId) || vendorData.vendors[0];
    case 'beautician':
      return beauticianData.beauticians.find(b => b.id === userId) || beauticianData.beauticians[0];
    default:
      return null;
  }
};

export const simulateApiDelay = (ms: number = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-CD', {
    style: 'currency',
    currency: 'CDF',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
