import { useQuery } from "react-query";
import { API } from "../../http/API";

const fetchRefundPolicyData = async () => {
  try {
    const response = await API.get("/pages/refund-policy");
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

const useRefundPolicyData = () => {
  return useQuery("refundPolicyData", fetchRefundPolicyData, {
    keepPreviousData: true,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    refetchOnWindowFocus: false,
  });
};

export default useRefundPolicyData;
