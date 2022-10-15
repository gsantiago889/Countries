import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries } from "../store/actions/index";
import useForm from "./useForm";
import style from "./countryActivities.css";

const initialForm = {
  name: "",
  difficulty: "",
  duration: "",
  season: "",
  countries: [],
};

function validarFormulario(form) {
  let errors = {};

  if (!form.name) {
    errors.name = "You have to choose a name for your activity";
  }
  if (form.name.length > 20) {
    errors.name = "The activity cannot have more than 20 characters";
  }

  if (!/^[a-zA-Z& áéíóú]+$/.test(form.name)) {
    errors.name =
      "You cannot include numbers or special characters in your activity";
  }
  if (form.name.startsWith(" ")) {
    errors.name = " Dont input blank spaces";
  }
  if (form.name.endsWith(" ")) {
    errors.name = " Dont input blank space";
  }

  if (!form.difficulty) {
    errors.difficulty = "You must determine the level of difficulty";
  }

  if (!form.duration) {
    errors.duration = "There is no information on the duration";
  }
  if (!form.season) {
    errors.season = "There is no information about the season";
  }

  return errors;
}

const CountryActivity = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSelect,
    handleDelete,
    handleSubmit,
  } = useForm(initialForm, validarFormulario);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch, countries.length]);

  return (
    <div className={style.divMay}>
      <div className={style.contenedor}>
        <h3 className={style.titulo}>CREATE YOUR NEW ACTIVITY</h3>

        <form onSubmit={handleSubmit} className={style.formulario}>
          <div className={style.input}>
            <p className={style.input}>
              <strong>Your Activity</strong>
            </p>
            <input
              className={style.input1}
              onChange={handleChange}
              value={form.name}
              /*onBlur={handleBlur}*/ type="text"
              name="name"
              required
            ></input>
          </div>
          {errors.name && <p style={{ color: "red" }}> {errors.name} </p>}

          <div className={style.input}>
            <p>
              <strong>Difficulty</strong>
            </p>
            <select
              className={style.input2}
              onChange={handleChange}
              /*onBlur={handleBlur}*/ type="text"
              name="difficulty"
              required
            >
              <option value="Difficulty level">Difficulty level</option>
              <option value="1">1 - Very easy</option>
              <option value="2">2 - Easy</option>
              <option value="3">3 - Medium</option>
              <option value="4">4 - Hard</option>
              <option value="5">5 - Extreme</option>
            </select>
          </div>
          {errors.difficulty && (
            <p style={{ color: "red" }}>{errors.difficulty}</p>
          )}

          <div className={style.input}>
            <p>
              <strong>Duration</strong>
            </p>
            <select
              className={style.input2}
              onChange={handleChange}
              /*onBlur={handleBlur}*/ type="text"
              name="duration"
              required
            >
              <option value="Approximate time">Approximate time</option>
              <option value="30">30 min</option>
              <option value="60">60 min</option>
              <option value="90">90 min</option>
              <option value="120">120 min</option>
              <option value="2">More than 2 hours</option>
            </select>
          </div>
          {errors.duration && <p style={{ color: "red" }}>{errors.duration}</p>}

          <div className={style.input}>
            <p>
              <strong>Season</strong>
            </p>
            <select
              className={style.input2}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="season"
              required
            >
              <option value="Temporada">Season</option>
              <option value="Otoño">Autumn</option>
              <option value="Invierno">Winter</option>
              <option value="Primavera">Spring</option>
              <option value="Verano">Summer</option>
            </select>
          </div>
          {errors.season && <p style={{ color: "red" }}>{errors.season}</p>}

          <div className={style.input}>
            <label>
              <strong>Countries</strong>
            </label>
            <select className={style.input2} onChange={(e) => handleSelect(e)}>
              <option>Countries</option>
              {countries?.map((c) => {
                return (
                  <option key={c.id} /*onBlur={handleBlur}*/>{c.name}</option>
                );
              })}
            </select>
          </div>

          <br />
          <br />

          <input
            onSubmit={handleSubmit}
            className={style.Btn}
            type="submit"
            value="Create Activity"
            name="submit"
            disabled={Object.keys(errors).length === 0 ? false : true}
            required
          />
        </form>

        <div>
          {form.countries?.map((c) => (
            <ul key={c.name} className={style.lista}>
              <li>
                {c}{" "}
                <button className={style.CBut} onClick={() => handleDelete(c)}>
                  X
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryActivity;
