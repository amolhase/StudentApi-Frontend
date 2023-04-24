import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import style from './Login.module.css'
import { json, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { students } from '../../DummyData/students';

export const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const getData = () => {
        axios
            .get('get url for login api')
            .then(data => setUser(data.data))
            .catch(error => console.log(error));
    };
    localStorage.clear();

    const getLogin = () => {
        console.log(email, password);
        const payload = user.find((user) => user.email === email && user.password === password);
        console.log(payload);
        if(email==='admin@admin.com' && password === 'Admin@1234'){
            navigate('/adminHome');
        }
        else if (email === user.email && password === user.password) {
            navigate('/adminHome')
        } else if (payload) {
            alert('user login successfully');
            localStorage.setItem('payload', JSON.stringify(payload));
            navigate(`/home/${payload.sid}`);
        } else {
            alert('user not found');
        }
    };

    const getUserData = () => {
        axios.get('http://localhost:8080/student/findAllStudent')
            .then(res => setUser(res.data));
    }

    useEffect(() => {
        // getData();  uncomment this-----------------------------
        //setUser(students)
        getUserData();
    }, []);
    console.log('user', user);
    return (
        <div className={style.container}>
            <div className={style.centerDiv}>
                <Box
                    component="form"
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
                    <TextField className={style.textfield} id="filled-basic" onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" />
                    <TextField className={style.textfield} id="filled-basic" onChange={(e) => setPassword(e.target.value)} type='password' label="Password" variant="filled" />
                    <Button className={style.button} onClick={getLogin} variant="contained">Login</Button>
                    <Typography />
                </Box>
            </div>
        </div>);
}