const {newMatrix, rowEchelon, inverse, reducedRowEchelon} = require('../math/linear/matrix');


test('Create 2x2 Matrix.', () => {
    const m = newMatrix(2, 2);
    expect(
        m
    ).toStrictEqual([[0, 0], [0, 0]]);
});

test('Row Echelon ( (0 2) (1 0) ) -> ( (1 0) (0 2) ).', () => {
    const m = newMatrix(2, 2);
    m[0][1] = 2;
    m[1][0] = 1;
    expect(
        rowEchelon(m)
    ).toStrictEqual([[1, 0], [0, 2]]);
});

test('Row Echelon ( (1 1) (2 1) ) -> ( (2 1) (0 1/2) ).', () => {
    const m = newMatrix(2, 2);
    m[0][0] = 1;
    m[0][1] = 1;
    m[1][0] = 2;
    m[1][1] = 1;
    expect(
        rowEchelon(m)
    ).toStrictEqual([[2, 1], [0, 1/2]]);
});

test('Row Echelon 3x3.', () => {
    const m = newMatrix(3, 3);
    m[0][2] = 2;
    m[0][2] = 5;
    m[2][0] = 1;
    expect(
        rowEchelon(m)
    ).toStrictEqual([[1, 0, 0], [0, 0, 5], [0, 0, 0]]);
});

test('Row Echelon 3x3.', () => {
    const m = newMatrix(3, 3);
    m[0][0] = 3;
    m[0][1] = 2;
    m[0][2] = 1;
    m[1][0] = 1;
    m[1][1] = 2;
    m[1][2] = 0;
    m[2][0] = 0;
    m[2][1] = 2;
    m[2][2] = 1;
    expect(
        rowEchelon(m, 4)
    ).toStrictEqual([[3, 2, 1], [0, 2, 1], [0, 0, -0.9999]]);
});

test('Row Echelon 2x3.', () => {
    const m = newMatrix(3, 2);
    m[0][0] = 1;
    m[0][1] = 2;
    m[0][2] = 1;
    m[1][0] = 2;
    m[1][1] = 2;
    m[1][2] = 2;
    expect(
        rowEchelon(m)
    ).toStrictEqual([[2, 2, 2], [0, 1, 0]]);
});

/*test('Inverse 2x2.', () => {
    const m = newMatrix(2, 2);
    m[0][0] = 1;
    m[0][1] = 2;
    m[1][0] = 0;
    m[1][1] = 1;
    expect(
        inverse(m)
    ).toStrictEqual([[1, -2], [0, 1]]);
});*/

test('RREF 2x2.', () => {
    const m = newMatrix(2, 2);
    m[0][0] = 1;
    m[0][1] = 2;
    m[1][0] = 3;
    m[1][1] = 4;
    expect(
        reducedRowEchelon(m)
    ).toStrictEqual([[1, 0], [0, 1]]);
});

test('RREF 3x3.', () => {
    const m = newMatrix(3, 3);
    m[0][0] = 1;
    m[0][1] = 2;
    m[0][2] = 3;
    m[1][0] = 4;
    m[1][1] = 5;
    m[1][2] = 6;
    m[2][0] = 7;
    m[2][1] = 8;
    m[2][2] = 9;
    expect(
        reducedRowEchelon(m, 3)
    ).toStrictEqual([[1, 0, -1], [0, 1, 2], [0, 0, 0]]);
});

test('RREF 3x2.', () => {
    const m = newMatrix(2, 3);
    m[0][0] = 4;
    m[0][1] = 8;
    m[1][0] = 5;
    m[1][1] = 6;
    m[2][0] = -1;
    m[2][1] = 0;
    expect(
        reducedRowEchelon(m)
    ).toStrictEqual([[1, 0], [0, 1], [0, 0]]);
});

test('RREF 4x4.', () => {
    const m = newMatrix(4, 4);
    m[0][0] = 1;
    m[0][1] = 3;
    m[0][2] = 5;
    m[0][3] = 9;
    m[1][0] = 1;
    m[1][1] = 3;
    m[1][2] = 1;
    m[1][3] = 7;
    m[2][0] = 4;
    m[2][1] = 3;
    m[2][2] = 9;
    m[2][3] = 7;
    m[3][0] = 5;
    m[3][1] = 2;
    m[3][2] = 0;
    m[3][3] = 9;
    expect(
        reducedRowEchelon(m, 10)
    ).toStrictEqual([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
});