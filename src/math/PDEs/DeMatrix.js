const {LPAR, RPAR, ANUM, MULT, DIV, E, POW, Token, CON, NUM, CONSTANT} = require("../Parser");

class DeMatrix {
    constructor(derivatives) {
        this.dmatrix = derivatives;
        //this.pmatrix = polyns;
    }

    solve() {

        if (this.dmatrix.length == 3) {
            // Copy matrix and convert into tokens
            let dm = this.dmatrix.slice();
            for (let i = 0; i < dm.length; i++) {
                if (isNaN(dm[i])) {
                    dm[i] = new Token(dm[i], CON);
                }
                else {
                    dm[i] = new Token(dm[i], NUM);
                }
            }
            

            let solution = [CONSTANT, MULT, E, POW, LPAR, ANUM(-1), MULT, dm[0], MULT, dm[1], DIV, dm[2], RPAR];
            
            return solution;
        }

        return null;
    }
}

module.exports = {DeMatrix};