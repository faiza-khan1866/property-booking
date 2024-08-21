import { useQuery } from "react-query";
import { API } from "../../http/API";

const fetchListPropertyData = async () => {
  try {
    const response = await API.get("/pages/list-your-property");
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

const useListPropertyData = () => {
  return useQuery("listPropertyData", fetchListPropertyData, {
    keepPreviousData: true,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    refetchOnWindowFocus: false,
  });
};

export default useListPropertyData;
