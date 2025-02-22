import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./Authentication/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Components/Cart/store.ts";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PSffqGGsJXk0iHFsnaBLJVtQkcYI5xTtrBAyV9Qs4xDFOnyhTytToRNLy7zIE2AYc1a5AYZwpZlklH7MFHTNtSo00vpOOHG6h"
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </Provider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
