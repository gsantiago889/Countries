import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const SET_PAGE = "SET_PAGE";

export const getAllCountries = () => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries`)
      .then((allCountries) => {
        dispatch({
          type: GET_ALL_COUNTRIES,
          payload: allCountries.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getCountryById = (id) => {
  return async function (dispatch) {
    try {
      let country = await axios.get(`http://localhost:3001/countries/${id}`);
      if (country.data.msg) {
        alert(country.data.msg);
      } else {
        dispatch({
          type: GET_COUNTRY_ID,
          payload: country.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const filter = (filter) => {
  return {
    type: FILTER,
    payload: filter,
  };
};

export const orderCountry = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};

export const createActivity = (body) => {
  return async function (dispatch) {
    try {
      let result = await axios.post("http://localhost:3001/activities", body);
      if (result.data.msg) {
        alert(result.data.msg);
      } else {
        dispatch({
          type: CREATE_ACTIVITY,
          payload: result.data,
        });
        alert("The activity was created correctly");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getActivity = () => {
  return async function (dispatch) {
    try {
      let result = await axios.get("http://localhost:3001/activities");
      dispatch({
        type: GET_ACTIVITY,
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCountryByName = (name) => {
  debugger;
  return async function (dispatch) {
    try {
      let result = await axios.get(
        `http://localhost:3001/countries/?name=${name}`
      );
      if (result.data.msg) {
      } else {
        dispatch({
          type: GET_COUNTRY_BY_NAME,
          payload: result.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setPage = (payload) => {
  return {
    type: SET_PAGE,
    payload,
  };
};
