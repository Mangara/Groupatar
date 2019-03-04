import {Layout, Coordinate, Placement} from './Layout';

export default class GridLayout extends Layout {
    readonly SPACING_FACTOR = 1.15;
    
    computeLayout(n: number, aspectRatio: number): Placement {
        const nRows = Math.round(Math.sqrt(n / aspectRatio));
        const nPerRow = Math.ceil(n / nRows);
        return this.grid(n, nRows, nPerRow)
    }
    
    private grid(n: number, nRows: number, nPerRow: number): Placement {
        let places: Coordinate[] = [];
        let remaining = n;
        let row = 0;
        
        while (remaining > 0) {
            const rowSize = Math.min(remaining, nPerRow);
            
            const rowPlaces = this.placeRow(row, rowSize);
            places.push.apply(places, rowPlaces);
            
            remaining -= rowSize;
            row++;
        }
        
        return {coords: places, size: 1};
    }
    
    private placeRow(row: number, rowSize: number): Coordinate[] {
        let places: Coordinate[] = [];
        
        for (let i = 0; i < rowSize; i++) {
            const coord = { x: i * this.SPACING_FACTOR, y: row * this.SPACING_FACTOR };
            places.push(coord);
        }
        
        return places;
    }
}
