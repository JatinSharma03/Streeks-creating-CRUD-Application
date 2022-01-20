import React, {useEffect, useState} from 'react';
import {Box, Grid , makeStyles,Button, Typography} from '@material-ui/core';
import {getStreek, editStreek} from '../service/api';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { useNavigate, Link } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { validate } from '../service/Validation';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Countdown from 'react-countdown';

import CardBox from './Card';

export default function Home({changeIcon}) {

    const classes = useStyles();
    const Navigate = useNavigate();
        
    const today = new Date(new Date().getTime() + 24*60*60*1000);
    const nextday = new Date(new Date().getTime() + 24*60*60*1000*2);

    const timing = new Date(new Date().getTime());
    const leftTiming = 86400000-(timing.getHours()*3600*1000+timing.getMinutes()*60*1000+timing.getSeconds()*1000);

    const [streek, setStreek] = useState([]);
    const [numOfHomeStreeks, setNumOfHomeStreeks] = useState(0);
    const [numOfHomeDoneStreeks, setNumOfHomeDoneStreeks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(()=>{

        
        setNumOfHomeStreeks(0);
        setNumOfHomeDoneStreeks(0);
        changeIcon("add");
        setTimeLeft(Date.now() + leftTiming);
        callValidate();
        streekFun();

    },[]);

    const callValidate = async ()=>{
        await validate();
    }

    useEffect(()=>{
        homeTextCreateFun();
    },[streek]);

    const homeTextCreateFun = ()=>{
        streek.map((item)=>{
            if(item.foreverDone == false){
                if(item.done == false){
                    setNumOfHomeStreeks(numOfHomeStreeks =>{ return numOfHomeStreeks+1});
                }
                else if(item.done == true){
                    setNumOfHomeDoneStreeks(numOfHomeDoneStreeks => numOfHomeDoneStreeks+1);
                }
            }
        })
    }

    const streekFun = async()=>{
        const response = await getStreek();
        setNumOfHomeStreeks(0);
        setNumOfHomeDoneStreeks(0);
        if(response){
            setStreek(response.data);
        }
    }

    const doneTaskFun = async(item)=>{
        item.done = true;
        item.current += 1;
        item.streekDay = `${today.getDate()}${today.getMonth()}${today.getFullYear()}`;
        item.streekNextDay = `${nextday.getDate()}${nextday.getMonth()}${nextday.getFullYear()}`;
        await editStreek(item,item._id);
        // Navigate("/streks");
        // Navigate("/");
        streekFun();
    }

    const renderer = ({hours,minutes,seconds})=>{
        return <span>{hours} : {minutes} : {seconds}  Left !</span>;
    }

    return (
        <Box>
            
            <Box className={classes.subContainer}>
                <Button variant="contained" component={Link} to="/completed" className={classes.achiev}><CheckCircleOutlineIcon style={{fontSize:40}}/></Button>
                {
                    streek.length>0 && streek?
                    numOfHomeStreeks>0?
                    <Typography className={classes.doing}>{numOfHomeStreeks} Task Remaining <br/><Countdown date={timeLeft} renderer={renderer} /></Typography>
                    :
                    numOfHomeDoneStreeks>0?
                    <Typography className={classes.done}>Congratulation! <br/> <SentimentVerySatisfiedIcon style={{fontSize:80}}/> <br/> You have completed all the {numOfHomeDoneStreeks} Tasks</Typography>
                    :
                    <Typography className={classes.empty}>You didn't added any Task Yet <br/><SentimentVeryDissatisfiedIcon style={{fontSize:80}}/> <br/> Click on " + " button on bottom Right Corner to add Task</Typography>
                    :
                    <Typography className={classes.empty}>You didn't added any Task Yet <br/><SentimentVeryDissatisfiedIcon style={{fontSize:80}}/> <br/> Click on " + " button on bottom Right Corner to add Task</Typography>
                }
                <Grid container className={classes.cards}>
                    {
                        streek?streek.length>0 && streek.map((item)=>(
                            item.done === false && item.foreverDone === false?
                            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.card}>
                                <CardBox data={item}/>
                                <Button className={classes.icon} onClick={()=>doneTaskFun(item)}>Done? <TouchAppIcon/></Button>
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

const useStyles = makeStyles({
    
    subContainer:{
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
    doing:{
        color:"#fff",
        fontWeight:600,
        fontSize:22,
        textAlign:"center",
        margin:"5px 0"
    },
    done:{
        color:"#fff",
        fontWeight:500,
        fontSize:40,
        textAlign:"center",
        margin:"100px 10px 10px 0",
    },
    empty:{
        color:"#fff",
        fontWeight:500,
        fontSize:30,
        textAlign:"center",
        margin:"90px 10px 10px 0",
    },
    achiev:{
        position:"absolute",
        top:10,
        right:10,
        zIndex:1200,
        backgroundColor:"white"
    }
});