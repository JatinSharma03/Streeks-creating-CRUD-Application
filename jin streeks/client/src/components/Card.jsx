import React, {} from 'react';
import {Typography, Box, makeStyles, Card, CardContent} from '@material-ui/core';

export default function CardBox({data}) {

    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Card>
                <CardContent className={classes.box}>
                    <Typography className={classes.time}>{data.current} Days</Typography>
                    <hr />
                    <Typography className={classes.time}>{data.time} Days</Typography>
                    <Typography className={classes.name}>{data.name}</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

const useStyles = makeStyles({
    container:{
        boxShadow:"5px 5px 10px white",
    },
    box:{
        paddingTop:35,
        paddingBottom:"15px!important",
        backgroundColor:"white"
    },
    time:{
        textAlign:"center",
        fontWeight:800,
        fontSize:25,
        boxShadow:"0 0 10px black",
    },
    name:{
        height:50,
        overflowY:"scroll",
        fontWeight:500,
        fontSize:20,
        textAlign:"center",
        marginTop:5
    }
});