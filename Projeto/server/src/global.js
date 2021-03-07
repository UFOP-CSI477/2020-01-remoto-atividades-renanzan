//BASEADO EM: https://stackoverflow.com/questions/43528123/visual-studio-code-debug-console-colors

const dateFns = require("date-fns");

(function() {
    /**
     * @param {*} message 
     * @param  {...any} optionalParams 
     * @description Print debug message if the environment variable allows
     */
    global.debug = function (message, ...optionalParams) {

        const consolePassColor = value => (`\u001b[90m${value}\u001b[0m`);
        const consoleRedColor = value => (`\u001b[91m${value}\u001b[0m`);
        const consoleYellowColor = value => (`\u001b[93m${value}\u001b[0m`);

        if(process.env.NODE_DEBUG) {
            console.log(consoleRedColor(`[DEBUG] ${dateFns.format(new Date(), "HH:mm:ss")}`), consoleYellowColor(message), ...optionalParams.map(consolePassColor));
        }
    }
})();