import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { feedback } from '../../DummyData/feedback';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState();  

    const getFeedback = () => {
        axios.get('http://localhost:8080/feedback/getAllfeedback')
        .then(res=>setFeedbacks(res.data));
    };
    useEffect(() => {
        getFeedback();
    }, []);
    console.log(feedbacks);
    const navigate = useNavigate();
    return (
        <div style={{ position: 'absolute', backgroundColor: '#d4d4d4', width: '100%', height: '100%' }}>
            <Container>
                <Typography variant='h1' gutterBottom />
                <Button type='submit' variant="contained" onClick={() => { navigate('/adminHome') }}>Back to Home</Button>
                <Typography variant='h2' gutterBottom />
                <Typography variant='h5'>Your feedbacks here</Typography>

                {
                    feedbacks ? feedbacks.map((feed) => {
                        return (
                            <div key={feed.fid}>
                                <Typography variant='h2' gutterBottom />
                                <Card>
                                    <CardContent>{feed.feed}</CardContent>
                                </Card>
                                <Typography variant='h2' gutterBottom />
                            </div>
                        );
                    }) : <Card>
                        <CardContent>No any feedback yet</CardContent>
                    </Card>
                }

            </Container>
        </div>
    );
};