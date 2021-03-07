const dateFns = require("date-fns");
const schedule = require("node-schedule");

const VillageModel = require("../../database/models/Village");
const getVillageResources = require("../../rules/calculations/getVillageResources");
const Buildings = require("../../rules/constants/buildings");

module.exports = class ConstructionQueue {
    #village = null;
    #timeline = null;
    #queueLimit = 4;

    constructor(village) {
        this.#village = village;
        this.#getTimeline();
    }

    /**
     * @description Starts construction queue
     */
    #run = () => {
        if(this.#village.constructionQueue.queue.length <= 0)
            return;

        const firstListItem = this.#village.constructionQueue.queue[0];

        if(this.#timeline[0].end < new Date())
            return this.#completeConstruction(firstListItem);
        
        this.#scheduleConstruction();
    }

    /**
     * @param {Object} village - To manual update value
     * @description Refresh village information
     */
    #refreshVillage = async (village) => {
        if(village)
            this.#village = village;
        else
            this.#village = await VillageModel.findById(this.#village._id);

        this.#getTimeline();
    }

    /**
     * @param {Object} construction - Item of construction queue
     * @description Finalizes construction and updates the village
     */
    #completeConstruction = async (construction) => {
        global.debug(">> completeConstruction");

        const build = construction.build.key;
        const next_level = construction.build.next_level;
        const constructionId = construction._id;

        await this.#refreshVillage();

        try {
            this.#village.buildings[build].level = next_level;
            this.#village.constructionQueue.queue = this.#village.constructionQueue.queue.filter(construction => String(construction._id) !== String(constructionId));

            if(this.#village.constructionQueue.queue.length > 0)
                this.#village.constructionQueue.lastUpdate = this.#timeline[0].end;
            else
                this.#village.constructionQueue.lastUpdate = undefined;
            
            await this.#village.save(async (err, room) => {
                if(err)
                    return console.log(err);

                await this.#refreshVillage(room);
            
                if(this.#village.constructionQueue.queue.length > 0)
                    this.#scheduleConstruction();
            });
        } catch(err) {
            console.log(err);
        }
    }

    /**
     * @description Calculates start and end time to end each item on the list 
     */
    #getTimeline = () => {
        const lastUpdateQueue = new Date(this.#village.constructionQueue.lastUpdate);
        const timeline = [];

        this.#village.constructionQueue.queue.map((construction, index) => {
            var start = lastUpdateQueue;
            var end;
            
            for(var i = 0; i <= index; i++) {
                if(i < index)
                    start = dateFns.addSeconds(start, this.#village.constructionQueue.queue[i].secounds);
                else
                    end = dateFns.addSeconds(start, this.#village.constructionQueue.queue[i].secounds);
            }

            timeline.push({
                key: construction.build.key,
                next_level: construction.build.next_level,
                start,
                end,
                secounds: construction.secounds
            });
        });

        this.#timeline = timeline;
    }

    /**
     * @description Schedules a function to complete the first construction of the construction queue
     */
    #scheduleConstruction = () => {
        if(schedule.scheduledJobs[String(this.#village._id)])
            return;

        global.debug("> scheduleConstruction");
    
        const firstListItem = this.#village.constructionQueue.queue[0];
        const completeConstruction = this.#completeConstruction;

        schedule.scheduleJob(String(this.#village._id), this.#timeline[0].end, function () {
            completeConstruction(firstListItem);
        });
    }

    /**
     * @param {Object} construction Construction in construction queue 
     * @param {Number} index Index of construction in construction queue
     * @returns {Object} Details of the building that is in the queue
     */
    #getDetailsConstruction = (construction, index) => {
        const details = {};

        details.key = construction.build.key;
        details.level = construction.build.next_level;
        details.secounds = construction.secounds;
        details.start = dateFns.format(this.#timeline[index].start, "dd-MM-yyyy H:mm:ss");
        details.end = dateFns.format(this.#timeline[index].end, "dd-MM-yyyy H:mm:ss");
        details.concluded = (this.#timeline[index].end < new Date())

        return details;
    }

    /**
     * @param {Object} resources - Village resources 
     * @param {Object} requirements - Next level requirements build 
     * @returns {Object} - Check and message with verification if it is possible to build
     */
    #checkIfPossibleBuild = (build, resources, requirements) => {
        //Check for space in the queue
        if(this.#village.constructionQueue.queue.length >= this.#queueLimit)
            return { check: false, message: "No queue space"};

        //Check that the building is not at the last level
        if(this.#village.buildings[build].level >= Buildings[build].getSpecs().maxLevel)
            return { check: false, message: "Construction is at the maximum level"};

        //Check if there is room for new inhabitants

        //Check if there are enough resources
        if(
            (resources.wood.value < requirements.wood) ||
            (resources.clay.value < requirements.clay) ||
            (resources.iron.value < requirements.iron)
        )
            return { check: false, message: "Insufficient resources" };

        return { check: true }
    }

    /**
     * @param {String} build - Build key 
     * @returns {Number} - Value of the next level of construction
     */
    #getNextLevelToBuild = (build) => {
        var biggerLevel = this.#village.buildings[build].level;

        this.#village.constructionQueue.queue.forEach((item) => {
            if(item.build.key === build)
                if(biggerLevel < item.build.next_level)
                    biggerLevel = item.build.next_level;
        });

        return biggerLevel;
    }

    /**
     * @param {Object} resources - Resources available in the village 
     * @param {Object} requirements - Requirements to evolve building
     * @description - Calculates and updates available resources in the village after making the building evolution
     */
    #calculateResourceSpend = (resources, requirements) => {
        const now = new Date();

        this.#village.resources.wood.last_value = (resources.wood.value - requirements.wood);
        this.#village.resources.wood.last_spent = now;
        
        this.#village.resources.clay.last_value = (resources.clay.value - requirements.clay);
        this.#village.resources.clay.last_spent = now;
        
        this.#village.resources.iron.last_value = (resources.iron.value - requirements.iron);
        this.#village.resources.iron.last_spent = now;
    }

    /**
     * @param {String} build - Build key
     * @returns {Object} Village updated with build info in construction queue
     * @description Push construction to construction queue
     */
    push(build) {
        return new Promise(async (resolve, reject) => {
            const resources = getVillageResources(this.#village.resources, this.#village.buildings);
            const building = Buildings[build].getDetails(this.#getNextLevelToBuild(build), this.#village.buildings.Headquarters.level);
            const { requirements } = building.next;
            const checkQueue = this.#checkIfPossibleBuild(build, resources, requirements);
    
            if(!checkQueue.check)
                return reject(checkQueue.message);

            if(this.#village.constructionQueue.queue.length <= 0)
                this.#village.constructionQueue.lastUpdate = new Date();
            
            this.#village.constructionQueue.queue.push({
                build: {
                    key: build,
                    next_level: building.next.level
                },
                resources: requirements,
                secounds: building.next.durationToBuild.totalInSecounds
            });

            this.#calculateResourceSpend(resources, requirements);

            await this.#village.save(async (err, room) => {
                if(err)
                    return reject("Unable to save village changes");
    
                await this.#refreshVillage(room);
                this.#run();
    
                return resolve(room);
            });
        });
    }

    //- [ ] Remove build from queue
    //  - [ ] Cancel scheduling, check for a next task to schedule
    //  - [ ] Reimburse 20% of resources spent

    /**
     * @returns {Object} Construction queue with timeLine 
     */
    getQueue() {
        return this.#village.constructionQueue.queue.map(this.#getDetailsConstruction);
    }

}