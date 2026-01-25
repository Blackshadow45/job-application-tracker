import { API_URL } from '../constants/constants';

export const fetchAllApplications = async () => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};

export const fetchDashboardStats = async () => {
  try {
    const response = await fetch(`${API_URL}/stats`);
    if (response.ok) {
      return await response.json();
    }
    return {};
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {};
  }
};

export const createApplication = async (data) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.ok;
  } catch (error) {
    console.error('Error creating application:', error);
    return false;
  }
};

export const updateApplication = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.ok;
  } catch (error) {
    console.error('Error updating application:', error);
    return false;
  }
};

export const deleteApplication = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting application:', error);
    return false;
  }
};