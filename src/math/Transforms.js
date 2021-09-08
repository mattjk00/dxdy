import {Complex} from "./Complex";

export function DFT(x) {
    let X = [];
    const N = x.length;

    for (let k = 0; k < N; k++) {
        let Xk = new Complex();

        for (let n = 0; n < N; n++) {
            const xn = x[n];
            const g_real = Math.cos((2*Math.PI*k*n)/N);
            const g_cmp = -1 * Math.sin((2*Math.PI*k*n)/N);
            const g = new Complex(g_real, g_cmp);
            const newxk = xn.multiply(g);
            Xk = Xk.add(newxk);
        }
        X.push(Xk);
    }
    return X;
}

export function absArray(x) {
    let out = [];
    for (let i = 0; i < x.length; i++) {
        out.push(x[i].abs());
    }
    return out;
}

export function realArray(x) {
    let out = [];
    for (let i = 0; i < x.length; i++) {
        out.push(x[i].r);
    }
    return out;
}
