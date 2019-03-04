export type Coordinate = {x: number, y: number};
export type Placement = {coords: Coordinate[], size: number};
type BoundingBox = {minX: number, maxX: number, minY: number, maxY: number, width: number, height: number};

export abstract class Layout {
    
    readonly MARGIN = 5;
    
    abstract computeLayout(n: number, aspectRatio: number): Placement;
    
    public layout(n: number, width: number, height: number): Placement {
        const relativeLayout = this.computeLayout(n, width / height);
        return this.scaleAndCenter(relativeLayout, width, height);
    }
    
    scaleAndCenter(relativeLayout: Placement, width: number, height: number): Placement {
        const boundingBox = this.computeBoundingBox(relativeLayout);
        const size = this.computeSize(boundingBox, width, height);
        const {xOffset, yOffset} = this.computeOffset(boundingBox, size, width, height);
        return this.transform(relativeLayout, size, xOffset, yOffset);
    }
    
    computeBoundingBox(layout: Placement): BoundingBox {
        let minX = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;
        
        layout.coords.forEach(({x, y}) => {
           minX = Math.min(minX, x);
           maxX = Math.max(maxX, x);
           minY = Math.min(minY, y);
           maxY = Math.max(maxY, y);
        });
        
        return {
            minX: (minX - 0.5) * layout.size,
            maxX: (maxX + 0.5) * layout.size,
            minY: (minY - 0.5) * layout.size,
            maxY: (maxY + 0.5) * layout.size,
            width: (maxX - minX + 1) * layout.size,
            height: (maxY - minY + 1) * layout.size,
        }
    }
    
    computeSize(boundingBox: BoundingBox, width: number, height: number): number {
        const horizontalSize = (width - 2 * this.MARGIN) / boundingBox.width;
        const verticalSize = (height - 2 * this.MARGIN) / boundingBox.height;
        return Math.min(horizontalSize, verticalSize);
    }
    
    computeOffset(boundingBox: BoundingBox, size: number, width: number, height: number): {xOffset: number, yOffset: number} {
        return {
            xOffset: (width - boundingBox.width * size) / 2 - boundingBox.minX * size,
            yOffset: (height - boundingBox.height * size) / 2 - boundingBox.minY * size,
        }
    }
    
    transform(relativeLayout: Placement, size: number, xOffset: number, yOffset: number): Placement {
        return {
            coords: relativeLayout.coords.map(({x, y}) => {
               return {
                    x: xOffset + x * size,
                    y: yOffset + y * size,
                };
            }),
            size: size,
        }
    }
}
