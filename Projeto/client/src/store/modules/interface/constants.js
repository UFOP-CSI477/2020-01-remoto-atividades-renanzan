export const ModalAuthenticationTypes = {
    LOGIN: 'signIn',
    REGISTER: 'signUp',
    SELECT_WORLD: 'selectWorld'
}

export const INTIITAL_STATE = {
    modal: {
        authentication: {
            open: false,
            type: ModalAuthenticationTypes.LOGIN,
        }
    }
};

export const Types = {
    OPEN_MODAL_AUTHENTICATION: '@interface/OPEN_MODAL_AUTHENTICATION',
    CLOSE_MODAL_AUTHENTICATION: '@interface/CLOSE_MODAL_AUTHENTICATION'
}