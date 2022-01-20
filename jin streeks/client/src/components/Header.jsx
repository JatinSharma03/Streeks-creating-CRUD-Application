import React, {useEffect, useState} from 'react';

import {Box, makeStyles,AppBar, Toolbar, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { NavLink } from 'react-router-dom';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

export default function Header({icon}) {

    const classes = useStyles();

    const [iconType, setIconType] = useState("add")

    useEffect(()=>{
        setIconType(icon);
    },[icon]);

    return (
        <Box>
            <AppBar className={classes.container}>
                <Toolbar>
                    <Box>
                        <Typography className={classes.text} variant="h4">Jin Streeks <DoubleArrowIcon/></Typography>
                    </Box>
                    {
                        iconType == "add"?
                        <NavLink to="streeks" className={classes.add}>
                            <AddIcon className={classes.addIcon}/>
                        </NavLink>
                        :
                        iconType == "backToAdd"?
                        <NavLink to="streeks" className={classes.add}>
                            <BackspaceOutlinedIcon className={classes.addIcon}/>
                        </NavLink>
                        :
                        <NavLink to="/" className={classes.add}>
                            <BackspaceOutlinedIcon className={classes.addIcon}/>
                        </NavLink>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

const useStyles = makeStyles(theme=>({
    container:{
        backgroundColor:"#000",
        height:75,
        boxShadow:"0 0 20px white",
    },
    text:{
        fontWeight:500,
        margin:20
    },
    add:{
        position:"fixed",
        top:"80%",
        left:"80%",
        backgroundColor:"#fff",
        color:"#000",
        borderRadius:10,
        // border:"1px solid black",
        boxShadow:"0 0 20px white",
        cursor:"pointer",
        [theme.breakpoints.down("xs")]:{
            top:"80%",
            left:"70%",
        },
        "&:hover":{
            boxShadow:"none"
        }
    },
    addIcon:{
        fontSize:60,
        margin:10,
        "&:hover":{
            fontSize:65,
        }
    },
}));