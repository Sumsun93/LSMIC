import React from 'react';
import { Box, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../contexts/AuthProvider';

const Missions = () => {
    const auth = useAuth();

    return (
        <Box sx={{ position: 'relative', width: "500px", height: "500px", bgcolor: 'background.default' }}>
            {(auth.user.isAdmin && false) && (
                <Fab size={"small"} color="primary" aria-label="add" sx={{ position: 'absolute', bottom: '5px', right: '5px' }}>
                    <AddIcon />
                </Fab>
            )}
            <Box sx={{ marginBottom: '50px' }}>
                <Typography variant={"h6"} sx={{ color: 'text.primary' }}>Missions</Typography>
                <Typography variant={"subtitle1"} sx={{ color: 'text.primary' }}>Cette fonctionnalité n'est pas encore disponnible</Typography>
            </Box>

            <iframe width="500" height="315" src="https://www.youtube.com/embed/rbWmOIdUEjw"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />
        </Box>
    )
}

export default Missions;
