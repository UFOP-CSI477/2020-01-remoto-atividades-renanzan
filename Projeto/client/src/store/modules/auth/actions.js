import Cookies from 'js-cookie';
import api, { authenticate, validate, register } from '@api';

import { closeAuthenticationModal } from '../interface/actions';
import { Types } from './constants';

function signRequest() {
    return {
        type: Types.SIGN_REQUEST
    }
}

function signFailure(error) {
    const { status, data } = error.response;
    
    return {
        type: Types.SIGN_FAILURE,
        payload: { error: { status, ...data } }
    }
}

export function signIn(username, password, persist) {
    return async (dispatch) => {
        dispatch(signRequest());

        try {
            const response = await authenticate(username, password, persist);
            const { token, user } = response.data;

            dispatch(closeAuthenticationModal());

            return dispatch(signInSuccess(token, user, persist))
        } catch (err) {
            return dispatch(signFailure(err));
        }
    };
}

function signInSuccess(token, user, persist) {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if(persist)
        Cookies.set('token', token);
    else
        Cookies.set('token', token, { expires: 1 });

    return {
        type: Types.SIGN_IN_SUCCESS,
        payload: { token, user }
    }
}

export function signInValidate(token) {
    return async (dispatch) => {
        await validate(token).then(res => {
            const user = res.data;
    
            return dispatch(signInSuccess(token, user));
        })
        .catch(err => {
            const { status, data } = err.response;
    
            return dispatch(signFailure({ status, ...data }));
        });
    }
}

export function signUp(username, password, email) {
    return async (dispatch) => {
        dispatch(signRequest());

        try {
            const response = await register(username, password, email);
            const { token, user } = response.data;

            return dispatch(signInSuccess(token, user, false))
        } catch (err) {
            return dispatch(signFailure(err));
        }
    }
}

export function signOut() {
    delete api.defaults.headers.Authorization;

    Cookies.remove('token');

    return {
        type: Types.SIGN_OUT
    }
}