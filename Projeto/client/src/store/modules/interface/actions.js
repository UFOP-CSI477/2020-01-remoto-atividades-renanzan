import { Types } from './constants';

export function openAuthenticationModal(type) {
    return {
        type: Types.OPEN_MODAL_AUTHENTICATION,
        payload: { type }
    };
}

export function closeAuthenticationModal() {
    return {
        type: Types.CLOSE_MODAL_AUTHENTICATION
    }
}