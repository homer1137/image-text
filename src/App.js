import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [link, setLink] = useState("");
  const [loader, setLoader] = useState(false);
  const [eror, setError] = useState("");

  useEffect(() => {
    link && setError("");
  }, [link]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (link) {
      setLoader(true);
      try {
        const res = await axios.get("http://localhost:5000/screenshot", {
          params: {
            url: link,
          },
        });
        console.log("response", res);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
      setLoader(false);
      setLink("");
    } else {
      setError("Поле ссылка не может быть пустым");
    }
  };

  const onSubmit2 = async (e, number) => {
    e.preventDefault();
    
      setLoader(true);
      try {
        const res = await axios.get(`http://localhost:5000/screenshot${number}`);
        console.log("response", res);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
      setLoader(false);
      setLink("");
   
  };

  return (
    <div className="wrapper">
    {loader && <div>Идет извлечение текста из изображения...</div>}
        {eror && <div>{eror}</div>}
      <form onSubmit={onSubmit} className="form">
        
        <label>Скрин окна браузера по сылке</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder={"https://ya.ru/"}
        />
        <button type="onSubmit">Извлечь текст</button>
      </form>
      <form onSubmit={(e)=>onSubmit2(e, 2)} className="form">
        
        <label>С библиотекой - скрин экрана (linux, windows)</label>
    
        <button type="onSubmit">Извлечь текст</button>
      </form>
      <form onSubmit={(e)=>onSubmit2(e, 3)} className="form">
        
        <label>скрин экрана (linux)</label>
    
        <button type="onSubmit">Извлечь текст</button>
      </form>
    </div>
  );
}

export default App;
