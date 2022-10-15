import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_ID,
  ORDER,
  FILTER,
  CREATE_ACTIVITY,
  GET_ACTIVITY,
  GET_COUNTRY_BY_NAME,
  SET_PAGE,
} from "../actions/index";

const initialState = {
  countries: [],
  allCountries: [], // hace las veces de backup
  filter: {
    order: "order",
    continentes: "continents",
    actividades: "activity",
  },
  countriesDetail: {},
  touristActivity: [],
  currentPage: 1,
};

function orderFilter(array, payload) {
  const sortedCountries = [...array];
  if (payload === "a-z") {
    sortedCountries.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }
  if (payload === "z-a") {
    sortedCountries.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
  }
  if (payload === "mayorPoblacion") {
    sortedCountries.sort((a, b) => {
      return b.population - a.population;
    });
  }
  if (payload === "menorPoblacion") {
    sortedCountries.sort((a, b) => {
      return a.population - b.population;
    });
  }

  return sortedCountries;
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: payload,
        allCountries: payload,
        filter: {
          order: "order",
          continentes: "continents",
          actividades: "activity",
        },
      };

    case GET_COUNTRY_ID:
      return {
        ...state,
        countriesDetail: payload,
      };
    case ORDER:
      const orderCountries = orderFilter(state.countries, payload);
      return {
        ...state,
        countries: orderCountries,
        filter: {
          ...state.filter,
          order: payload,
        },
      };
    case FILTER:
      function filterByContinents(countries, searchContinents) {
        if (searchContinents === "continents") {
          return countries;
        } else if ("subdesarrollado" === searchContinents) {
          const f = countries.filter(
            (c) => c.continents === "South America" || c.continents === "Africa"
          );
          return f;
        } else {
          const filterCountries = countries.filter(
            (c) => c.continents === searchContinents
          );
          return filterCountries;
        }
      }

      function filterByActivities(array, uuid) {
        if (uuid === "activity") {
          return array;
        } else {
          const findActivity = state.touristActivity.find((e) => e.id === uuid);

          const filterCountries = array.filter((c) => {
            let result = findActivity.countries?.find(
              (country) => country.id === c.id
            );
            if (result) {
              return true;
            } else return false;
          });
          return filterCountries;
        }
      }

      const countriesFilterByContinents = filterByContinents(
        state.allCountries,
        payload.continentes
      );
      const countriesFilterByActivities = filterByActivities(
        countriesFilterByContinents,
        payload.actividades
      );

      const newOrder = orderFilter(
        countriesFilterByActivities,
        state.filter.order
      );

      return {
        ...state,
        countries: newOrder,
        filter: {
          ...state.filter,
          continentes: payload.continentes,
          actividades: payload.actividades,
        },
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        countries: state.countries.concat(payload),
        allCountries: state.countries.concat(payload),
      };
    case GET_ACTIVITY:
      return {
        ...state,
        touristActivity: payload,
      };

    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        countries: payload,
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: payload,
      };

    default:
      return state;
  }
}
