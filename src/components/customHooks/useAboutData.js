import { useQuery } from "react-query";
import { API } from "../../http/API";

const fetchAboutData = async () => {
  try {
    const response = await API.get("/about-us");
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

const useAboutData = () => {
  return useQuery("aboutData", fetchAboutData, {
    keepPreviousData: true,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    refetchOnWindowFocus: false,
  });
};

export default useAboutData;
