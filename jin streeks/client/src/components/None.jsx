import React, {useEffect} from 'react';
import {Box, makeStyles, Typography} from '@material-ui/core';

export default function None({changeIcon}) {

    const classes = useStyles();

    useEffect(()=>{
        changeIcon("back");
    },[]);

    return (
        <Box className={classes.container}>
            <Typography variant="h2" className={classes.alert}>
                <b>!Ooops</b> <br/> Page Not Found
            </Typography>
        </Box>
    )
}

const useStyles = makeStyles({
    container:{
        color:"#fff",
        position:"relative",
        top:"30vh",
        "&>*":{
            textAlign:"center",
        }
    }
});