/**
 * Matthew Kleitz, 2021
 * SUNY New Paltz
 */

/**
 * Represents a complex number. Has a real and imaginary component.
 */
export class Complex {
    constructor(r=0, i=0) {
        this.r = r;
        this.i = i;
    }

    /**
     * Calculates the product of this Complex number and given factor.
     * @param {Complex} b 
     * @returns Product of this and b.
     */
    multiply(b) {
        return new Complex(
            this.r * b.r - this.i * b.i,
            this.r * b.i + this.i * b.r
        );
    }

    /**
     * Calculates the addition of this Complex number and given parameter.
     * @param {Complex} b 
     * @returns Sum of this and b.
     */
    add(b) {
        return new Complex(
            this.r + b.r,
            this.i + b.i
        );
    }

    /**
     * Copy Complex Number object.
     * @param {Complex} b 
     * @returns Copy of complex num object.
     */
    copy(b) {
        return new Complex(
            this.r,
            this.i
        );
    }

    /**
     * Calculates the absolute value of this complex number.
     * @returns Some scalar
     */
    abs() {
        return Math.sqrt(this.r**2 + this.i**2);
    }
}

/**
 * Utility function that creates an array with values of a sine function.
 * @param {Number} f Frequency 
 * @param {Number} n Number of Values 
 * @param {Number} SR Sampling Rate
 * @returns {Array}
 */
export function sinArray(f, n, SR) {
    let out = [];
    for (let i = 0; i < n; i++) {
        out.push(new Complex(Math.sin((i * 2 * Math.PI * f)/SR), 0));
    }
    return out;
}

/**
 * Utility function that creates an array with values of some sinusoidal function.
 * @param {Number} f Frequency 
 * @param {Number} n Number of Values 
 * @param {Number} SR Sampling Rate
 * @returns {Array}
 */
export function testArray(f, n, SR) {
    let out = [];
    for (let i = 0; i < n; i++) {
        const a = new Complex(Math.sin((i * 2 * Math.PI * f)/SR), 0);
        const b = new Complex(Math.cos((i * 2 * Math.PI * f)/SR), 0);
        out.push(a.multiply(b));
    }
    return out;
}