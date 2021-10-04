const {laplace} = require('../math/PDEs/Laplace');

test('Laplace', () => {
    expect(
        laplace(2, 2, 30,
            (s)=>{return 0;},
            (s)=>{return 0;},
            (y)=>{ return y*(2 - y); }, 
            (x)=>{ 
                if (x > 0 && x < 1) {
                    return x;
                } else if (x >=1 && x < 2) {
                    return 2-x;
                }
            })
    ).toBe(true);
});