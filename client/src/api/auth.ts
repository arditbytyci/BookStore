import axiosClient from "../axiosClient";

export const register = async (
  fullName: string,
  username: string,
  email: string,
  password: string
) => {
  await axiosClient.post("/auth/register", {
    fullName,
    username,
    email,
    password,
    role: "Customer",
  });
};

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const response = await axiosClient.post("/auth/login", {
    username,
    password,
  });
  return response.data.token;
};
