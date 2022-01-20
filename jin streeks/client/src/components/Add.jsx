import React, {useState} from 'react';
import { makeStyles, FormGroup, FormControl, InputLabel, Input, Button} from '@material-ui/core';
import { postStreek } from '../service/api';
import { useNavigate } from 'react-router-dom';

export default function Add() {

    const classes = useStyles();

    const nextday = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const today = new Date(new Date().getTime());

    const navigate = useNavigate();

    const initial = {
        name : "",
        time : 0,
        current : 0,
        done : false,
        foreverDone: false,
        streekDay:`${today.getDate()}${today.getMonth()}${today.getFullYear()}`,
        streekNextDay:`${nextday.getDate()}${nextday.getMonth()}${nextday.getFullYear()}`
    }

    const [data, setData] = useState(initial);

    const {name, time, current, done, foreverDone,streekDay,streekNextDay} = data;

    const insertData = (e)=>{
        setData({...data, [e.target.name]: e.target.value});
    }

    const insertNumData = (e)=>{
        setData({...data, [e.target.name]: parseInt(e.target.value)});
    }
    
    const addStreek = async ()=>{
        
        await postStreek(data);
        navigate("/");
        navigate("/streeks");
        // window.location.reload();
    }

    return (
        <>
            
            <FormGroup className={classes.formContainer}>
                    <FormControl className={classes.formBox}>
                        <InputLabel color="secondary" className={classes.formLabel}>Streek Name</InputLabel>
                        <Input color="secondary" onChange={(e)=>insertData(e)} name="name" value={name} className={classes.formInput}/>
                    </FormControl>
                    <FormControl className={classes.formBox}>
                        <InputLabel color="secondary" className={classes.formLabel}>Duration</InputLabel>
                        <Input color="secondary" onChange={(e)=>insertNumData(e)} name="time" type="number" placeholder="Nuber of Days" className={classes.formInput}/>
                    </FormControl>
            </FormGroup>
            <Button variant="contained" className={classes.formButton} onClick={()=>addStreek()}>Add Streek</Button>

        </>
    )
}

const useStyles = makeStyles(theme=>({
    
    formContainer:{
        width:"60vw",
        [theme.breakpoints.down("xs")]:{
            width:"90vw",
            margin:"auto",
        }
    },
    formBox:{
        borderBottom:"1px solid white",
        marginBottom:10,
        [theme.breakpoints.down("xs")]:{
            marginBottom:5,
        }
    },
    formLabel:{
        color:"gray",
    },
    formInput:{
        color:"#fff",
    },
    formButton:{
        [theme.breakpoints.down("xs")]:{
            width:"90vw",
            margin:"auto"
        },
        margin:"0 20px",
        fontSize:16,
        fontWeight:800,
    },
}));