import styled from 'styled-components';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';

export const Dialog = styled(MuiDialog)`
    border-radius: 8px;

    & .MuiDialogContent-root {
        padding: 0px;

        &:first-child {
            padding-top: 0px;
        }
    }
`;

export const DialogContent = styled(MuiDialogContent)`
    position: relative;
    display: flex;
    flex-direction: column;
    background: #EBECED;
`;