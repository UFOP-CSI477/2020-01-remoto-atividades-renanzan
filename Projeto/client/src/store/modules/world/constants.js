import DefaultValues from 'components/PolygonMap/constants/DefaultValues';

export const INTIITAL_STATE = {
    availableWordList: [],
    current: {
        id: null,
        data: null,
        config: {
            scale: {
                min: DefaultValues.scale.min(),
                max: DefaultValues.scale.max(),
                current: DefaultValues.scale.current()
            },
            center: {
                x: null,
                y: null,
            }
        }
    }
};

export const Types = {
    SET_AVAILABLE_WORLD_LIST: '@world/SET_AVAILABLE_WORLD_LIST',
    SET_CURRENT_WORLD: '@world/SET_CURRENT_WORLD',
    SET_CURRENT_WORLD_CONFIG: '@world/SET_CURRENT_WORLD_CONFIG'
}