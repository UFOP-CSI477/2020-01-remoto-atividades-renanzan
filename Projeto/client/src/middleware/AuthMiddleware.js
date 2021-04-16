import { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '@api';
import { updateUserBasedData, clearUserBasedData } from './utils/userBasedData';

export default function AuthMiddleware() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const didMount = useRef(false);

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }, [token])

    useEffect(() => {
        if(didMount.current) {
            if(token)
                updateUserBasedData(dispatch);
            else
                clearUserBasedData(dispatch);
        } else didMount.current = true;
    }, [token]);

    return ( <Fragment /> );
}