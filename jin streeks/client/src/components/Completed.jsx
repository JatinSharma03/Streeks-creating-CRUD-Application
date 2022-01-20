import React, {useEffect, useState} from 'react';
import {Box, makeStyles, Grid, Button} from '@material-ui/core';
import { getStreek } from '../service/api';
import FlashOnIcon from '@material-ui/icons/FlashOn';

import CardBox from './Card';

export default function Completed({changeIcon}) {

    const classes = useStyles();

    const [streek, setStreek] = useState([]);

    useEffect(()=>{
        changeIcon("back");
        streekFun()
    },[]);
    
    const streekFun = async()=>{
        const response = await getStreek();
        if(response){
            setStreek(response.data);
        }
    }

    return (
        <Box className={classes.container}>
            
                <Grid container className={classes.cards}>
                    {
                        streek?streek.length>0 && streek.map((item)=>(
                            item.foreverDone === true?
                            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.card}>
                                <CardBox data={item}/>
                                <Button className={classes.icon}>Achievement <FlashOnIcon/></Button>
                            </Grid>
                            :
                            null

                        )):null
                    }
                </Grid>
        </Box>
    )
}

const useStyles = makeStyles({
    container:{
        paddingTop:85,
    },
    card:{
        padding:10,
        position:"relative",
    },
    icon:{
        position:"absolute",
        top:5,
        left:0,
        width:"100%",
        fontWeight:900,
        color:"gray"
    },
});