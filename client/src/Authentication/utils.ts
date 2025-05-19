export const getRoleFromToken = (token: string): string => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

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

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    const userId = decodedToken["sub"] || decodedToken["userId"];

    if (!userId) {
      console.warn("User ID not found in token.");
      return null;
    }

    return userId;
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};

export const getEmailFromToken = (token: string): string | null => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const decodedToken = JSON.parse(decodedPayload);

    const email =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];
    if (!email) {
      console.warn("Email not found in token.");
    }

    return email || null;
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};

export const getFullNameFromToken = (token: string): string | null => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken["fullName"] || null;
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};
