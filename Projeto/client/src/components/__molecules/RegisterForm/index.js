import { TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { register as authRegister } from '@api';
import { signUp } from 'store/modules/auth/actions';

import makeStyles from './styles';

const useStyles = makeStyles();

export default function RegisterForm() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();

    function handleRegister({ username, password, email }) {
        dispatch(signUp(username, password, email));
    }

    return (
        <form className={classes.loginForm} onSubmit={handleSubmit(handleRegister)}>
            <h2>Criar uma nova conta</h2>

            <div className="inputs-container">
                <TextField
                    label="Nome de usuário"
                    name="username"
                    inputRef={register}
                    variant="outlined"
                    InputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: true }} />

                <TextField
                    label="Senha"
                    type="password"
                    name="password"
                    inputRef={register}
                    variant="outlined"
                    InputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: true }} />

                <TextField
                    label="Email"
                    name="email"
                    inputRef={register}
                    variant="outlined"
                    InputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: true }} />
            </div>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation>
                    Criar conta
            </Button>
            
        </form>
    );
}