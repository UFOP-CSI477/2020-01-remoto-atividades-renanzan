import { useDispatch } from 'react-redux';
import { TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { signIn } from 'store/modules/auth/actions';

import makeStyles from './styles';
import {
    Form
} from './styles';

const useStyles = makeStyles();

export default function LoginForm() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();

    function handleLogin({ username, password, persist }) {
        dispatch(signIn(username, password, persist));
    }

    return (
        <Form className={classes.loginForm} onSubmit={handleSubmit(handleLogin)}>
            <h2>Login</h2>

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
            
                <FormControlLabel
                    control={
                        <Checkbox
                            name="persist"
                            inputRef={register}
                            color="primary" />
                    }
                    label="Manter conectado" />
            </div>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation>
                    Login
            </Button>
            
        </Form>
    );
}