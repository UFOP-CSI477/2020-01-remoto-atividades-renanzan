import { HYDRATE } from 'next-redux-wrapper';

import { INTIITAL_STATE, Types } from './constants';

export default function reducer(state = INTIITAL_STATE, { type, payload }) {
    switch (type) {
        case HYDRATE:
            return { ...state, ...payload.auth };
        case Types.SIGN_REQUEST:
            return { ...state, isLoading: true };
        case Types.SIGN_FAILURE:
            return { ...state, isLoading: false, error: payload.error };
        case Types.SIGN_IN_SUCCESS:
            return { ...state, token: payload.token, user: payload.user, isLoading: false, error: null };
        case Types.SIGN_OUT:
            return { ...state, ...INTIITAL_STATE };
        default:
            return state;
    }
}