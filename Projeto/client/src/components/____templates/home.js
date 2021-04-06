import { Fragment } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from 'store/modules/auth/actions';
import { openAuthenticationModal } from 'store/modules/interface/actions';
import { ModalAuthenticationTypes } from 'store/modules/interface/constants';

export default function HomePage() {
    const dispatch = useDispatch();
    const isSigned = useSelector(state => Boolean(state.auth.token));

    function handleLogin() {
        dispatch(openAuthenticationModal(ModalAuthenticationTypes.LOGIN));
    }

    function handleRegister() {
        dispatch(openAuthenticationModal(ModalAuthenticationTypes.REGISTER));
    }
    
    function handleSelectWorld() {
        dispatch(openAuthenticationModal(ModalAuthenticationTypes.SELECT_WORLD));
    }

    function handleDisconect() {
        dispatch(signOut());
    }

    return (
        <div>
            <Head>
                <title>Civilization War</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                

                {!isSigned ? (
                    <Fragment>
                        <button onClick={handleLogin}>Conectar</button>
                        <button onClick={handleRegister}>Registrar</button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <button onClick={handleSelectWorld}>Selectionar Mundo</button>
                        <button onClick={handleDisconect}>Desconectar</button>
                    </Fragment>
                )}
            </main>
        </div>
    );
}