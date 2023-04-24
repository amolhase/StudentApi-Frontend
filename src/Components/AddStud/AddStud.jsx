import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import style from './AddStud.module.css'
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { students } from '../../DummyData/students';

export const AddStud = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [department, setDepartment] = useState("");
    const [sclass, setSClass] = useState("");

    const getData = () => {
        axios
            .post('get url for signup students', {})
    };

    const postStudent = (e) => {
        e.preventDefault();
        const id = Number(`${new Date().getMilliseconds()}` + 5);
        axios.post("http://localhost:8080/student/storeStudent",
        {
            "sid":id,
            "email":email,
            "password" : password,
            "sname" : name,
            "age":age,
            "sclass":sclass,
            "section":department
        })
        .then(response => setUser(response.data))
        alert('Student Registerd')
        navigate('/adminHome/manageStudents')
    };



    return (
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
                        gap: '20px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <form method='POST' onSubmit={postStudent} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: "15px"
                    }}>
                        <Typography />
                        <TextField className={style.textfield} id="filled-basic" onChange={(e) => setName(e.target.value)} label="Name" variant="filled" required />
                        <TextField className={style.textfield} id="filled-basic" onChange={(e) => setAge(e.target.value)} label="Age" variant="filled" required />
                        <TextField className={style.textfield} id="filled-basic" onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" required />
                        <TextField className={style.textfield} id="filled-basic" type='password' onChange={(e) => setPassword(e.target.value)} label="Password" variant="filled" required />
                        <TextField className={style.textfield} id="filled-basic" type='password' onChange={(e) => setRePassword(e.target.value)} label="Re-Password" variant="filled" required />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Department *</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={department}
                                label="Department"
                                onChange={(e) => { setDepartment(e.target.value) }}
                                required
                            >
                                <MenuItem value={'arts'}>Arts</MenuItem>
                                <MenuItem value={'commerce'}>Commerce</MenuItem>
                                <MenuItem value={'science'}>Science</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Class *</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sclass}
                                label="Class"
                                onChange={(e) => { setSClass(e.target.value) }}
                                required
                            >
                                <MenuItem required value={'ba'}>BA</MenuItem>
                                <MenuItem value={'bcom'}>BCom</MenuItem>
                                <MenuItem value={'bsc'}>BSc</MenuItem>
                            </Select>
                        </FormControl>
                        <Button className={style.button} type='submit' variant="contained">Add Student</Button>
                        <Button variant="outlined" sx={{}} onClick={() => navigate('/adminHome')}>Cancel</Button>
                        <Typography />
                    </form>
                </Box>
            </div>
        </div>
    );
}