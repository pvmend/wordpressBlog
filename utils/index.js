// luxon helper for date formatting
const { DateTime } = require('luxon');
module.exports = {
    format_date: (date) => {
        console.log(DateTime.fromISO(date).isValid);
        return DateTime.fromJSDate(date).toFormat('ff');
    }, 
    toUpperCase : (str) =>  str.toUpperCase(),
    
};