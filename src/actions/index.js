import callApi from "../api";
import { API } from "../http/API";
import moment from "moment";
import { toast } from "react-toastify";

export const GET_ALL_PROPERTIS = "GET_ALL_PROPERTIS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_ALL_CATEGORIES_EMPTY = "GET_ALL_CATEGORIES_EMPTY";
export const GET_SINGLE_PROPERTY = "GET_SINGLE_PROPERTY";
export const RESET_SINGLE_PROPERTY = "RESET_SINGLE_PROPERTY";
export const GET_RENDOM_PROPERTIS = "GET_RENDOM_PROPERTIS";

export const GET_RATE_IDS = "GET_RATE_IDS";
export const GET_CATEGORIES_RATES = "GET_CATEGORIES_RATES";
export const GET_CATEGORIES_RATES_EMPTY = "GET_CATEGORIES_RATES_EMPTY";
export const GET_FINAL_RATES = "GET_FINAL_RATES";
export const GET_TOURISM_FEE = "GET_TOURISM_FEE";

export const GET_NUMBER_CART = "GET_NUMBER_CART";
export const ADD_CART = "ADD_CART";
export const ADD_CART_GUEST = "ADD_CART_GUEST";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART = "DELETE_CART";
export const CLEAR_CART = "CLEAR_CART";

export const GET_NUMBER_WISHLIST = "GET_NUMBER_WISHLIST";
export const GET_WISHLIST = "GET_WISHLIST";

export const SET_CHECKDATE = "SET_CHECKDATE";
export const CLEAR_CHECKDATE = "CLEAR_CHECKDATE";

export const SHOW_COMP = "SHOW_COMP";
export const HIDE_COMP = "HIDE_COMP";

export const SHOW_LOADER = "SHOW_LOADER";

export const GET_ALL_NAVLINK = "GET_ALL_NAVLINK";
export const CLEAR_ALL_NAVLINK = "CLEAR_ALL_NAVLINK";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

//get property api
export const actFetchPropertiesRequest = () => {
  return (dispatch) => {
    return callApi("properties", "GET", null).then((res) => {
      dispatch(GetAllProperties(res?.data));
    });
  };
};

//get rendom property api
export const actFetchRendomPropertiesRequest = () => {
  return (dispatch) => {
    return callApi("random-property", "GET", null).then((res) => {
      dispatch(GetRendomProperties(res?.data));
    });
  };
};

//  get categories api
export const actFetchCategoriesRequest = (id) => {
  return (dispatch) => {
    dispatch(showLoader(true));
    return callApi(`categories/${id}`, "GET", null).then((res) => {
      dispatch(GetAllCategories(res?.data));
      dispatch(showLoader(false));
    });
  };
};

// fetch rates api

export const actFetchRatesRequest = () => {
  return (dispatch) => {
    return callApi(`rates`, "GET", null).then((res) => {
      dispatch(GetRateIds(res?.data));
    });
  };
};

// fetch categories rates
export const actFetchAvailabilityRatesRequest = (
  id,
  date_to,
  date_from,
  categoryIds
) => {
  return (dispatch) => {
    let ratesData = {
      agentId: 1,
      categoryIds: categoryIds,
      dateFrom: moment(date_from).format("YYYY-MM-DD HH:mm:ss"),
      dateTo: moment(date_to).format("YYYY-MM-DD HH:mm:ss"),
      propertyId: id,
      rateIds: [2],
    };

    dispatch(showLoader(true));
    API.post(`/availability-rate-grid`, ratesData)
      .then((response) => {
        if (response?.data?.message) {
          dispatch(showLoader(false));
          toast.info(response?.data?.message);
        } else {
          if (response.status == 200 || response.status == 201) {
            let categories = [];
            let catData = response?.data?.categories?.forEach((x) => {
              categories.push({
                categoryId: x?.categoryId,
                dailyRate: x?.rates,
                rate: x?.rates?.map((ra) => {
                  let DailyRateNow = ra?.dayBreakdown.reduce(
                    (previousValue, currentValue) => {
                      return previousValue + currentValue?.dailyRate;
                    },
                    0
                  );
                  return DailyRateNow;
                }),
              });
            });
            console.log("categories");
            dispatch(GetCategoriesRates(categories));
            dispatch(showLoader(false));
          }
        }
      })
      .catch((err) => {
        dispatch(showLoader(false));
        console.log(err);
        toast.error("No Data Found !!!");
      });
  };
};

// fetch rate api total rate of room

// export const actFetchFinalRateRequest = (
//   areaId,
//   categoryId,
//   departureDate,
//   arrivalDate,
//   propertyId,
//   rateIds,
//   totalStay
// ) => {
//   return (dispatch) => {
//     let finalRatesData = {
//       agentId: 1,
//       areaId: areaId,
//       arrivalDate: arrivalDate
//         ? moment(arrivalDate).format("YYYY-MM-DD HH:mm:ss")
//         : "",
//       categoryId: categoryId,
//       children: 1,
//       departureDate: departureDate
//         ? moment(departureDate).format("YYYY-MM-DD HH:mm:ss")
//         : "",
//       ignoreRateRestrictions: false,
//       infants: 1,
//       propertyId: propertyId,
//       rateTypeId:
//         totalStay && totalStay < 7
//           ? rateIds?.filter((x) => x?.id)[1]?.id
//           : totalStay && totalStay >= 7 && totalStay < 30
//           ? rateIds?.filter((x) => x?.id)[2]?.id
//           : totalStay &&
//             totalStay >= 30 &&
//             rateIds?.filter((x) => x?.id)[3]?.id,
//       useIbeDepositRules: true,
//     };
//     dispatch(showLoader(true));
//     API.post(`/ratesRateQuote`, finalRatesData)
//       .then((response) => {
//         if (response.status == 200 || response.status == 201) {
//           dispatch(showLoader(false));
//           dispatch(GetFinalRate(response?.data));
//         }
//       })
//       .catch((err) => {
//         dispatch(showLoader(false));
//         console.log(err);
//         toast.error("No Data Found !!!");
//       });
//   };
// };

export const actFetchFinalRateRequest = (
  areaId,
  categoryId,
  departureDate,
  arrivalDate,
  propertyId,
  rateIds,
  totalStay
) => {
  return async (dispatch) => {
    let finalRatesData = {
      agentId: 1,
      areaId: areaId,
      arrivalDate: arrivalDate
        ? moment(arrivalDate).format("YYYY-MM-DD HH:mm:ss")
        : "",
      categoryId: categoryId,
      children: 1,
      departureDate: departureDate
        ? moment(departureDate).format("YYYY-MM-DD HH:mm:ss")
        : "",
      ignoreRateRestrictions: false,
      infants: 1,
      propertyId: propertyId,
      rateTypeId:
        totalStay && totalStay < 7
          ? rateIds?.filter((x) => x?.id)[1]?.id
          : totalStay && totalStay >= 7 && totalStay < 30
          ? rateIds?.filter((x) => x?.id)[2]?.id
          : totalStay &&
            totalStay >= 30 &&
            rateIds?.filter((x) => x?.id)[3]?.id,
      useIbeDepositRules: true,
    };

    dispatch(showLoader(true));

    try {
      const response = await API.post(`/ratesRateQuote`, finalRatesData);
      if (response.status === 200 || response.status === 201) {
        dispatch(GetFinalRate(response.data));
      } else {
        toast.error("No Data Found !!!");
      }
    } catch (err) {
      console.log(err);
      toast.error("No Data Found !!!");
    } finally {
      dispatch(showLoader(false));
    }
  };
};

// fetch TourismbFee

export const actFetchTourismFeeRequest = (categoryId) => {
  return (dispatch) => {
    dispatch(showLoader(true));
    API.get(`/tourism-dhiram/${categoryId}`)
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          dispatch(showLoader(false));
          dispatch(GetTourismFee(response?.data));
        }
      })
      .catch((err) => {
        dispatch(showLoader(false));
        console.log(err);
        toast.error("No Data Found !!!");
      });
  };
};

// property inner page api for category AND ROOMS

export const actFetchSinglePropertyRequest = (
  id,
  arrivalDate,
  departureDate
) => {
  return (dispatch) => {
    let roomsData = {
      categoryIds: [id],
      dateFrom: arrivalDate
        ? moment(arrivalDate).format("YYYY-MM-DD HH:mm:ss")
        : "",
      dateTo: departureDate
        ? moment(departureDate).format("YYYY-MM-DD HH:mm:ss")
        : "",
    };
    dispatch(showLoader(true));
    dispatch(ResetSingleProperty());
    return API.post(`/categories`, roomsData)
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          dispatch(showLoader(false));
          dispatch(GetSingleProperty(response?.data));
        }
        return response;
      })
      .catch((err) => {
        dispatch(showLoader(false));
        console.log(err);
        toast.error("No Data Found !!!");
        return err;
      });
  };
};

// Nav bar locations api

export const FetchNavLocationDropDown = () => {
  return (dispatch) => {
    API.get(`/location-drop-down`)
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          dispatch(GetAllNavLink(response?.data));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("No Data Found !!!");
      });
  };
};

//get wishlist api
export const actFetchGetWishlistRequest = (
  xauthtoken,
  userId,
  isAuthenticated
) => {
  return (dispatch) => {
    if (isAuthenticated) {
      API.get(`/auth/save-property/${userId}`, {
        headers: { Authorization: `Bearer ${xauthtoken}` },
      })
        .then((response) => {
          dispatch(GetWishlist(response.data));
          dispatch(GetNumberWishlist(response.data.length));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(GetWishlist([]));
      dispatch(GetNumberWishlist(0));
    }
  };
};

// add to wishlist api
export const actFetchWishlidtAddRequest = (
  data,
  xauthtoken,
  userId,
  isAuthenticated
) => {
  return (dispatch) => {
    if (isAuthenticated) {
      let savedData = {
        user_id: userId,
        property_id: data?.propertyId,
        rms_area_id: 0,
        category_id: data?.id,
      };

      API.post(`/auth/save-property`, savedData, {
        headers: { Authorization: `Bearer ${xauthtoken}` },
      })
        .then((response) => {
          toast.success(response.data);
          dispatch(
            actFetchGetWishlistRequest(xauthtoken, userId, isAuthenticated)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.info("Please Login/Registration first.");
    }
  };
};

/*Delete single Data from Saved Data */
export const actFetchDeleteWishlistRequest = (
  id,
  xauthtoken,
  userId,
  isAuthenticated
) => {
  return (dispatch) => {
    API.delete(`/auth/delete-save-property/${id}`, {
      headers: { Authorization: `Bearer ${xauthtoken}` },
    })
      .then((response) => {
        toast.success("Data has been deleted Successfully!.");
        dispatch(
          actFetchGetWishlistRequest(xauthtoken, userId, isAuthenticated)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

/*Clear Saved Data */
export const actFetchClearWishlistRequest = (
  xauthtoken,
  userId,
  isAuthenticated
) => {
  return (dispatch) => {
    API.delete(`/auth/remove-all-save-property/${userId}`, {
      headers: { Authorization: `Bearer ${xauthtoken}` },
    })
      .then((response) => {
        toast.success("Saved Data has been Cleared Successfully!.");
        dispatch(
          actFetchGetWishlistRequest(xauthtoken, userId, isAuthenticated)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// navDropDown;
export function GetAllNavLink(payload) {
  return {
    type: "GET_ALL_NAVLINK",
    payload,
  };
}
export function RemoveAllNavLink() {
  return {
    type: "CLEAR_ALL_NAVLINK",
  };
}

/*PROPERTIES*/
export function GetAllProperties(payload) {
  return {
    type: "GET_ALL_PROPERTIS",
    payload,
  };
}

/*RENDOM PROPERTIES*/
export function GetRendomProperties(payload) {
  return {
    type: "GET_RENDOM_PROPERTIS",
    payload,
  };
}

/*GET Multiple Categories*/
export function GetAllCategories(payload) {
  return {
    type: "GET_ALL_CATEGORIES",
    payload,
  };
}
/*set Multiple empty*/
export function GetAllCategoriesEmpty() {
  return {
    type: "GET_ALL_CATEGORIES_EMPTY",
  };
}

/*GET SINGLE PROPERTY*/
export function GetSingleProperty(payload) {
  return {
    type: "GET_SINGLE_PROPERTY",
    payload,
  };
}
/*GET SINGLE PROPERTY*/

export function ResetSingleProperty() {
  return {
    type: "RESET_SINGLE_PROPERTY",
  };
}
/*GET Categories Rates*/
export function GetRateIds(payload) {
  return {
    type: "GET_RATE_IDS",
    payload,
  };
}

/*GET Categories Rates*/
export function GetCategoriesRates(payload) {
  return {
    type: "GET_CATEGORIES_RATES",
    payload,
  };
}
/*GET Categories Rates Empty*/
export function GetCategoriesRatesEmpty() {
  return {
    type: "GET_CATEGORIES_RATES_EMPTY",
  };
}

/*GET Final Rates*/
export function GetFinalRate(payload) {
  return {
    type: "GET_FINAL_RATES",
    payload,
  };
}

/*GET Tourism FEE*/
export function GetTourismFee(payload) {
  return {
    type: "GET_TOURISM_FEE",
    payload,
  };
}

/*CART ACTIONS*/
export function GetNumberCart() {
  return {
    type: "GET_NUMBER_CART",
  };
}

export function AddCart(payload) {
  return {
    type: "ADD_CART",
    payload,
  };
}
export function AddCartGuest(payload) {
  return {
    type: "ADD_CART_GUEST",
    payload,
  };
}
export function UpdateCart(payload) {
  return {
    type: "UPDATE_CART",
    payload,
  };
}
export function DeleteCart(payload) {
  return {
    type: "DELETE_CART",
    payload,
  };
}
export function ClearCart(payload) {
  return {
    type: "CLEAR_CART",
    payload,
  };
}

/*WISHLIST ACTIONS*/

export function GetNumberWishlist(payload) {
  return {
    type: "GET_NUMBER_WISHLIST",
    payload,
  };
}

export function GetWishlist(payload) {
  return {
    type: "GET_WISHLIST",
    payload,
  };
}

/*SHOW / HIDE ACTIONS*/

export function showComp(pageShow) {
  return {
    type: "SHOW_COMP",
    payload: pageShow,
  };
}
export function hideComp(pageShow) {
  return {
    type: "HIDE_COMP",
    payload: pageShow,
  };
}

/*SHOW / HIDE Loader*/

export function showLoader(payload) {
  return {
    type: "SHOW_LOADER",
    payload,
  };
}

/*login / register ACTIONS*/

export function userLogin(payload) {
  return {
    type: "LOGIN_USER",
    payload,
  };
}
export function userLogout() {
  return {
    type: "LOGOUT_USER",
  };
}

// Check in and out Date Action

export function SetCheckDate(payload) {
  return {
    type: SET_CHECKDATE,
    payload,
  };
}
export function ClearCheckDate() {
  return {
    type: CLEAR_CHECKDATE,
  };
}
