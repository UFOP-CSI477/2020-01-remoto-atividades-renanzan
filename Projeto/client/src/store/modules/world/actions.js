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