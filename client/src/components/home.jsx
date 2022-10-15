import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountries, getActivity, setPage } from "../store/actions/index";
import CountryCard from "./countryCard";
import Paginado from "./paginado";
import { useState } from "react";
import Filter from "./filters";

const Home = () => {
  const countries = useSelector((state) => state.countries);
  const allCountries = useSelector((state) => state.allCountries);
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();

  const [countriesPerPage] = useState(10);
  const LastCountries =
    currentPage === 1 ? 10 : currentPage * countriesPerPage - 1;
  const FirstCountries =
    currentPage === 1 ? 0 : LastCountries - countriesPerPage;
  const currentCountries = countries.slice(FirstCountries, LastCountries);

  const paginado = (numberOfPage) => {
    dispatch(setPage(numberOfPage));
  };

  useEffect(() => {
    if (allCountries.length === 0 || currentCountries.length === 0) {
      dispatch(getAllCountries());
    }
    dispatch(getActivity());
  }, [
    countries.length,
    currentCountries.length,
    allCountries.length,
    countriesPerPage,
    currentPage,
    dispatch,
  ]);

  return (
    <div className="contenedor">
      <div>
        <Filter />
      </div>

      <div>
        <Paginado
          countriesPerPage={countriesPerPage}
          countries={countries.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
      <div className="card">
        {currentCountries && currentCountries.length > 0 ? (
          currentCountries?.map((country) => {
            return (
              <CountryCard
                key={country.id}
                id={country.id}
                flags={country.flags}
                name={country.name}
                continents={country.continents}
              />
            );
          })
        ) : (
          <div className="cargando">
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
