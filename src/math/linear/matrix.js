/*
* Matthew Kleitz, 2021
* SUNY New Paltz
*/
const { round } = require('mathjs')

/*const round = (n, p) => {
    const scale = Math.pow(10, p);
    return Math.round((n + Number.EPSILON) * scale) / scale;
};*/

const newMatrix = (w, h) => {
    let m = [];
    for (let i = 0; i < h; i++) {
        let sub = [];
        for (let j = 0; j < w; j++) {
            sub.push(0);
        }
        m.push(sub);
    }
    return m;
}

const identity = (w, h) => {
    let i = newMatrix(w, h);
    for (let j = 0; j < h; j++) {
        i[j][j] = 1;
    }
    return i;
}

const rowEchelon = (m, precision=5) => {
    const width = m[0].length;
    const height = m.length;
    let mc = m.slice();

    let re = [];

    let pivotIndex = width;
    let pivotRow = width;
    for (let n = 0; n < height-1; n++) {
        for (let i = n; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const mij = mc[i][j];
                if (mij != 0 && (j < pivotIndex || (j == pivotIndex && mij > mc[pivotRow][pivotIndex]))) {
                    pivotIndex = j;
                    pivotRow = i;
                }
            }
        }
        const save = mc[n];
        mc[n] = mc[pivotRow];
        mc[pivotRow] = save;

        for (let h = n+1; h < height; h++) {
            const scale = (mc[h][pivotIndex] / mc[n][pivotIndex]);
            if (isNaN(scale) === false && mc[h][pivotIndex] != 0) {
                for (let i = 0; i < width; i++) {
                    mc[h][i] = round(mc[h][i] - (mc[n][i] * scale), precision);
                }
            }
        }
        

        pivotIndex = width;
        pivotRow = width;
        re.push(mc[n]);
    }
    re.push(mc[mc.length-1]);
    
    return re;
};

const reducedRowEchelon = (m, precision=5) => {
    const width = m[0].length;
    const height = m.length;
    let mc = m.slice();

    let re = [];

    let pivotIndex = width;
    let pivotRow = width;
    for (let n = 0; n < height-1; n++) {
        for (let i = n; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const mij = mc[i][j];
                if (mij != 0 && (j < pivotIndex || (j == pivotIndex && mij > mc[pivotRow][pivotIndex]))) {
                    pivotIndex = j;
                    pivotRow = i;
                }
            }
        }
        const save = mc[n];
        mc[n] = mc[pivotRow];
        mc[pivotRow] = save;

        for (let h = n+1; h < height; h++) {
            const scale = (mc[h][pivotIndex] / mc[n][pivotIndex]);
            if (isNaN(scale) === false && mc[h][pivotIndex] != 0) {
                for (let i = 0; i < width; i++) {
                    mc[h][i] = round(mc[h][i] - (mc[n][i] * scale), precision);
                    
                }
            }
        }

        pivotIndex = width;
        pivotRow = width;
        re.push(mc[n]);
    }
    re.push(mc[mc.length-1]);

    console.log(re);
    let rpColumn = -1;
    let rpRow = -1;
    let max = width;
    for (let n = height-1; n > 0; n--) {
        for (let j = height-1; j >= 0; j--) {
            for (let i = 0; i < max; i++) {
                
                // round down numbers that are essentially zero.
                if (re[j][i] < Math.pow(10, -(precision))) {
                    re[j][i] = 0;
                }
                //re[j][i] = round(re[j][i], precision);

                const mij = re[j][i];
                if (mij != 0 && i < rpColumn) {
                    break;
                }
                if (mij != 0 && i > rpColumn) {
                    rpColumn = i;
                    rpRow = j;
                    break;
                }
            }
            
        }
        max = rpColumn;
        //console.log(rpColumn, 'row:',rpRow);

        const divisor = re[rpRow][rpColumn];
        for (let x = rpColumn; x < width; x++) {
            if (re[rpRow][x] != 0) {
                re[rpRow][x] = round(re[rpRow][x]/divisor, precision);
            }
            
        }
        //console.log(re);
        
        let pivot = re[rpRow][rpColumn];
        
        //re[rpRow][rpColumn] = pivot; // normalize pivot point
        for (let y = rpRow-1; y >= 0; y--) {
            const scale = re[y][rpColumn] / pivot;
            for (let x = rpColumn; x < width; x++) {
                
                re[y][x] = re[y][x] - scale * re[rpRow][x];
                //console.log(re);
            }
            //const scale = re[y][rpColumn] / pivot;
            //re[y][rpColumn] = 0;//re[y][rpColumn] - scale * pivot;
        }
        //console.log(rpRow, rpColumn);
        rpColumn = -1;
        rpRow = -1;
    }
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            if (re[j][i] != 0) {
                re[j][i] = re[j][i]/Math.abs(re[j][j]);
            }
        }
    }
    console.log(re);
    return re;
};

const inverse = (m) => {
    
};

module.exports = { newMatrix, rowEchelon, inverse, reducedRowEchelon };