import { useState } from "react";

const Pais = ({ pais }) => {
  const [show, setShow] = useState(false);

  const cambio = () => {
    setShow(!show)
  }

  return (
    <>
      { !show ? (
      <h2>{pais.name.common}</h2> ) :
      <>
        <p>Capital: {pais.capital[0]}</p>
        <p>Area: {pais.area}</p>
        <p>Idioma(s): {Object.values(pais.languages)[0]}</p>
        <img src={pais.flags[0]} alt="flag" style={{ maxWidth: '100px' }} />
      </>
      
      }
      <button onClick={cambio}>Show</button>
    </>
  );
};

export default Pais;
