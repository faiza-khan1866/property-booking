import React, { useEffect, Suspense } from "react";
import { actFetchPropertiesRequest, actFetchRatesRequest } from "./actions";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/layouts/commonLoader";
import ScrollToTop from "./components/utils/ScrollToTop";
//Routes
import AppRoutes from "./components/navigation/AppRoutes";
import { ReactQueryDevtools } from "react-query/devtools";
import { API } from "./http/API";
// #
import "./assets/css/font-awesome.min.css";
import "./assets/scss/style.scss";

function App() {
  const dispatch = useDispatch();

  const removeCache = () => {
    API.get("/clear-cache")
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(actFetchPropertiesRequest());
    dispatch(actFetchRatesRequest());
    removeCache();
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <ToastContainer theme="colored" autoClose={2000} />
        <ScrollToTop />
        <AppRoutes />
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    </>
  );
}

export default App;
