const {laplace} = require('../math/PDEs/Laplace');

test('Laplace', () => {
    expect(
        laplace(2, 2)
    ).toBe(true);
});