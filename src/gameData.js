class GameData {
    constructor(json) {
        this.client = json.client_name;
        this.wristDeg = json.wrist_align_to_throw_deg;
        this.lastThrow = json.last_throw;
        this.emote = false;
        this.scorerName = json.person_scored;
        this.lastScore = json.last_score;
        this.discPos = json.disc.position;
        this.teams = json.teams;
        this.teams.forEach(team => {
            if(team.players !== undefined) {
                team.players.forEach(player => {
                    if(player.name === this.client) {
                        this.emote = player.is_emote_playing;
                    }
                });
            }
        });
    }
}

module.exports = GameData;
