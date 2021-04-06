import { IconButton } from './style';
import CloseIcon from '@material-ui/icons/Close';

export default function CloseModalButton({ onClick }) {
    return (
        <IconButton onClick={onClick}>
            <CloseIcon />
        </IconButton>
    );
}
