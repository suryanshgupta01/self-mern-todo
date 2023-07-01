import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Landingpage from './pages/Landingpage';
import Description from './pages/Description';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {
  const [id, setid] = useState(0);
  const [data, setdata] = useState(null);
  const [info, setInfo] = useState(null);
  function getID(data, id) {
    setid(id)
    setdata(data)
  }

  useEffect(() => {
    const infoFromStorage = JSON.parse(localStorage.getItem('userinfo'));
    console.log('info', infoFromStorage);
    setInfo(infoFromStorage);
  },[]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={info ? <Landingpage getID={getID} /> : <Navigate to="/login" />} exact />
          <Route path='/login' element={!info ? <Login /> : <Navigate to="/" />} exact />
          <Route path='/signup' element={!info ? <Signup /> : <Navigate to="/" />} exact />
          <Route path='/description' element={<Description ID={id} data1={data} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
