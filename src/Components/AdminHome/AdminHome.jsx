import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import style from './AdminHome.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import SearchIcon from '@mui/icons-material/Search';
import TableCell from '@mui/material/TableCell';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

export function AdminHome() {

    const [user, setUser] = useState();
    const [search, setSearch] = useState();

    const getUser = () => {
        axios.get('http://localhost:8080/student/findAllStudent')
            .then(res => setUser(res.data));
    }

    useEffect(() => {
        getUser();
    }, [])


    console.log(user);
    const navigate = useNavigate();
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
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
                        <Typography sx={{ cursor: 'pointer', flexGrow: 1 }} onClick={() => navigate('/adminHome/manageStudents')} variant="h6" component="div" >
                            Manage Students
                        </Typography>
                        <Typography sx={{ cursor: 'pointer', flexGrow: 20 }} onClick={() => navigate('/adminHome/feedback')} variant="h6" component="div" >
                            See Feedback
                        </Typography>
                        <Typography sx={{ cursor: 'pointer', flexGrow: 1 }} onClick={() => {
                            localStorage.clear();
                            navigate('/');
                        }} variant="h6" component="div" >
                            Log out
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <h1>Hello Admin</h1>
            <Container>
                <div style={{
                    display: 'flex',
                    justifyContent: "space-around"
                }}>
                    <Typography variant='h5'>Your all Students here</Typography>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Search"
                        placeholder='Search Name, Department, Class'
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </div>

                <Typography variant='h1' gutterBottom />
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='left'>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="left">Email</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="left">Age</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="left">Department</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="left">Class</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user ? user
                                    .filter((user) => {
                                        if (search === "") {
                                            return user;
                                        } else if (
                                            user.sname.toLowerCase().includes(search) ||
                                            user.sclass.toLowerCase().includes(search) ||
                                            user.section.toLowerCase().includes(search)
                                        ) {
                                            return user;
                                        } else if (!search) {
                                            return user;
                                        }
                                    })
                                    .map((user, index) => {
                                        return (<TableRow
                                            key={index}
                                            sx={{ '&:nth-of-type, &:nth-of-type th': { border: 0 }, '&:nth-of-type(odd) td': { backgroundColor: '#d4d4d4' } }}
                                        >
                                            <TableCell align="left">{user.sname}</TableCell>
                                            <TableCell align="left">{user.email}</TableCell>
                                            <TableCell align="left">{user.age}</TableCell>
                                            <TableCell align="left">{user.section}</TableCell>
                                            <TableCell align="left">{user.sclass}</TableCell>
                                        </TableRow>);
                                    }) : <tr><td>User Not Found</td></tr>}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
        </div>
    );
}