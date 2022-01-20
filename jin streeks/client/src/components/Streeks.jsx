import React, {useEffect, useState} from 'react';
import {Box, makeStyles, Grid, Button} from '@material-ui/core';
import { getStreek, deleteStreek } from '../service/api';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from '../service/Validation';

import CardBox from './Card';
import Add from './Add';

export default function Streeks({changeIcon}) {

    const classes = useStyles();
    const navigate = useNavigate();

    const [streek, setStreek] = useState([])

    const streeksFun = async ()=>{
        const response = await getStreek();
        if(response){
            setStreek(response.data);
        }
    }

    const deleteStreekfun = async (id)=>{
        await deleteStreek(id);
        // navigate("/streeks");
        streeksFun();

    }

    useEffect(()=>{
        callValidate();
        changeIcon("back");
        streeksFun();
    },[]);

    const callValidate = async ()=>{
        await validate();
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.firstContainer}>
                <Add/>
            </Box>
            {/* <Edit/> */}
            <Box className={classes.secondContainer}>
                <Grid container className={classes.cards}>
                    {
                        streek?streek.length>0 && streek.map((item)=>(
                            item.foreverDone === false?
                            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.card}>
                                <CardBox data={item}/>
                                <Button className={classes.editIcon} component={Link} to={`/edit/${item._id}`}><EditIcon style={{fontSize:30}}/></Button>
                                <Button  className={classes.deleteIcon} onClick={()=>deleteStreekfun(item._id)}><DeleteForeverIcon style={{fontSize:30}}/></Button>
                            </Grid>
                            :
                            null
                        )):null
                    }
                </Grid>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles(theme=>({
    container:{
        height:"100vh",
        overflowY:"scroll",
    },
    firstContainer:{
        display:"flex",
        justifyContent:"center",
        boxShadow:"0 0 20px white",
        paddingTop:90,
        paddingBottom:10,
        [theme.breakpoints.down("xs")]:{
            flexDirection:"column",
            paddingTop:84,
        }
    },
    secondContainer:{
        margin:10
    },
    card:{
        padding:10,
        position:"relative",
    },
    editIcon:{
        position:"absolute",
        top:0,
        marginTop:10,
    },
    deleteIcon:{
        position:"absolute",
        top:0,
        right:0,
        marginTop:10,
        marginRight:10,
    }
}));