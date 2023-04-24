import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import { students } from '../../DummyData/students';
//import { marks } from '../../DummyData/marks';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
export const MarksTable = () => {
    const [open, setOpen] = useState(false);
    const [mark, setMark] = useState();
    const [student, setStudents] = useState();
    const [mid, setMid] = useState();
    const [marathi, setMarathi] = useState();
    const [english, setEnglish] = useState();
    const [math, setMath] = useState();
    const [science, setScience] = useState();
    const [social, setSocial] = useState();
    let studentName;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const getMark = () => {
        axios.get('http://localhost:8080/marks/getAllStudentsMarks')
            .then(res => setMark(res.data));
    }

    const getUser = () => {
        axios.get('http://localhost:8080/student/findAllStudent')
            .then(res => setStudents(res.data));
    }

    const handleStudentMarks = () => {

        axios.put('http://localhost:8080/marks/updateMarks', {
            mid: mid,
            marathi: marathi,
            eng: english,
            math: math,
            science: science,
            social: social,
        })
        handleClose();
    }

    // const handleStudentMarks = () => {
    //     handleClose();
    // }

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        getMark();

    }, [])
    useEffect(() => {
        getUser();
    }, [])
    console.log('student', student);
    console.log(mark);
    console.log(student);
    const navigate = useNavigate();
    const handleEdit = (mark, index) => {
        setMid(mark.mid)
        setMarathi(mark.marathi)
        setEnglish(mark.eng)
        setMath(mark.math)
        setScience(mark.science)
        setSocial(mark.social)
        handleClickOpen();
    }
    return (
        <Container>
            <Typography variant='h1' gutterBottom />
            <Typography variant='h5'> All Student Marks Here</Typography>
            <Typography variant='h1' gutterBottom />
            <Button variant="contained" sx={{ float: 'right', margin: '5px' }} onClick={() => navigate('/adminHome/addMarks')}>Student Marks</Button>
            <Button variant="contained" sx={{ float: 'right', margin: '5px' }} onClick={() => navigate('/adminHome')}>Back</Button>
            <Typography variant='h1' gutterBottom sx={{ width: '100%' }} />
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }} align='left'>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Marathi</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">English</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Mathematics</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Science</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Social Science</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Total Marks</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Garde</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mark ? mark.map((mark, index) => {
                                console.log(student,mark)
                                if(student !== undefined){
                                  studentName = student.find((stud) => stud.sid === mark.sid)
                                }
                                
                                console.log(studentName,"check")
                                // console.log("Student Name --> ",studentName)
                                // axios.get(`http://localhost:8080/student/findStudentById/${mark.sid}`)
                                //     .then(res => console.log(res.data,"studentData"));
                                
                                return (<TableRow
                                    key={index}
                                    sx={{ '&:nth-of-type, &:nth-of-type th': { border: 0 }, '&:nth-of-type(odd) td': { backgroundColor: '#d4d4d4' } }}
                                >
                                    <TableCell align="left">{studentName?.sname}</TableCell>
                                    <TableCell align="left">{mark.marathi}</TableCell>
                                    <TableCell align="left">{mark.eng}</TableCell>
                                    <TableCell align="left">{mark.math}</TableCell>
                                    <TableCell align="left">{mark.science}</TableCell>
                                    <TableCell align="left">{mark.social}</TableCell>
                                    <TableCell align="left">{mark.totalMarks}</TableCell>
                                    <TableCell align="left">{mark.grade}</TableCell>
                                    <TableCell align="left"><Button align="left" onClick={() => handleEdit(mark, index)}>Edit</Button></TableCell>
                                </TableRow>);
                            }) : <tr><td>Mark Not Enterd yet</td></tr>}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
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
                            <TextField onChange={(e) => setMarathi(e.target.value)} id="filled-basic" value={marathi} label="Marathi" variant="filled" required />
                            <TextField onChange={(e) => setEnglish(e.target.value)} id="filled-basic" value={english} label="English" variant="filled" required />
                            <TextField onChange={(e) => setMath(e.target.value)} id="filled-basic" value={math} label="Mathematics" variant="filled" required />
                            <TextField onChange={(e) => setScience(e.target.value)} id="filled-basic" value={science} label="Science" variant="filled" required />
                            <TextField onChange={(e) => setSocial(e.target.value)} id="filled-basic" value={social} label="Social Science" variant="filled" required />
                        </form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleStudentMarks} >Change</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};