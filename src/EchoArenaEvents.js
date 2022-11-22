const emote = require('./echo-arena-events/emote');
const goal = require('./echo-arena-events/goal');
const releaseDisc = require('./echo-arena-events/releaseDisc');

module.exports = [
    new emote(),
    new goal(),
    new releaseDisc(),
];
