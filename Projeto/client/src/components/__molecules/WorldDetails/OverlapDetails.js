import { Fragment } from 'react';

import {
    Public as WorldIcon,
    Speed as FastIcon
} from '@material-ui/icons';

import {
    WorldLabel,
    SpeedLabel
} from './styles';

export default function OverlapDetails() {
    return (
        <Fragment>
            <WorldLabel>
                <WorldIcon />
                M-01
            </WorldLabel>

            <SpeedLabel>
                <FastIcon />
                x1
            </SpeedLabel>
        </Fragment>
    );
}