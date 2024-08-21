import { useQuery } from "react-query";
import { API } from "../../http/API";

const fetchHomeData = async () => {
  try {
    const response = await API.get("/home");
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

const useHomeData = () => {
  return useQuery("homeData", fetchHomeData, {
    keepPreviousData: true,
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 10 * 60 * 1000, // 10 minutes
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    refetchOnWindowFocus: false,
  });
};

export default useHomeData;
