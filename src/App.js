import  {useState, useEffect} from 'react'
import axios from 'axios';

import './App.css';

function App() {
  const [link, setLink] = useState('')
  const [loader, setLoader] = useState(false);
  const [eror, setError] = useState('')

  useEffect(()=>{
    link&&setError('')
  }, [link])
  
  const onSubmit = async(e)=>{
    e.preventDefault();
    if(link){
      setLoader(true)
      try {
        const res = await axios.get(
          'http://localhost:5000/screenshot',
          {
            params: {
              url: link
            }
          }
        );
        console.log('response', res)
      } catch (error) {
        setError(error.message)
        console.log(error)
      }
      setLoader(false)
      setLink('')
    }else{
      setError('Поле ссылка не может быть пустым')
    }
   
   
  }

  return (
    <div className='wrapper'>
    
        
        <form onSubmit={onSubmit} className='form'>
        {loader&&<div>Идет извлечение текста из изображения...</div>}
        {eror&&<div>{eror}</div>}
          <label>Укажите ссылку на изображение</label>
          <input type='text' value={link} onChange={(e)=>setLink(e.target.value)} placeholder={'https://ya.ru/'}/>
          <button type='onSubmit'>Извлечь текст</button>
        </form>
    </div>
  );
}

export default App;
