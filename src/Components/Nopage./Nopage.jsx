import React from 'react';
import { Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

const primary = purple[500]; // #f44336

export const Nopage = () => {
    return (<div>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection:'column',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: primary,
            }}
        >
            <div><Typography variant="h1" style={{ color: 'white' }}>
                404
            </Typography></div>
            <div>
                <Typography variant="h1" style={{ color: 'white' }}>
                    Page Not Found
                </Typography>
            </div>
        </Box>
    </div>);
}