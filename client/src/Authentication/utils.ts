export const getRoleFromToken = (token: string): string => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.role || "Customer";
  } catch (error) {
    console.error("Error decoding token", error);
    return "Customer";
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};
