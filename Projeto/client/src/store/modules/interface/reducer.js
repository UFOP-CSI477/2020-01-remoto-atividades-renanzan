import { HYDRATE } from 'next-redux-wrapper';

import { INTIITAL_STATE, Types } from './constants';

export default function reducer(state = INTIITAL_STATE, { type, payload }) {
    switch (type) {
        case HYDRATE:
            return { ...state, ...payload.interface };
        case Types.OPEN_MODAL_AUTHENTICATION:
            return { ...state, modal: { ...state.modal, authentication: { open: true, type: payload.type } } };
        case Types.CLOSE_MODAL_AUTHENTICATION:
            return { ...state, modal: { ...state.modal, authentication: { ...state.modal.authentication, open: false } } };
        default:
            return state;
    }
}