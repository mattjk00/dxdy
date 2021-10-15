/**
 * Matthew Kleitz, 2021
 * SUNY New Paltz
 * Parses Symbols
 * Input a list of tokens, a variable name, and constant value for the variable, and the function parseFunc will return a numerical answer.
 * Will be used for boundary condition evaluation.
 */
const {Token, NUM, FUN, OPR, SYM} = require('./Parser')
const prec = [')', '^', '*', '/', '+', '-'];

const parseFunc = (tokens, varName, varVal) => {
    let stackA = [];
    let stackB = [];
    let tcopy = tokens.slice();

    const arithmetic = (left, right, op) => {
        
        if (op === '*') {
            stackA.push(left*right);
        }
        else if (op === '/') {
            stackA.push(left/right);
        }
        else if (op === '+') {
            stackA.push(left+right);
        }
        else if (op === '-') {
            stackA.push(left-right);
        }
        else if (op === '^') {
            stackA.push(left**right);
        }
        else if (op === 'sin') {
            stackA.push(left);
            stackA.push(Math.sin(right));
        }
        else if (op === 'cos') {
            stackA.push(left);
            stackA.push(Math.cos(right));
        }
        else if (op === 'tan') {
            stackA.push(left);
            stackA.push(Math.tan(right));
        }
        else if (op === 'sqrt') {
            stackA.push(left);
            stackA.push(Math.sqrt(right));
        }
    }

    while (tcopy.length > 0) {
        const sym = tcopy.shift();

        if (sym.ttype === NUM) {
            stackA.push(sym.value);
        }
        else if (sym.ttype === SYM && sym.value === varName) {
            stackA.push(varVal);
        }
        else if (sym.ttype === FUN) {
            stackB.push(sym.value);
        }
        else if (sym.ttype === OPR) {
            const lastOp = stackB[stackB.length-1];
            stackB.push(sym.value);
            
            // If the newest operator has lower precedence than the one on top of stack, carry out the previous operator's arithmetic.
            // Place the result on stack A.
            if (precedence(lastOp, sym.value) === 1) {
                stackB.pop();
                stackB.pop();
                stackB.push(sym.value);
                let right = stackA.pop();
                let left = stackA.pop();
                
                arithmetic(left, right, lastOp);    
            }
            if (sym.value === ')') {
                stackB.pop();
                while (stackB[stackB.length-1] != '(') {
                    right = stackA.pop();
                    left = stackA.pop();
                    arithmetic(left, right, stackB.pop());
                }
                stackB.pop();
            }
        }
    }
    while (stackB.length > 0) {
        console.log(stackA, stackB);
        let right = stackA.pop();
        let left = stackA.pop();
        arithmetic(left, right, stackB.pop());
    }
    
    return stackA.pop();
};

// 1 if a has higher precedence than b
const precedence = (a, b) => {
    const pa = prec.indexOf(a);
    const pb = prec.indexOf(b);

    if (pa === -1 || pb === -1 ||pa === pb) {
        return 0;
    } else if (pa > pb) {
        return -1;
    } else {
        return 1;
    }
}

module.exports = { parseFunc, precedence };