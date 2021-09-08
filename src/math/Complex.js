export class Complex {
    constructor(r=0, i=0) {
        this.r = r;
        this.i = i;
    }

    /**
     * Calculates the product of this Complex number with given parameter
     * @param {} b 
     * @returns 
     */
    multiply(b) {
        return new Complex(
            this.r * b.r - this.i * b.i,
            this.r * b.i + this.i * b.r
        );
    }

    add(b) {
        return new Complex(
            this.r + b.r,
            this.i + b.i
        );
    }

    copy(b) {
        return new Complex(
            this.r,
            this.i
        );
    }

    abs() {
        return Math.sqrt(this.r**2 + this.i**2);
    }
}

export function sinArray(f, n, SR) {
    let out = [];
    for (let i = 0; i < n; i++) {
        out.push(new Complex(Math.sin((i * 2 * Math.PI * f)/SR), 0));
    }
    return out;
}

export function testArray(f, n, SR) {
    let out = [];
    for (let i = 0; i < n; i++) {
        const a = new Complex(Math.sin((i * 2 * Math.PI * f)/SR), 0);
        const b = new Complex(Math.cos((i * 2 * Math.PI * f)/SR), 0);
        out.push(a.multiply(b));
    }
    return out;
}