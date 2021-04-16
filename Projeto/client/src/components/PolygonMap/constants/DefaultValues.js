function check(defaultValue) {
    return (value) => {
        if(value)
            return value;
        return defaultValue;
    }
}

const DefaultValues = {
    map: {
        height: check(800),
        width: check(800)
    },

    scale: {
        current: check(3),
        min: check(3),
        max: check(10)
    }
}

export default DefaultValues;