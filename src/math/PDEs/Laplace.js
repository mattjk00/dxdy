const {Matrix} = require('ml-matrix');

const h = 0.1;
const SIZE = 3;
const Z = () => { return 0; };
/*
[ p00 p01 p02 ... p10 p11 p12 ... pn0 ... pnm]
*/

const laplace = (a, b, u_0y=Z, u_x0=Z, u_ay=Z, u_xb=Z) => {
    let m = new Matrix(SIZE, SIZE*SIZE+1);
    let j = 1;
    //for (let j = 1; j < SIZE; j++) {
        for (let i = 1; i < SIZE; i++) {
            //for (let j = 1; j < SIZE-1; j++) {
            const u0 = SIZE*(j-1)+j;//(i-1)*SIZE+j;
            const u1 = (j+1)*SIZE+j;
            const u2 = j*SIZE+j+1;
            const u3 = j*SIZE+j-1;
            m.set(i, u0, 1);
            m.set(i, u1, 1);
            m.set(i, u2, 1);
            m.set(i, u3, 1);
            m.set(i, j*SIZE+j, -4);
                //j++;
            //}
        }
    //}
    console.log(m);
};

module.exports = { laplace };