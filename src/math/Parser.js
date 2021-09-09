const NUM = 0;
const OPR = 2;
const FUN = 3;
const SYM = 4;
const CON = 5;

const NUMS = [0,1,2,3,4,5,6,7,8,9];
const OPRS = ['+', '-', '*', '/', '^', '(', ')'];
const FUNS = ['sin', 'cos', 'tan', 'sqrt'];
const SYMS = ['x', 'f'];
const CONS = ['e', 'pi'];

class Token {
    constructor(val=0, typ=NUM) {
        this.value = val;
        this.ttype = typ;
    }
}
const PLUS = new Token('+', OPR);
const MINUS = new Token('-', OPR);
const MULT = new Token('*', OPR);
const DIV = new Token('/', OPR);
const POW = new Token('^', OPR);
const LPAR = new Token('(', OPR);
const RPAR = new Token(')', OPR);
const SIN = new Token('sin', FUN);
const COS = new Token('cos', FUN);
const TAN = new Token('tan', FUN);
const SQRT = new Token('sqrt', FUN);
const E = new Token('e', CON);
const PI = new Token('pi', CON);
const ANUM = (n) => { return new Token(n, NUM); };


const instr = [LPAR, ANUM(1), PLUS, ANUM(2), RPAR, MULT, ANUM(5), MULT, SIN, LPAR, PI, RPAR];
let token = "";
let tindex = -1;
let errors = false;
let finished = false;

const expression = () => {
    term();
    if (token.value === '+' || token.value === '-') {
        advance();
        term();
        expression();
    }
};

const term = () => {
    factor();
    if (token.value === '*' || token.value === '/') {
        advance();
        factor();
        term();
    }
};

const factor = () => {
    const t = token.ttype;
    if (t === NUM) {
        advance();
    }
    else if (t === CON) {
        advance();
    }
    else if (t === FUN) {
        advance();
        consume('(');
        expression();
        consume(')');
    }
    else if (t === '(') {
        advance();
        expression();
        consume(')');
    }
    /*else {
        error(" a factor. Unexpected: " + token.value);
    }*/
};

const advance = () => {
    tindex += 1;
    if (instr.length === 0 || tindex >= instr.length) {
        console.log("Parse finished with", errors ? "" : "0", "errors.");
        
        
        finished = true;
    } else {
        token = instr[tindex];
        console.log(token.value);
    }
};

const consume = (c) => {
    if (token.value === c) {
        advance();
    } else {
        error(c);
    }
};

const error = (e) => {
    console.log("Error at column", tindex, ". expected", e);
    console.log("\t", instr[tindex-1].value, "|", token.value);
    errors = true;
};

export function parse() {
    errors = false;
    finished = false;
    tindex = -1;
    console.log(strSequence(instr));
    
    while(!finished && !errors) {
        advance();
        expression();
    }
}

function strSequence(s) {
    let str = "";
    for (let i = 0; i < s.length; i++) {
        str += s[i].value;
    }
    return str;
}