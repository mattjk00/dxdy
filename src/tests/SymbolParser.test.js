const {parseFunc, precedence} = require('../math/SymbolParser');
const {parse, Token, LPAR, ANUM, PLUS, RPAR, MULT, SIN, PI, SYM, MINUS} = require("../math/Parser");
const {tokenize, getTokens} = require('../math/Tokenizer');

/*test('Parse 5+5', () => {
    expect(
        parseFunc([ANUM(5), PLUS, ANUM(5)], 'x', 0)
    ).toBe(10);
});*/

test('Precedence Test', () => {
    expect(
        precedence('*', '+')
    ).toBe(1);
});

test('Parse 5*x+5 where x=3', () => {
    expect(
        parseFunc([ANUM(5), MULT, new Token('x', SYM), PLUS, ANUM(5)], 'x', 3)
    ).toBe(20);
});

test('Parse x*(x-1) where x=2', () => {
    expect(
        parseFunc([new Token('x', SYM), MULT, LPAR, new Token('x', SYM), MINUS, ANUM(1), RPAR], 'x', 2)
    ).toBe(2);
});

test('Parse x*sin(x) where x=5', () => {
    expect(
        parseFunc([new Token('x', SYM), MULT, SIN, LPAR, new Token('x', SYM), RPAR], 'x', 5)
    ).toBe(-4.794621373315692);
});

test('Tokenize then parse 4*y*(y+3) where y = 5', () => {
    tokenize('4*y*(y+3)');
    let tokens = getTokens();
    expect(
        parseFunc(tokens, 'y', 5)
    ).toBe(160);
});

test('Tokenize then parse y*cos(2*y) where y = 3.1415', () => {
    tokenize('y*cos(2*y)');
    let tokens = getTokens();
    expect(
        parseFunc(tokens, 'y', 3.1415)
    ).toBe(3.1414999460624076);
});

test('Tokenize then parse sqrt(x)^2 where x = 16', () => {
    tokenize('sqrt(x)^2');
    let tokens = getTokens();
    expect(
        parseFunc(tokens, 'x', 16)
    ).toBe(16);
});