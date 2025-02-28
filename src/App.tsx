import React from "react";
import AppRoutes from "./routes/appRoutes";
import ReactHotToast from "./utils/reactHotToast";
import { Provider } from "react-redux";
import store from "./store";

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
        <ReactHotToast position="top-right" />
      </Provider>
    </>
  );
};

export default App;
