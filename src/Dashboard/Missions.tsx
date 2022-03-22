import React from 'react';
import { Box, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../contexts/AuthProvider';

import lsmicGotTalent from './LSMIC_TALENT.png';

const Missions = () => {
    const auth = useAuth();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', width: "500px", height: "500px", bgcolor: 'background.default', padding: '10px', boxSizing: 'border-box' }}>
            <img style={{ maxWidth: '100%', maxHeight: '90%' }} src={lsmicGotTalent} />
            <a style={{ color: '#90caf9', marginTop: '5px' }} target="_blank" href="https://forms.gle/MHumvXMCBGfFePYY9">INSCRIPTION ICI</a>
        </Box>
    )
}

export default Missions;
