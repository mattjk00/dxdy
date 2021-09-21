const {tokenize} = require('../math/Tokenizer');

test('Tokenize Expression: 5+5', () => {
    expect(
        tokenize('5+5')
    ).toBe(true);
});

test('Tokenize Expression: 5*5-(2*pi)', () => {
    expect(
        tokenize('5*5-(2*pi)')
    ).toBe(true);
});

test('Tokenize Expression: hello', () => {
    expect(
        tokenize('hello')
    ).toBe(false);
});