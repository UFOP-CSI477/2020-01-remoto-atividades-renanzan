export const INTIITAL_STATE = {
    token: null,
    user: null,
    isLoading: false,
    error: null
};

export const Types = {
    SIGN_REQUEST: '@auth/SIGN_REQUEST',
    SIGN_FAILURE: '@auth/SIGN_FAILURE',
    SIGN_IN: '@auth/SIGN_IN',
    SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
    SIGN_OUT: '@auth/SIGN_OUT'
}