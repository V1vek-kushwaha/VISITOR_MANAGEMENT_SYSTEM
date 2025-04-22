const API_URL = process.env.REACT_APP_API_URL;

export const fetchVisitors = async (params = {}) => {
  const url = new URL(`${API_URL}/visitor/visitors-all`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch visitors");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return { results: [], count: 0 };
  }
};
