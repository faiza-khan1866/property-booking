import { useQuery } from "react-query";
import { API } from "../../http/API";

const fetchInteriorDesignData = async () => {
  try {
    const response = await API.get("/pages/interior-designing");
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

const useInteriorDesignData = () => {
  return useQuery("interiorDesignData", fetchInteriorDesignData, {
    keepPreviousData: true,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    refetchOnWindowFocus: false,
  });
};

export default useInteriorDesignData;
