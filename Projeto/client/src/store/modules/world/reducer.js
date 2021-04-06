import { HYDRATE } from 'next-redux-wrapper';

import { INTIITAL_STATE, Types } from './constants';

export default function reducer(state = INTIITAL_STATE, { type, payload }) {
    switch (type) {
        case HYDRATE:
            return { ...state, ...payload.world };
        case Types.SET_AVAILABLE_WORLD_LIST:
            return { ...state, availableWordList: payload.availableWordList };
        default:
            return state;
    }
}