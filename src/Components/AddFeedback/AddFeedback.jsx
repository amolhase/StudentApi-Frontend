import Container from '@mui/material/Container';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import style from './AddFeedback.module.css'
import { json, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
export const AddFeedback = () => {
    const navigate = useNavigate();
    const [feedback, setFeddback] = useState();
    const stud = JSON.parse(localStorage.getItem('payload'));
    const postFeedback = () => {
        console.log('feedback send')
        const feed = {
            fid: Number(`${new Date().getMilliseconds()}` + 12),
            sid: stud.sid,
            feed: feedback,
        }

        axios.post("http://localhost:8080/feedback/GiveFeedback",feed)
        alert('your feedback successfully stored');
        navigate(`/home/${stud.sid}`);


    };
    return (
        <Container>
            <div className={style.container}>
                <div className={style.centerDiv}>
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#d6d6d4',
                            width: '400px',
                            height: 'auto',
                            padding: '40px',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography />
                        <Typography variant='h5'>Feedback</Typography>
                        <form onSubmit={postFeedback} style={{
                            display: 'flex', flexDirection: 'column', gap: '15px'
                        }}>
                            <TextField className={style.textfield} type='textArea' multiline maxRows={4} id="filled-basic" onChange={(e) => setFeddback(e.target.value)} label="Feedback" variant="filled" required />
                            <Button className={style.button} type='submit' variant="contained">send</Button>
                            <Button className={style.button} onClick={() => navigate(`/home/${stud.sid}`)} variant="outlined">Cancel</Button>
                        </form>
                        <Typography />
                    </Box>
                </div>
            </div>
        </Container>
    );
};