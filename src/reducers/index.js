import { combineReducers } from "redux";
import {
  GET_ALL_PROPERTIS,
  GET_RENDOM_PROPERTIS,
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_EMPTY,
  GET_SINGLE_PROPERTY,
  RESET_SINGLE_PROPERTY,
  GET_NUMBER_CART,
  ADD_CART,
  ADD_CART_GUEST,
  DELETE_CART,
  CLEAR_CART,
  GET_NUMBER_WISHLIST,
  UPDATE_CART,
  GET_WISHLIST,
  SET_CHECKDATE,
  GET_ALL_NAVLINK,
  CLEAR_ALL_NAVLINK,
  CLEAR_CHECKDATE,
  LOGIN_USER,
  LOGOUT_USER,
  SHOW_COMP,
  HIDE_COMP,
  GET_RATE_IDS,
  GET_CATEGORIES_RATES,
  GET_CATEGORIES_RATES_EMPTY,
  GET_FINAL_RATES,
  GET_TOURISM_FEE,
  SHOW_LOADER,
} from "../actions";

const InitialCheckDate = {
  arrivalDate: null,
  departureDate: null,
};
const initProperty = {
  _properties: [],
  rendomProperties: [],
  categories: [],
  singleProperty: [],
  numberCart: 0,
  Carts: [],
  CartPropertyID: null,
  NavLinks: [],
  CheckDate: InitialCheckDate,
  numberWishlist: 0,
  WishList: [],
  pageShow: false,
  rateIds: [],
  categoriesRates: [],
  finalRate: {},
  tourismFee: [],
  loader: false,
};

function todoProerties(state = initProperty, action) {
  switch (action.type) {
    case GET_ALL_PROPERTIS:
      return {
        ...state,
        _properties: action.payload,
      };
    case GET_RENDOM_PROPERTIS:
      return {
        ...state,
        rendomProperties: action.payload,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_ALL_CATEGORIES_EMPTY:
      return {
        ...state,
        categories: [],
      };
    case GET_SINGLE_PROPERTY:
      return {
        ...state,
        singleProperty: action.payload,
      };
    case RESET_SINGLE_PROPERTY:
      return {
        ...state,
        singleProperty: [],
      };

    case GET_RATE_IDS:
      return {
        ...state,
        rateIds: action.payload,
      };
    case GET_CATEGORIES_RATES:
      return {
        ...state,
        categoriesRates: action.payload,
      };
    case GET_CATEGORIES_RATES_EMPTY:
      return {
        ...state,
        categoriesRates: [],
      };

    case GET_FINAL_RATES:
      return {
        ...state,
        finalRate: action.payload,
      };
    case GET_TOURISM_FEE:
      return {
        ...state,
        tourismFee: action.payload,
      };
    case SHOW_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case GET_ALL_NAVLINK:
      return {
        ...state,
        NavLinks: action.payload,
      };
    case CLEAR_ALL_NAVLINK:
      return {
        ...state,
        NavLinks: [],
      };
    case GET_NUMBER_CART:
      return {
        ...state,
      };
    case ADD_CART:
      let cart = {
        id: action?.payload?.room?.id,
        title: action?.payload?.room?.name,
        quantity: 1,
        GuestName: action?.payload?.GuestName,
        GuestLastName: action?.payload?.GuestLastName,
        GuestEmail: action?.payload?.GuestEmail,
        GuestPhone: action?.payload?.GuestPhone,
        GuestAdults: action?.payload?.GuestAdults,
        GuestChildren: action?.payload?.GuestChildren,
        propertyId: action?.payload?.room?.propertyId,
        category: {
          id: action?.payload?.category?.id,
          name: action?.payload?.category?.name,
          short_description: action?.payload?.category?.short_description,
          image: action?.payload?.category?.images?.[0]?.images,
          categoryClass: action?.payload?.category?.categoryClass,
          bedrooms: action?.payload?.category?.numberOfBedrooms,
          bathrooms: action?.payload?.category?.numberOfFullBaths,
          rate: action?.payload?.base_rate,
          aminity: action?.payload?.category?.aminity,
        },
      };
      state.Carts.push(cart);
      return {
        ...state,
        numberCart: state.numberCart + 1,
        CartPropertyID: action.payload.room.propertyId,
      };
    case UPDATE_CART:
      state.Carts.forEach((item, key) => {
        if (item.id == state.Carts[action.payload.id].id) {
          state.Carts[key].quantity = action.payload.value;
        }
      });
      return {
        ...state,
      };
    case ADD_CART_GUEST:
      state.Carts.forEach((item, index) => {
        if (item?.id === action.payload?.id) {
          Object.assign(state.Carts[index], {
            GuestName: action.payload.GuestName,
            GuestLastName: action.payload.GuestLastName,
            GuestEmail: action.payload.GuestEmail,
            GuestPhone: action.payload.GuestPhone,
            GuestAdults: action.payload.GuestAdults,
            GuestChildren: action.payload.GuestChildren,
          });
        }
      });

      return {
        ...state,
      };

    case DELETE_CART:
      return {
        ...state,
        numberCart: state.numberCart - 1,
        Carts: state.Carts.filter((item) => {
          return item.id != action.payload.id;
        }),
      };
    case CLEAR_CART:
      return {
        ...state,
        Carts: [],
        numberCart: 0,
        CartPropertyID: null,
        finalRate: {},
        tourismFee: [],
      };
    case GET_NUMBER_WISHLIST:
      return {
        ...state,
        numberWishlist: action.payload,
      };
    case GET_WISHLIST:
      return {
        ...state,
        WishList: action.payload,
      };
    case SHOW_COMP:
      return { ...state, pageShow: true };
    case HIDE_COMP:
      return { ...state, pageShow: false };
    case LOGIN_USER: {
      return { ...state, ...action.payload, isAuthenticated: true };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: false,
        auth_token: null,
        user_id: null,
        WishList: [],
        numberWishlist: 0,
      };
    }
    case SET_CHECKDATE: {
      return { ...state, CheckDate: action.payload, isCheckDate: true };
    }
    case CLEAR_CHECKDATE: {
      return {
        ...state,
        CheckDate: InitialCheckDate,
        isCheckDate: false,
      };
    }

    default:
      return state;
  }
}
const rootReducer = combineReducers({
  _todoProperties: todoProerties,
});
export default rootReducer;
