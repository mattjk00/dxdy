/**
 * Matthew Kleitz, 2021
 * SUNY New Paltz
 * S -> NUM S
 * S -> FUNC S
 * S -> OPR S
 * S -> CONST S
 * S -> ~
 */
const {Token, NUM, OPRS, OPR, SYM, CON, SYMS, FUNS, FUN} = require('./Parser');
const NUMSTR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const FNPREDICT = ['s', 'c', 't']; // function predict set

let instr = '5*1';
let charindex = -1;
let char = '';
let finished = false;
let newToken;
let tokens;
let errors;

const str = () => {
    
    if (NUMSTR.includes(char)) {
        num();
        str();
    }
    else if (OPRS.includes(char)) {
        oper();
        str();
    }
    else if (SYMS.includes(char)) {
        sym();
        str();
    }
    else if (FNPREDICT.includes(char)) {
        func();
        matchOperator('(');
        str();
        matchOperator(')');
    }
    else if (char === 'e' || char === 'p') {
        consts();
        str();
    }
    else if (char === '\0') {
        advance();
    }
    else if (char === ' ') {
        advance();
    }
    else {
        errors = true;
    }
};

const func = () => {
    
    if (char === 's') {
        advance();
        if (char == 'i') {
            advance();
            matchString('n'); // sin
            newToken = new Token('sin', FUN);
            save();
        } else {
            matchString('qrt'); // sqrt
            newToken = new Token('sqrt', FUN);
            save();
        }
    }
    else if (char === 'c') {
        advance();
        matchString('os'); // cos
        newToken = new Token('cos', FUN);
        save();
    }
    else if (char === 't') {
        advance();
        matchString('an'); // tan
        newToken = new Token('tan', FUN);
        save();
    }
};

const matchString = (s) => {
    for (let i = 0; i < s.length; i++) {
        if (char === s[i]) {
            advance();
        } else {
            errors = true;
            break;
        }
    }
};

const consts = () => {
    if (char === 'e') {
        newToken = new Token('e', CON);
        save();
        advance();
    }
    else if (char === 'p') {
        advance();
        if (char === 'i') {
            newToken = new Token('pi', CON);
            save();
            advance();
        }
        else {
            consts();
        }
    }
    else {
        newToken = new Token(char, CON);
        save();
        advance();
    }
}

const sym = () => {
    newToken = new Token(char, SYM);
    save();
    advance();
};

const oper = () => {
    newToken = new Token(char, OPR);
    save();
    advance();
};

const num = () => {
    let numStr = char;
    advance();
    while (NUMSTR.indexOf(char) > -1) {
        numStr += char;
        advance();
    }
    newToken = new Token(parseInt(numStr), NUM);
    save();
};



const advance = () => {
    charindex += 1;
    if (charindex >= instr.length) {
        finished = true;
    }
    else {
        char = instr[charindex];
    }
};

const matchOperator = (c) => {
    if (char === c) {
        advance();
        newToken = new Token(c, OPR);
        save();
    } else {
        errors = true;
    }
};

const save = () => {
    tokens.push(newToken);
    newToken = new Token();
};

const tokenize = (expr) => {
    errors = false;
    instr = expr;
    if (instr[instr.length-1] != '\0') {
        instr += '\0';
    }
    finished = false;
    char = '';
    charindex = -1;
    tokens = [];
    newToken = new Token();
    advance();
    str();
    //console.log(tokens);
    return !errors;
};

const getTokens = () => {
    return tokens;
}

module.exports = {tokenize, getTokens};