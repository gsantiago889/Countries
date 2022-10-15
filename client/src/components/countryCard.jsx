import { Link } from "react-router-dom";
import style from "./countryCard.css";

const CountryCard = ({ flags, name, continents, id }) => {
  return (
    <div className={style.contenedor}>
      <Link to={"/details/" + id} className={style.link}>
        <h2 className={style.h2}>{name}</h2>
        <h2 className={style.h2}>{continents}</h2>
        <img
          className={style.imagen}
          width="50%"
          height="35%"
          src={flags}
          alt="No Found"
        />
      </Link>
    </div>
  );
};

export default CountryCard;
