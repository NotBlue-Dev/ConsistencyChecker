/* eslint-disable no-invalid-this */
/*
 * pocket gauche : -1.5, 0.0, -36
 * pocket droit : 1.5, 0.0, -36
 * pocket haut : 0.0, 1.5, -36
 * pocket bas : 0.0, -1.5, -36
 */
class goal {
    constructor() {
        this.inGoal = false;
        this.blueGoal = [[-1.5, 0.0, -36], [1.5, 0.0, -36], [0.0, 1.5, -36], [0.0, -1.5, -36]];
        this.orangeGoal = [[-1.5, 0.0, 36], [1.5, 0.0, 36], [0.0, 1.5, 36], [0.0, -1.5, 36]];
    }

    handle(gameData, eventEmitter) {
        function insideGoal(disc, goal, inside) {
            // https://math.stackexchange.com/questions/312403/how-do-i-determine-if-a-point-is-within-a-rhombus
            
            //CA MARCHE PAS DUTOUT
            let A = goal[0];
            let B = goal[1];
            let C = goal[2];
            let D = goal[3];
            let Q = [0.5 * (A[0] + C[1]),0.5 * (A[0] + C[1])];
            // a = 0.5 * distance between A and C
            let a = 0.5 * (Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2)));
            // b=1/2*∥D−B∥
            let b = 0.5 * (Math.sqrt(Math.pow(D[0] - B[0], 2) + Math.pow(D[1] - B[1], 2)));
            // unit vector in x-direction
            let U = [(C[0] - A[0]) / (2 * a), (C[1] - A[1]) / (2 * a)];
            // unit vector in y-direction
            let V = [(D[0] - B[0]) / (2 * b), (D[1] - B[1]) / (2 * b)];
            let W = [disc[0] - Q[0], disc[1] - Q[1]];
            //here W*U is the dot product of W and U
            let xabs = Math.abs((W[0] * U[0]) + (W[1] * U[1]));
            let yabs = Math.abs((W[0] * V[0]) + (W[1] * V[1]));
            if ((xabs / a) + (yabs / b) <= 1) {
                if(inside === false) {
                    return true;
                }
            }
        }

        let blue = insideGoal([1.2,1], this.blueGoal, this.inGoal);
        let orange = insideGoal([1.2,1], this.orangeGoal, this.inGoal);
        if(blue || orange) {
            this.inGoal = true;
            eventEmitter.send('three.render', "goal");
            console.log("goal");
        } else {
            this.inGoal = false;
        }
    }
}

module.exports = goal;
