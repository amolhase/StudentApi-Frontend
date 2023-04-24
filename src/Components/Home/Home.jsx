
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Grid, TextField } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Home.module.css'
// import { marks } from '../../DummyData/marks';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export const Home = () => {
    const [mark, setMark] = useState();
    const stud = JSON.parse(localStorage.getItem('payload'));
    const navigate = useNavigate();
    const params = useParams();
    console.log(stud);
    console.log(params.id);



    // axios.get('http://localhost:8080/marks/getAllStudentsMarks')
    // .then(res => setMark(res.data));
    console.log('marks', mark)
    const getMark = () => {
        axios.get(`http://localhost:8080/marks/getMarksBySid/${params.id}`)
            .then(res => setMark(res.data));
    }
    // console.log("marks ", mark);

    useEffect(() => {
        getMark();
    });
    const markPayload = mark;

    return (<div>
        <Box sx={{ flexGrow: 1, position: "relative" }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography sx={{ flexGrow: 3 }} variant="h6" component="div" >
                        {stud.sname}
                    </Typography>
                    <div style={{
                        display:'flex',
                        gap:"20px"
                    }}>
                        <Typography sx={{ cursor: 'pointer', flexGrow: 20 }} onClick={() => navigate('/send/feedback')} variant="h6" component="div" >
                            Send Feedback
                        </Typography>
                        <Typography sx={{ cursor: 'pointer', flexGrow: 20 }} onClick={() => {
                            localStorage.clear();
                            navigate('/');
                        }} variant="h6" component="div" >
                            Log out
                        </Typography></div>
                </Toolbar>
            </AppBar>
        </Box>
        <Container sx={{ margin: "15px", position: 'absolute', left: '50%', transform: 'translate(-50%)', borderRadius: '10px', backgroundColor: '#d4d4d4', padding: '25px' }}>
            <Typography variant='h2' gutterBottom />
            <div>

                <Typography variant='h2' gutterBottom />
                <Typography variant='h5' >Your Information</Typography>
                <Typography variant='h2' gutterBottom />
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            value={stud.sid}
                            // variant="standard"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            InputLabelProps={{
                                style: {
                                    // color: "blue",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                },
                            }}
                            value={stud.sname}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            // variant="standard"
                            value={stud.email}
                            disabled
                        // disabled
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            type={"text"}
                            // variant="standard"
                            value={stud.age}
                            disabled
                        // disabled
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            value={stud.sclass}
                            // variant="standard"

                            disabled
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            type="text"
                            value={stud.section}
                            disabled
                        // variant="standard"
                        />
                    </Grid>
                </Grid>
                <Typography variant='h1' gutterBottom />
            </div>
            <hr />
            {mark ? <div>

                <Typography variant='h2' gutterBottom />
                <Typography variant='h5' >Your Result of this semister</Typography>
                <Typography variant='h2' gutterBottom />
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            defaultValue={markPayload.marathi}
                            label={'Marathi'}
                            // variant="standard"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            InputLabelProps={{
                                style: {
                                    // color: "blue",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                },
                            }}
                            defaultValue={markPayload.eng}
                            label={'English'}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            // variant="standard"
                            defaultValue={markPayload.math}
                            label={'Mathematics'}
                            disabled
                        // disabled
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            type={"text"}
                            // variant="standard"
                            defaultValue={markPayload.science}
                            label={'Science'}
                            disabled
                        // disabled
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            defaultValue={markPayload.social}
                            label={'Social Science'}
                            // variant="standard"

                            disabled
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            type="text"
                            defaultValue={markPayload.totalMarks}
                            label={'Total Marks'}
                            disabled
                        // variant="standard"
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            className={styles.input}
                            type="text"
                            defaultValue={markPayload.grade}
                            label={'Grade'}
                            disabled
                        // variant="standard"
                        />
                    </Grid>
                </Grid>
            </div> : <h2>Your marks are not enterd yet</h2>}

        </Container>
    </div>);
}