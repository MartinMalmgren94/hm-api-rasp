const schedule = require('node-schedule');

function onceEveryDay() {
    var timeRule = new schedule.RecurrenceRule();
    timeRule.hour = 01;
    timeRule.minute = 00;
    timeRule.second = 00;
    timeRule.dayOfWeek = new schedule.Range(0,6);
    return timeRule
}

module.exports = { onceEveryDay }