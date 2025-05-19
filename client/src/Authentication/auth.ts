import axiosClient from "../api/axiosClient";

export const register = async (
  fullName: string,
  username: string,
  email: string,
  password: string,
) => {
  try {
    await axiosClient.post("/auth/register", {
      fullName,
      username,
      email,
      password,
      role: "Customer",
    });
  } catch (error: any) {
    console.error("Registration API Error:", error.response?.data || error);
    throw error; // Re-throw the error for further handling
  }
};

export const login = async (
  username: string,
  password: string,
): Promise<string> => {
  const response = await axiosClient.post("/auth/login", {
    username,
    password,
  });
  return response.data.token;
};
