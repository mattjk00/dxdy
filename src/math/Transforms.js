/**
 * Matthew Kleitz, 2021
 * SUNY New Paltz
 */
import {Complex} from "./Complex";

/**
 * Simple implementation of a Discrete Fourier Transform
 * @param {Array} x Array of discrete values for some function.
 * @returns {Array} Array transformed to the frequency domain.
 */
export function DFT(x) {
    // X(w) -> Output Array
    let X = [];
    const N = x.length;

    // For each X[k]
    for (let k = 0; k < N; k++) {
        let Xk = new Complex();
        // Sum n -> N-1
        for (let n = 0; n < N; n++) {
            const xn = x[n];
            // Sin and cosine components for the transform
            const g_real = Math.cos((2*Math.PI*k*n)/N);
            const g_cmp = -1 * Math.sin((2*Math.PI*k*n)/N);
            // the e^((-i2pi*k*n)/N) factor
            const g = new Complex(g_real, g_cmp);
            // calculate x_n for this iteration
            const newxk = xn.multiply(g);
            // Add to running sum
            Xk = Xk.add(newxk);
        }
        X.push(Xk);
    }
    return X;
}
/**
 * Returns an array with the absolute values of the complex numbers given in the input array.
 * @param {Array} x 
 * @returns 
 */
export function absArray(x) {
    let out = [];
    for (let i = 0; i < x.length; i++) {
        out.push(x[i].abs());
    }
    return out;
}

/**
 * Returns an array with the real components of the complex numbers given in the input array.
 * @param {Array} x 
 * @returns 
 */
export function realArray(x) {
    let out = [];
    for (let i = 0; i < x.length; i++) {
        out.push(x[i].r);
    }
    return out;
}
