import { useQuery } from "react-query";
import { API } from "../../http/API";

const fetchTermsConditionsData = async () => {
  try {
    const response = await API.get("/pages/terms-and-conditions");
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

const useTermsConditionsData = () => {
  return useQuery("termsConditionsData", fetchTermsConditionsData, {
    keepPreviousData: true,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    refetchOnWindowFocus: false,
  });
};

export default useTermsConditionsData;
