import { useEffect, useState } from "react";
import axios from 'axios';

import Pais from "./pais";

const App = () => {
  console.log('primer log(antes de las variables de estado)');
  const [pais, setPais] = useState('');
  const [paises, setPaises] = useState([]);
  const [climate, setClimate] = useState('');
  console.log('segundo log(antes del useEffect de paises)');
  useEffect(() => {
    const API_KEY = 'b7cce1744815b8740ed83005afed4ccc';
    if (paises.length === 1) {
      const capital = paises[0].capital[0];
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`)
       .then((response) => {
        // console.log(response.data)
       setClimate(response.data)
      })
    }
  }, [paises]) 
      
  // if(climate){
  //   console.log(climate.main.temp, 'clima');
  // }
      
  //3 si pais no viene vacio, hace una solicitud para obtener los paises
  useEffect(() => {
    if (pais !== '') {
      axios
        .get('https://restcountries.com/v3/name/' + pais)
        .then((response) => {
          //4 configura a paises guardando todos los paises encontrados
          setPaises(response.data);
          console.log(response.data);
        });
    }
    //se ejecuta cada vez que el pais cambie
  }, [pais]);
  console.log('tercer log(depues del useEffect de pais)');
  return (
    //1 se pinta por primera vez el input
    <> 
      <h1>React App</h1>
      <input //2 confugura el pais con lo que ingreso el usuario en la segunda renderizada y lo guarda en pais
        onChange={(event) => {
          setPais(event.target.value);
        }}
        type="text"
      />
      <div>
        {paises.length > 10 ? (
          <p>Demasiados paises</p>
        ) : paises.length === 1 ? (
          <>
            <h2>{paises[0].name.common}</h2>
            <p>Capital: {paises[0].capital[0]}</p>
            <p>Area: {paises[0].area}</p>
            <p>Idioma(s): {Object.values(paises[0].languages)[0]}</p>
            <img
              src={paises[0].flags[0]}
              alt="flag"
              style={{ maxWidth: '100px' }}
            />
            <p>Temperatura: {climate ? climate.main.temp: 'temperatura no disponible'}</p>
          </>
        ) : (
          paises.map((pais) => <div key={pais.name.common}>
          <p>{pais.name.common}</p> <Pais pais={pais}/> </div>)
        )}
      </div>
      
    </>
  );
};

export default App;
