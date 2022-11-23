const emote = require('./echo-arena-events/emote');
const goal = require('./echo-arena-events/goal');
const throwDisc = require('./echo-arena-events/throwDisc');

module.exports = [
    new emote(),
    new goal(),
    new throwDisc()
];
