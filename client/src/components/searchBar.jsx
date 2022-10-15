import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../store/actions/index";
import style from "./searchBar.css";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnChange = (e) => {
    // e.preventDefault()
    setSearch(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!search) {
        alert("you have to write something");
      } else {
        dispatch(getCountryByName(search));
        history.push("/home");
        setSearch("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          className={style.input}
          type="text"
          value={search}
          placeholder="Enter a country"
          onChange={handleOnChange}
        ></input>
        <input className={style.buscador} type="submit" value="Search"></input>
      </form>
    </div>
  );
};

export default SearchBar;
