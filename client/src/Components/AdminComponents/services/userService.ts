import axiosClient from "../../../api/axiosClient";
import { User } from "../../../Models/User";

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosClient.get("/user");
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosClient.delete(`/user/${id}`);
};
