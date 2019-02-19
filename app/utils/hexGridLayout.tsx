export default function layout(n: number): boolean[][] {
    const nRows = Math.floor(Math.sqrt(n));
    const perRow = n / nRows;
    
    const nLong = n % nRows;
    const longRows = pattern(nRows, nLong);
    const anyLongOdd = longRows.some((long, idx) => long && idx % 2 === 1);
    
    let result = [];
    
    let placed = 0;
    for (let i = 0; i < nRows; i++) {
        const rowLength = longRows[i] ? Math.ceil(perRow) : Math.floor(perRow);
        
        const row = new Array(rowLength);
        row.fill(true);
        
        if (anyLongOdd && (!longRows[i] || i % 2 === 0)) {
            row.unshift(false);
        }
        
        result.push(row);
        placed += rowLength;
    }
    
    return result;
}

function pattern(a: number, b: number): boolean[] {
    if (b > a / 2) {
        return pattern(a, a - b).map(b => !b);
    }
    
    let result = [];
    
    for (let i = 0; i < Math.ceil((a / 2) - b); i++) {
        result.push(false);
    }
    
    for (let i = 0; i < b; i++) {
        result.push(true);
        result.push(false);
    }
    
    while (result.length < a) {
        result.push(false);
    }
    
    return result;
}
