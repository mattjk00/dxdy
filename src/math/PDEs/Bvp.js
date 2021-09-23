/**
 * Matthew Kleitz, 2021
 * SUNY New Paltz
 * Boundary-Value Problem Solver
 */
let tokens;
let bc;
let ic;

const solve = (tokes, boundaryc=null, initc=null) => {
    tokens = tokes;
    bc = boundaryc;
    ic = initc;
};