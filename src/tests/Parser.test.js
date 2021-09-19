/**
 * Matthew Kleitz, 2021
 * SUNY New Paltz
 * Tests for the parsing system.
 */
const {parse, Token, LPAR, ANUM, PLUS, RPAR, MULT, SIN, PI} = require("../math/Parser");


test('Parse expression: (1+2)*5*sin(PI)', () => {
    expect(
        parse([LPAR, ANUM(1), PLUS, ANUM(2), RPAR, MULT, ANUM(5), MULT, SIN, LPAR, PI, RPAR])
    ).toBe(true);
});

test('Blank Expression', () => {
    expect(
        parse([])
    ).toBe(false);
});

test('Parse expression: sin(sin(sin(PI)))', () => {
    expect(
        parse([SIN, LPAR, SIN, LPAR, SIN, LPAR, PI, RPAR, RPAR, RPAR])
    ).toBe(true);
});

test('Parse expression: sin(sin(sin(PI)', () => {
    expect(
        parse([SIN, LPAR, SIN, LPAR, SIN, LPAR, PI, RPAR])
    ).toBe(true);
});

test('Parse expression: sin(*sin(sin(PI)', () => {
    expect(
        parse([SIN, LPAR, MULT, SIN, LPAR, SIN, LPAR, PI, RPAR ])
    ).toBe(false);
});

test('Parse expression: **0*1', () => {
    expect(
        parse([MULT, MULT, ANUM(0), MULT, ANUM(1)])
    ).toBe(false);
});