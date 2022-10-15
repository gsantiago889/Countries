import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivity } from "../store/actions/index";
import style from "./activitiesDetail.css";

const ActivityDetails = ({ name, difficulty, duration, season }) => {
  const touristActivity = useSelector((state) => state.touristActivity);
  // const countryDetail = useSelector(state => state.countriesDetail)

  const dispatch = useDispatch();

  useEffect(() => {
    if (touristActivity.length === 0) {
      dispatch(getActivity());
    }
  });

  return (
    <div className={style.Activities}>
      <p className={style.titulo}>Nombre de la actividad: {name} </p>
      <p className={style.titulo}>Dificultad: {difficulty} </p>
      <p className={style.titulo}>Duracion: {duration} </p>
      <p className={style.titulo}>Temporada: {season} </p>
      {/* <p>{countryDetail.id}</p> */}
    </div>
  );
};

export default ActivityDetails;
