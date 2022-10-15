import React from "react";
import "./paginado.css";

export default function Paginado({
  countriesPerPage,
  countries,
  paginado,
  currentPage,
  beforePage,
  nextPage,
}) {
  const numberOfPage = [];

  const maxPage = 1 + Math.ceil((countries - 9) / countriesPerPage);

  for (var i = 1; i <= maxPage; i++) {
    numberOfPage.push(i);
  }
  // for (let i = 1; i <= Math.ceil(countries / countriesPerPage); i++) {
  //   numberOfPage.push(i);
  // }

  return (
    <div className="padre">
      <nav className="nav">
        <ul className="ul">
          {/* <button className={currentPage === "Anterior" ? style.botonSeleccionado : style.boton} onClick={currentPage-1}>Anterior</button> */}

          {numberOfPage &&
            numberOfPage.map((numero) => (
              <li className="li" key={numero}>
                <button
                  className={
                    currentPage === numero ? "botonSeleccionado" : "boton"
                  }
                  onClick={() => paginado(numero)}
                >
                  {numero}
                </button>
              </li>
            ))}
          {/* <button className={currentPage === "Proximo" ? style.botonSeleccionado : style.boton} onClick={currentPage+1}>Proximo</button> */}
        </ul>
      </nav>
    </div>
  );
}
