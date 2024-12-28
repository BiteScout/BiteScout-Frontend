import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {AuthProvider} from "./context/AuthContext.tsx";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import store from "./store";

import App from "./App.tsx";
import {Provider} from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
              <AuthProvider>
                  <App />
              </AuthProvider>
          </PersistGate>
      </Provider>
  </StrictMode>
);
