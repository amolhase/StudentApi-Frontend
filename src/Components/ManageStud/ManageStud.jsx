import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
export const ManageStud = () => {

    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [department, setDepartment] = useState();
    const [sclass, setSClass] = useState();
    const [id, setId] = useState();
    const [search, setSearch] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const getUser = () => {
        axios.get('http://localhost:8080/student/findAllStudent')
            .then(res => setUser(res.data));
    }
    useEffect(() => {
        getUser();
    }, [user])

    // useEffect(() => { setUser(students) }, []);
    let count = 0;
    const navigate = useNavigate();

    const handleEdit = (user, id) => {
        setName(user.sname);
        setAge(user.age);
        setDepartment(user.section);
        setSClass(user.sclass);
        handleClickOpen();
        setId(user.sid);
        // console.log(user);
    }
    const handleChangeStudent = () => {

        axios.put('http://localhost:8080/student/updateStudent', {
            sid: id,
            sname: name,
            age: age,
            sclass: sclass,
            section: department,
        })
        console.log({
            sid: id,
            sname: name,
            age: age,
            sclass: sclass,
            section: department,
        })
        handleClose();

        // students[id].sname = name;
        // students[id].age = age;
        // students[id].sclass = sclass;
        // students[id].section = department;
        // console.log(students[id])

    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/student/deleteStudentInfo/${id}`,
            {
                sid: id
            })
    }

    return (
        <div>
            <Container>
                <Typography variant='h1' gutterBottom />
                <Stack sx={{ position: "relative" }} spacing={2} direction="row">
                    <Button variant="contained" onClick={() => navigate('/addStud')}>Add User</Button>
                    <Button variant="contained" onClick={() => navigate('/adminHome/marksTable')}>Student Marks</Button>
                    <Button variant="outlined" onClick={() => navigate('/adminHome')}>Back to Home</Button>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Search"
                        placeholder='Search Name, Department, Class'
                        sx={{ float: 'right', position: 'absolute', right: "50px" }}
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
                </Stack>
                <Typography variant='h1' gutterBottom />
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='left'>A.N</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align='left'>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="left">Department</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="left">Class</TableCell>
                                    <TableCell colSpan={2} sx={{ fontWeight: 'bold' }} align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user ? user.filter((user) => {
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
                                }).map((user, index) => {
                                    return (<TableRow
                                        key={index}
                                        sx={{ '&:nth-of-type, &:nth-of-type th': { border: 0 }, '&:nth-of-type(odd) td': { backgroundColor: '#d4d4d4' } }}
                                    >
                                        <TableCell align="left">{++count}</TableCell>
                                        <TableCell align="left">{user.sname}</TableCell>
                                        <TableCell align="left">{user.section}</TableCell>
                                        <TableCell align="left">{user.sclass}</TableCell>
                                        <TableCell align="left"><Button variant='text' onClick={() => handleEdit(user, index)}>Edit</Button></TableCell>
                                        <TableCell align="left"><Button variant='text' onClick={() => handleDelete(user.sid)}>DELETE</Button></TableCell>
                                    </TableRow>);
                                }) : <tr><td>User Not Found</td></tr>}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Student Data</DialogTitle>
                <DialogContent>
                    <Box

                        noValidate
                        autoComplete="off"
                    >
                        <form method='PUT' style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: "15px"
                        }}>
                            <Typography />
                            <TextField id="filled-basic" value={name} onChange={(e) => setName(e.target.value)} label="Name" variant="filled" required />
                            <TextField id="filled-basic" value={age} onChange={(e) => setAge(e.target.value)} label="Age" variant="filled" required />
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
                        </form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleChangeStudent}>Change</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}