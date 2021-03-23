import styled from 'styled-components';
import MuiLinearProgress from '@material-ui/core/LinearProgress';

export const LinearProgress = styled(MuiLinearProgress)`
    height: 6px;
    border: 1px solid #E1BF7F;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;

    &.MuiLinearProgress-colorPrimary {
        background-color: #F2DFB4;
    }

    & .MuiLinearProgress-bar {
        background: #92C200;
    }
`