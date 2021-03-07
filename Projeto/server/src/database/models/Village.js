const mongoose = require("mongoose");

const constructionSchema = mongoose.Schema({
    build: {
        key: String,
        next_level: Number
    },
    resources: {
        wood: Number,
        clay: Number,
        iron: Number
    },
    secounds: Number,
});

const VillageSchema = mongoose.Schema({
    owner: {
        map: {
            type: mongoose.Types.ObjectId,
            ref: "Map"
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    },
    location: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        },
        z: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    resources: {
        wood: {
            last_value: {
                type: Number,
                default: 2000
            },
            last_spent: {
                type: Date,
                default: Date.now
            }
        },
        clay: {
            last_value: {
                type: Number,
                default: 2000
            },
            last_spent: {
                type: Date,
                default: Date.now
            }
        },
        iron: {
            last_value: {
                type: Number,
                default: 2000
            },
            last_spent: {
                type: Date,
                default: Date.now
            }
        }
    },
    buildings: {
        Headquarters: {
            level: {
                type: Number,
                required: true,
                default: 1
            }
        },
        Barracks: {
            level: {
                type: Number,
                required: true,
                default: 0
            }
        },
        Farm: {
            level: {
                type: Number,
                required: true,
                default: 1
            }
        },
        Warehouse: {
            level: {
                type: Number,
                required: true,
                default: 1
            }
        },
        TimberCamp: {
            level: {
                type: Number,
                required: true,
                default: 1
            }
        },
        ClayPit: {
            level: {
                type: Number,
                required: true,
                default: 1
            }
        },
        IronMine: {
            level: {
                type: Number,
                required: true,
                default: 1
            }
        }
    },
    constructionQueue: {
        queue: [constructionSchema],
        lastUpdate: {
            type: Date
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Village", VillageSchema);