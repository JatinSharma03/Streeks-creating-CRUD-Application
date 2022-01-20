import React, {useEffect, useState} from 'react';
import {Box, makeStyles, FormGroup, FormControl, InputLabel, Input, Button} from '@material-ui/core';
import {useNavigate, useParams} from 'react-router-dom';
import {getStreek, editStreek} from '../service/api';

export default function Edit({changeIcon}) {

    const classes = useStyles();
    const today = new Date();

    const {id} = useParams();
    const navigate = useNavigate();

    const initial = {
        name:"",
        time:"",
        current:0,
        done:false,
        foreverDone: false,
        streekDay:``,
        streekNextDay:``
    }

    const [data, setData] = useState(initial);
    
    const {name, time, current, done, foreverDone,streekDay,streekNextDay} = data;

    useEffect(()=>{
        getStreekData();
        changeIcon("backToAdd");
    },[]);

    const getStreekData = async ()=>{
        const response = await getStreek(id);
        if(response){
            setData(response.data);
        }
    }

    const modifyData = (e)=>{
        setData({...data, [e.target.name]:e.target.value});
    }

    const modifyNumData = (e)=>{
        setData({...data, [e.target.name]: parseInt(e.target.value)});
    }

    const editStreekfun = async ()=>{
        await editStreek(data,id);
        navigate("/streeks");
    }

    return (
        <Box  className={classes.container}>
            
            <FormGroup className={classes.formContainer}>
                    <FormControl className={classes.formBox}>
                        <InputLabel color="secondary" className={classes.formLabel}>Streek Name</InputLabel>
                        <Input color="secondary" onChange={(e)=>{modifyData(e)}} name="name" value={name} className={classes.formInput}/>
                    </FormControl>
                    <FormControl className={classes.formBox}>
                        <InputLabel color="secondary" className={classes.formLabel}>Duration</InputLabel>
                        <Input color="secondary" onChange={(e)=>{modifyNumData(e)}} name="time" value={time} type="number" placeholder="No. of Days" className={classes.formInput}/>
                    </FormControl>
            </FormGroup>
            <Button variant="contained" onClick={()=>editStreekfun()} className={classes.formButton}>Edit Streek</Button>

        </Box>
    )
}

const useStyles = makeStyles(theme=>({
    
    container:{
        display:"flex",
        justifyContent:"center",
        paddingTop:150,
        flexDirection:"column"
    },
    formContainer:{
        width:"90vw",
        margin:"auto",
        [theme.breakpoints.down("xs")]:{
            width:"90vw",
        }
    },
    formBox:{
        borderBottom:"1px solid white",
        marginBottom:20,
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
        margin:"30px 20px",
        fontSize:20,
        fontWeight:700,
    },
}));