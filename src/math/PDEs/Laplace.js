//import { Token, ANUM } from '../Parser';
const {Matrix, solve} = require('ml-matrix');
const {parseFunc } = require('../SymbolParser');

//const h = 0.25;
//const SIZE = 2;
const Z = [ {value:0, ttype:0} ];
/*
[ p00 p01 p02 ... p10 p11 p12 ... pn0 ... pnm]
*/

const match = (a, b, a1, b1) => {
    return (a === a1 && b === b1);
};

// input boundary conditions as tokens
const laplace = (a, b, n, u_0y=Z, u_x0=Z, u_ay=Z, u_xb=Z) => {
    console.log(u_0y, u_ay, u_x0, u_xb);
    const h = a / n;
    const count = n-1; // num interior points per axis
    let m = new Matrix(count*count, count*count);
    let bvector = Matrix.columnVector(new Array(count*count).fill(0));
    
    let rowCounter = 0;

    for (let i = 1; i <= count; i++) {
        for (let j = 1; j <= count; j++) {
            let m1 = new Array(count*count).fill(0);
            let sum=0;
            for (let y = 0; y <= n; y++) {
                for (let x = 0; x <= n; x++) {
                    const index = new Number((y-1)* count + (x-1));
                    // u_i+1,j | u_i,j+1 | u_i-1,j | u_i,j-1 | - -4u_ij
                    
                    if (match(x, y, j, i+1) || match(x, y, j+1, i) || match(x, y, j, i-1) || match(x, y, j-1, i)) {
                        if (match(x, y, 0, y)) {
                            sum += parseFunc(u_0y, 'y', y);
                        }
                        else if (match(x, y, x, 0)) {
                            sum += parseFunc(u_x0, 'x', x);//u_x0(x);
                        }
                        else if (match(x*h, y, a, y)) {
                            sum += parseFunc(u_ay, 'y', y*h);//u_ay(y*h);
                        }
                        else if (match(x, y*h, x, b)) {
                            sum += parseFunc(u_xb, 'x', x*h);//u_xb(x*h);
                        }
                        else {
                            m1[index] = 1;
                        }
                        
                    } 
                    else if (match(x, y, j, i)) {
                       m1[index] = -4;
                    }
                }
            }
            bvector.set(rowCounter, 0, -sum);

            m.setRow(rowCounter++, m1);
        }
    }

    const ans = solve(m, bvector);
    console.log(ans);

    let points = new Matrix(count, count);
    let s = 0;
    for (let y = 0; y < count; y++) {
        for (let x = 0; x < count; x++) {
            points.set(y, x, ans.get( s++, 0));
        }
    }
    points = points.transpose();
    console.log(points)
    
    return points;
};

module.exports = { laplace, Z };