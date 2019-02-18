import * as React from 'react';
import * as Gravatar from 'gravatar';

const WIDTH = 1600;
const HEIGHT = 900;
const MARGIN = 5;
const SPACING_FACTOR = 2 / Math.sqrt(3);

export interface Props {
    emails: string[];
}

export default class AvatarGroup extends React.Component<Props, {}> {
    private canvas: HTMLCanvasElement | null = null;
    
    componentDidMount() {
        this.updateCanvas();
    }
    
    componentDidUpdate() {
        this.updateCanvas();
    }
    
    updateCanvas() {
        const ctx = this.canvas && this.canvas.getContext('2d');
        
        if (ctx) {
            ctx.clearRect(0,0, WIDTH, HEIGHT);
            
            const {emails} = this.props;
            const {nRows, size} = computeSize(emails.length);
            const rows = divide(emails, nRows);
            
            const yOffset = (HEIGHT - nRows * size) / 2;
            let stagger = false;
            rows.forEach((row, rowIdx) => {
                stagger = !stagger && rowIdx > 0 && rows[rowIdx - 1].length == row.length;
                drawRow(row, yOffset + rowIdx * size, ctx, size, stagger);
            });
        }
    }
    
    render() {
        return (
            <canvas
                ref={(ref) => this.canvas = ref}
                width={WIDTH}
                height={HEIGHT}
                className='avatarGroup'
            />
        );
    }
}

function drawRow(emails: string[], y: number, ctx: CanvasRenderingContext2D, size: number, stagger: boolean) {
    const fullWidth = size * SPACING_FACTOR;
    const makeRoomFor = stagger ? emails.length : emails.length - 1;
    const xOffset = (WIDTH - size - makeRoomFor * fullWidth) / 2;
    emails.forEach((email, idx) => {
        drawAvatar(email, ctx, xOffset + fullWidth * idx, y, size)
    });
}

function drawAvatar(email: string, ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    const img = new Image();
    const radius = size / 2;
    
    img.onload = function() {
        ctx.save()
        
        // Clip by a circle
        ctx.beginPath();
        ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
        ctx.clip();
        ctx.closePath();
        
        ctx.drawImage(img, x, y);
        
        ctx.restore();
    };

    img.src = Gravatar.url(email, {s: String(Math.round(size))}, true);
}

function computeSize(n: number) {
    let rows = 1;
    while (horizontalSize(n, rows) < 1.3 * verticalSize(rows)) {
        rows++;
    }
    rows = Math.max(rows - 1, 1);
    
    return {
        nRows: rows,
        size: Math.min(horizontalSize(n, rows), verticalSize(rows)),
    }
}

function horizontalSize(n: number, rows: number) {
    const maxPerRow = Math.floor(n / rows) + 1;
    return (WIDTH - 2 * MARGIN) / (SPACING_FACTOR * maxPerRow);
}

function verticalSize(rows: number) {
    return (HEIGHT - 2 * MARGIN) / rows;
}

function divide(emails: string[], numRows: number) {
    const result: string[][] = [];
    let prevEnd = 0;
    
    const perRow = emails.length / numRows;
    let longRows = emails.length % numRows;
    let long = longRows >= numRows / 2;
    
    for (let i = 0; i < numRows; i++) {
        const rowLength = long ? Math.ceil(perRow) : Math.floor(perRow);
        
        result.push(emails.slice(prevEnd, prevEnd + rowLength));
        prevEnd += rowLength;
        
        if (long) {
            longRows--;
            // Flip?
        }
    }
    
    return result;
}
