const {DeMatrix} = require('../math/PDEs/DeMatrix');
const {LPAR, RPAR, ANUM, MULT, DIV, E, POW, Token, CON, NUM, CONSTANT, LAMBDA} = require("../math/Parser");

test("Solve DeMatrix: [1, 0, λ] -> (X' + 0X + λ = 0)", () => {
    
    const dm = new DeMatrix([1, 0, 'λ']);

    expect(
        dm.solve()
    ).toStrictEqual([CONSTANT, MULT, E, POW, LPAR, ANUM(-1), MULT, ANUM(1), MULT, ANUM(0), DIV, new Token('λ', CON), RPAR]);
});