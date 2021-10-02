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

const multiply = (a, b) => {
    const h1 = a.length;
    const w1 = a[0].length;
    const w2 = b[0].length;
    if (w1 != b.length) {
        return null;
    }
    let m = newMatrix(w2, h1);

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            let entry = 0;
            for (let r = 0; r < h1; r++) {
                entry += a[i][r] * b[r][j];
            }
            m[i][j] = entry;
        }
    }
    
    return m;
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

    let rpColumn = -1;
    let rpRow = -1;
    let max = width;
    for (let n = height-1; n > 0; n--) {
        for (let j = height-1; j >= 0; j--) {
            for (let i = 0; i < max; i++) {
                
                if (Math.abs(re[j][i]) < Math.pow(10, -(precision-1))) {
                    re[j][i] = 0;
                }

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

        const divisor = re[rpRow][rpColumn];
        for (let x = rpColumn; x < width; x++) {
            if (re[rpRow][x] != 0) {
                re[rpRow][x] = round(re[rpRow][x]/divisor, precision);
            }
            
        }
        
        let pivot = re[rpRow][rpColumn];
        
        for (let y = rpRow-1; y >= 0; y--) {
            const scale = re[y][rpColumn] / pivot;
            for (let x = rpColumn; x < width; x++) {   
                re[y][x] = re[y][x] - scale * re[rpRow][x];
            }
        }
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
    return re;
};

/*const minors = (m) => {
    let mn = m.slice();
    const width = m[0].length;
    const height = m.length;

    let curx = 0;
    let cury = 0;

    while (curx < width && cury < height) {
        let dstack = [];
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (i != cury && j != curx) {
                    dstack.push(m[i][j]);
                }
            }
        }

    }
};*/


/*const inverse = (m, precision=5) => {
    const width = m[0].length;
    const height = m.length;
    let mc = m.slice();

    let re = [];
    let id = identity(width, height);

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

        // identity
        const isave = id[n];
        id[n] = id[pivotRow];
        id[pivotRow] = isave;

        for (let h = n+1; h < height; h++) {
            const scale = (mc[h][pivotIndex] / mc[n][pivotIndex]);
            if (isNaN(scale) === false && mc[h][pivotIndex] != 0) {
                for (let i = 0; i < width; i++) {
                    mc[h][i] = round(mc[h][i] - (mc[n][i] * scale), precision);  
                    id[h][i] = round(id[h][i] - (id[n][i] * scale), precision);  
                }
            }
        }

        pivotIndex = width;
        pivotRow = width;
        re.push(mc[n]);
    }
    re.push(mc[mc.length-1]);

    
    let rpColumn = -1;
    let rpRow = -1;
    let max = width;
    for (let n = height-1; n > 0; n--) {
        for (let j = height-1; j >= 0; j--) {
            for (let i = 0; i < max; i++) {
                
                if (Math.abs(re[j][i]) < Math.pow(10, -(precision-1))) {
                    re[j][i] = 0;
                }

                if (Math.abs(id[j][i]) < Math.pow(10, -(precision-1))) {
                    id[j][i] = 0;
                }

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
        console.log(id);

        const divisor = re[rpRow][rpColumn];
        for (let x = rpColumn; x < width; x++) {
            if (re[rpRow][x] != 0) {
                re[rpRow][x] = round(re[rpRow][x]/divisor, precision);
                id[rpRow][x] = round(id[rpRow][x]/divisor, precision);
            }
            
        }
        console.log(id);
        
        let pivot = re[rpRow][rpColumn];
        

        for (let y = rpRow-1; y >= 0; y--) {
            const scale = re[y][rpColumn] / pivot;
            //const iscale = id[y][rpColumn] / pivot;
            for (let x = rpColumn; x < width; x++) {   
                re[y][x] = re[y][x] - scale * re[rpRow][x];
                id[y][x] = id[y][x] - scale * id[rpRow][x];
            }
        }
        console.log(id);
        rpColumn = -1;
        rpRow = -1;
    }
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            if (re[j][i] != 0) {
                re[j][i] = re[j][i]/Math.abs(re[j][j]);
                //id[j][i] = id[j][i]/Math.abs(id[j][j]);
            }
            
        }
    }
    console.log(id);
    return id;
};*/

module.exports = { newMatrix, rowEchelon, reducedRowEchelon, multiply };