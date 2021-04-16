import { HYDRATE } from 'next-redux-wrapper';

import { INTIITAL_STATE, Types } from './constants';

export default function reducer(state = INTIITAL_STATE, { type, payload }) {
    switch (type) {
        case HYDRATE:
            return { ...state, ...payload.world };
        case Types.SET_AVAILABLE_WORLD_LIST:
            return { ...state, availableWordList: payload.availableWordList };
        case Types.SET_CURRENT_WORLD:
            return { ...state, current: { ...state.current, id: payload.id, data: payload.data } };
        case Types.SET_CURRENT_WORLD_CONFIG:
            return { ...state, current: { ...state.current, config: { ...state.config, center: { ...payload.center }, scale: { ...state.current.config.scale, ...payload.scale } } } };
        default:
            return state;
    }
}