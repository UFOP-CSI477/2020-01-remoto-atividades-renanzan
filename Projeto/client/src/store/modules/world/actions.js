import { Types } from './constants';

/**
 *
 * @param {Array} availableWordList
 * 
 */
export function setAvailableWordList(availableWordList) {
    return ({
        type: Types.SET_AVAILABLE_WORLD_LIST,
        payload: { availableWordList }
    });
}

export function setCurrentWorld(id, data) {
    return ({
        type: Types.SET_CURRENT_WORLD,
        payload: { id, data }
    });
}

export function setCurrentWorldConfig(center, scale) {
    return ({
        type: Types.SET_CURRENT_WORLD_CONFIG,
        payload: { center, scale }
    })
}