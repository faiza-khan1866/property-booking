import { useQuery } from "react-query";
import { API } from "../../http/API";

const fetchPrivacyPolicyData = async () => {
  try {
    const response = await API.get("/pages/privacy-policy");
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

const usePrivacyPolicyData = () => {
  return useQuery("privacyPolicyData", fetchPrivacyPolicyData, {
    keepPreviousData: true,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    refetchOnWindowFocus: false,
  });
};

export default usePrivacyPolicyData;
