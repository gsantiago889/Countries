import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryById } from "../store/actions/index";
import style from "./detailCountry.css";
import ActivityDetails from "./activitiesDetail";

const DetailsCountry = () => {
  const countryDetail = useSelector((state) => state.countriesDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);

  if (!countryDetail.id) {
    return <div>Estamos buscando el pais</div>;
  }

  return (
    <div className={style.fondo}>
      <div className={style.contenedor}>
        <div>
          <img
            className={style.imagen}
            width="20%"
            src={countryDetail.flags}
            alt="No Found"
          />
          <div className={style.country}>
            <h1 className={style.name}>Name: {countryDetail.name}</h1>
          </div>
          <div className={style.card}>
            <h1 className={style.name}>Codigo: {countryDetail.id}</h1>
            <h1 className={style.name}>
              Continente: {countryDetail.continents}
            </h1>
            <h2 className={style.name}>Capital: {countryDetail.capital}</h2>
          </div>
          <div className={style.card2}>
            <h3 className={style.name}>Subregion: {countryDetail.subregion}</h3>
            <h1 className={style.name}>Area: {countryDetail.area} km2</h1>
            <h1 className={style.name}>
              Poblacion: {countryDetail.population}
            </h1>
          </div>
          {countryDetail.activities.length > 0 ? (
            <div>
              <h1 className={style.titulo}>Actividades Turisticas</h1>
              {countryDetail.activities?.map((act) => {
                return (
                  <ActivityDetails
                    key={act.name}
                    name={act.name}
                    id={act.id}
                    difficulty={act.difficulty}
                    duration={act.duration}
                    season={act.season}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsCountry;
