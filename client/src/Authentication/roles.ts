export const ROLES = {
  Admin: "Admin",
  Customer: "Customer",
};

export const ROLE_PERMISSIONS = {
  Admin: ["/order", "/customer", "order-detail"],
  Customer: ["/book", "/author", "genre"],
};
