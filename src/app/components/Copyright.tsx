import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import { MY_NAME, PORTFOLIO_URL } from '../../constantes/constantes';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href={PORTFOLIO_URL}>
                {MY_NAME}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;