import {Layout, Coordinate, Placement} from './Layout';

export default class HexGridLayout extends Layout {
    readonly SPACING_FACTOR = 2 / Math.sqrt(3);
    
    computeLayout(n: number, aspectRatio: number): Placement {
        const nRows = Math.round(Math.sqrt(n / aspectRatio));
        const hexGrid = this.computeGrid(n, nRows);
        return this.toPlacement(hexGrid);
    }
    
    private computeGrid(n: number, nRows: number): boolean[][] {
        const nLong = n % nRows;
        const longRows = this.pattern(nRows, nLong);
        const anyLongOdd = longRows.some((long, idx) => long && idx % 2 === 1);
        const perRow = n / nRows;
        
        let result = [];
        
        for (let i = 0; i < nRows; i++) {
            const rowLength = longRows[i] ? Math.ceil(perRow) : Math.floor(perRow);
            
            const row = new Array(rowLength);
            row.fill(true);
            
            if (anyLongOdd && (!longRows[i] || i % 2 === 0)) {
                row.unshift(false);
            }
            
            result.push(row);
        }
        
        return result;
    }
    
    private pattern(a: number, b: number): boolean[] {
        if (b > a / 2) {
            return this.pattern(a, a - b).map(b => !b);
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
    
    private toPlacement(hexGrid: boolean[][]): Placement {
        let coords: Coordinate[] = [];
        
        hexGrid.forEach((row, rowIdx) => {
            const xOffset = rowIdx % 2 === 1 ? this.SPACING_FACTOR / 2 : 0;
            const y = rowIdx;
            
            row.forEach((filled, colIdx) => {
                if (filled) {
                    coords.push({x: xOffset + colIdx * this.SPACING_FACTOR, y: y});
                }
            });
        });
        
        return {coords: coords, size: 1};
    }
}
