import "./navBar.css";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import { useDispatch } from "react-redux";
import { getAllCountries } from "../store/actions/index";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(getAllCountries());
  };

  return (
    <div className="contenedor">
      <Link onClick={handleOnClick} className="list" to="/home">
        Home
      </Link>
      <SearchBar />
      <Link className="listitem" to="/create">
        Create Activity
      </Link>
    </div>
  );
};

export default NavBar;
