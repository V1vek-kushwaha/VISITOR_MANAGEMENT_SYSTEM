// utils/api.js

export const getAPI = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (err) {
    throw err;
  }
};


export const postAPI = async (url, body) => {
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNzQ0ODczMjQ1LCJleHAiOjE3NDQ5NTk2NDV9.0jf0oUptOmUspDdHrBDVzj5iv79WhxrE4wcqbqe6ujk"
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
       },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (err) {
    throw err;
  }
};


export const putAPI = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteAPI = async (url) => {
  try {
    const res = await fetch(url, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  } catch (err) {
    throw err;
  }
};
