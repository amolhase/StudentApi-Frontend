
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import style from './AddMarks.module.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
// import { students } from '../../DummyData/students';
// import { marks } from '../../DummyData/marks';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const AddMarks = () => {

    const [email, setEmail] = useState();
    const [marathi, setMarathi] = useState();
    const [english, setEnglish] = useState();
    const [math, setMath] = useState();
    const [social, setSocial] = useState();
    const [science, setScience] = useState();
    const [grade, setGrade] = useState('');
    const [student, setStudent] = useState();
    const [mark, setMark] = useState();
    const navigate = useNavigate();
    const clickHandler = (e) => {
        e.preventDefault();
        let studData = student.find((stud) => stud.email === email)
        let studentId = studData.sid;
        const marksData = {
            mid: Number(`${new Date().getMilliseconds()}` + 255 + new Date().getMilliseconds()),
            sid: studentId,
            marathi: marathi,
            eng: english,
            math: math,
            social: social,
            science: science,
            grade: grade,
            totalMarks: Number(marathi) + Number(english) + Number(math) + Number(science) + Number(social),
        };
        // console.log(marksData);
        // console.log("studentId", studentId);
        axios.post('http://localhost:8080/marks/storeMarks', marksData);
        // mark.push(marksData);
        console.log("marks array", mark);
        navigate('/adminHome/manageStudents')
    }
    useEffect(() => {
        axios.get('http://localhost:8080/student/findAllStudent')
            .then(res => setStudent(res.data))
            .catch(err => console.log(err));
    }, []);
    // console.log(student)
    return (
        <div>
            <Container>
                <h2>here You can add marks of students</h2>
                <div>
                    <div style={{ position: 'relative' }}>
                        <Box
                            // component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'absolute',
                                left: '50%',
                                transform: 'translate(-50%)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#d6d6d4',
                                width: '400px',
                                height: 'auto !important',
                                padding: '40px',
                                borderRadius: '10px',
                                textAlign: 'center'
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <form
                                onSubmit={clickHandler}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column', gap: "15px"
                                }}
                            >
                                <Typography />
                                <div>

                                    <Typography variant='lable'>Student Email</Typography>
                                    <TextField className={style.textfield} id="filled-basic" required onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" />
                                </div>
                                <div>
                                    <Typography variant='lable'>Marathi</Typography>
                                    <TextField className={style.textfield} id="filled-basic" required onChange={(e) => setMarathi(e.target.value)} label="Marathi" variant="filled" />
                                </div>
                                <div>
                                    <Typography variant='lable'>English</Typography>
                                    <TextField className={style.textfield} id="filled-basic" required onChange={(e) => setEnglish(e.target.value)} label="English" variant="filled" />
                                </div>
                                <div>
                                    <Typography variant='lable'>Math</Typography>
                                    <TextField className={style.textfield} id="filled-basic" required onChange={(e) => setMath(e.target.value)} label="Math" variant="filled" />
                                </div>
                                <div>
                                    <Typography variant='lable'>Science</Typography>
                                    <TextField className={style.textfield} id="filled-basic" required onChange={(e) => setScience(e.target.value)} label="Science" variant="filled" />
                                </div>
                                <div>
                                    <Typography variant='lable'>Social Science</Typography>
                                    <TextField className={style.textfield} id="filled-basic" required onChange={(e) => setSocial(e.target.value)} label="Social Science" variant="filled" />
                                </div>
                                <div>
                                    <Typography variant='lable'>Grade</Typography>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Class *</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={grade}
                                            label="Grade"
                                            onChange={(e) => { setGrade(e.target.value) }}
                                            required
                                        >
                                            <MenuItem required value={'O'}>O Grade</MenuItem>
                                            <MenuItem value={'A'}>A Grade</MenuItem>
                                            <MenuItem value={'B'}>B Grade</MenuItem>
                                            <MenuItem value={'C'}>C Grade</MenuItem>
                                            <MenuItem value={'F'}>F Grade</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <Button className={style.button} type='submit' variant="contained">Add</Button>
                                <Button variant="outlined" sx={{ float: 'right' }} onClick={() => navigate('/adminHome/marksTable')}>Cancel</Button>
                                <Typography />
                            </form>
                        </Box>
                    </div>
                </div>
            </Container>
        </div>
    );
}