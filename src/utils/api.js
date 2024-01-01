const BASE_URL = 'https://jsonplaceholder.typicode.com';
const MAX_RETRIES = 3;

const fetchWithRetry = async (url, options) => {
  const attemptRequest = async (retriesLeft) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (retriesLeft > 0) {
        console.error(`Error making request. Retrying... (remaining retries: ${retriesLeft - 1})`);
        return attemptRequest(retriesLeft - 1);
      } else {
        console.error(`Request failed after maximum retries. Error:`, error);
        throw error;
      }
    }
  };

  return attemptRequest(MAX_RETRIES);
};

export const fetchUsers = async () => {
  const url = `${BASE_URL}/users`;
  const options = {};

  return fetchWithRetry(url, options);
};

export const fetchPostsByUser = async (userId) => {
  const url = `${BASE_URL}/posts?userId=${userId}`;
  const options = {};

  return fetchWithRetry(url, options);
};

export const createPost = async (postData) => {
  const url = `${BASE_URL}/posts`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  };

  return fetchWithRetry(url, options);
};
