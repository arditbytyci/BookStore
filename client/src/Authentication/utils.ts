export const getRoleFromToken = (token: string): string => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded Token:", decodedToken); // Log decoded token for debugging

    // Extract role using the correct claim key
    const role =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    if (role === "Admin" || role === "Customer") {
      return role;
    }
    if (!role) {
      console.warn("Role not found in token. Defaulting to 'Customer'.");
    }

    return role || "Customer"; // Return role or default
  } catch (error) {
    console.error("Error decoding token", error);
    return "Customer";
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};
