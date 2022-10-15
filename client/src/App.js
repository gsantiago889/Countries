import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/home";
import DetailsCountry from "./components/detailCountry";
import NavBar from "./components/navBar";
import CountryActivity from "./components/countryActivities";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={NavBar} />
      <Route path="/home" component={Home} />
      <Route path="/details/" component={NavBar} />
      <Route path="/details/:id" component={DetailsCountry} />
      <Route path="/create" component={NavBar} />
      <Route path="/create" component={CountryActivity} />
    </div>
  );
}

export default App;
