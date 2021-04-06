import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
`;

import { makeStyles } from '@material-ui/core';

export default () => makeStyles(() => ({
    loginForm: {
        "& > h2": {
            margin: '0 0 16px 0'
        },

        "& > .inputs-container": {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            margin: '8px 0',
        
            "& > div": {
                display: 'flex',
                
                "& > strong": {
                    flex: 1
                }
            }
        },

        "& button[type=submit]": {
            height: '40px',
            textTransform: 'none'
        }
    },

    input: {
        height: '48px'
    }
}));