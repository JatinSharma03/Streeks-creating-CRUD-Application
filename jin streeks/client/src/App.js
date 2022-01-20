import React, {useState,useEffect} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Streeks from './components/Streeks';
import None from './components/None';
import Edit from './components/Edit';

import { validate } from './service/Validation';
import {makeStyles, Box} from '@material-ui/core';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Completed from './components/Completed';

function App() {

  const classes = useStyles();

  useEffect(()=>{
    callValidate();
  },[])

  const callValidate = async ()=>{
    await validate();
  }
  const [icon, setIcon] = useState("");

  const changeIcon = (icon)=>{
    setIcon(icon);
  }

  return (
    <Box className={classes.container}>
      <BrowserRouter>
        <Header icon={icon}/>
        <Routes>
          <Route path="/" exact element={<Home changeIcon={changeIcon}/>}/>
          <Route path="/streeks" exact element={<Streeks changeIcon={changeIcon}/>}/>
          <Route path="/edit/:id" exact element={<Edit changeIcon={changeIcon}/>}/>
          <Route path="/completed" exact element={<Completed changeIcon={changeIcon}/>}/>
          <Route path="*" exact element={<None changeIcon={changeIcon}/>}/>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

const useStyles = makeStyles({
  container:{
    backgroundColor:"#000",
    width:"100vw",
    height:"100vh",
  },
});

export default App;
  