import { API_URL } from "../constants/constants";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const fetchAllApplications = async () => {

  const userId = localStorage.getItem("userId");

  try {

    const response = await fetch(`${API_URL}/api/applications/user/${userId}`);

    if (!response.ok) return [];

    const text = await response.text();
    if (!text) return [];

    return JSON.parse(text);

  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};

export const fetchDashboardStats = async () => {

  const userId = localStorage.getItem("userId");

  try {

    const response = await fetch(`${API_URL}/api/applications/stats/${userId}`);

    if (!response.ok) return {};

    return await response.json();

  } catch (error) {
    console.error("Error fetching stats:", error);
    return {};
  }
};

export const createApplication = async (data) => {

  const userId = localStorage.getItem("userId");

  try {

    const response = await fetch(`${API_URL}/api/applications`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        ...data,
        userId
      })
    });

    return response.ok;

  } catch (error) {
    console.error("Error creating application:", error);
    return false;
  }
};

export const updateApplication = async (id, data) => {

  try {

    const response = await fetch(`${API_URL}/api/applications/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data)
    });

    return response.ok;

  } catch (error) {
    console.error("Error updating application:", error);
    return false;
  }
};

export const deleteApplication = async (id) => {

  try {

    const response = await fetch(`${API_URL}/api/applications/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });

    return response.ok;

  } catch (error) {
    console.error("Error deleting application:", error);
    return false;
  }
};