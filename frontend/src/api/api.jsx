import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const signUpUser = async (userInfo) => {
    try {
        const response = await API.post("api/signup/", userInfo);
        return response.data;
    } catch (error)
    {
        if (error.response) {
            console.error("Backend error:", error.response.data);
            throw new Error(error.response.data.message || "An error occurred during signup");
        } else if (error.request) {
            console.error("Request error:", error.request);
            throw new Error("No response received from the server");
        } else {
            console.error("Error setting up request:", error.message);
            throw new Error("An unexpected error occurred");
        }
    }
}