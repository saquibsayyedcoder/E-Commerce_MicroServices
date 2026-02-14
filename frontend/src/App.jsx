import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import store from "./app/store";
import { queryClient } from "./app/queryClient";
import AppRoutes from "./routes/AppRoutes";
import AppInitializer from "./AppInitializer";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
      <AppInitializer>
            <AppRoutes />
      </AppInitializer>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
