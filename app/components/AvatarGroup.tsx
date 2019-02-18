import * as React from 'react';
import * as Gravatar from 'gravatar';

const WIDTH = 1600;
const HEIGHT = 900;
const MARGIN = 100;

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
            const rows = divide(emails, computeNumRows(emails.length));
            const size = computeSize(rows);
            rows.forEach((row, rowIdx) => drawRow(row, rowIdx, ctx, size));
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

function drawRow(emails: string[], row: number, ctx: CanvasRenderingContext2D, size: number) {
    const fullWidth = size * 1.1;
    const xOffset = (WIDTH - size - (emails.length - 1) * fullWidth) / 2;
    emails.forEach((email, idx) => {
        drawAvatar(email, ctx, xOffset + fullWidth * idx, size * row, size)
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

    img.src = Gravatar.url(email, {s: String(size)}, true);
}

function computeNumRows(n: number) {
    if (n < 3) {
        return 1;
    }
    if (n < 9) {
        return 2;
    }
    return 3;
    // 1-2 -> 1
    // 3-8 -> 2
    // 9-? -> 3
    
}

function computeSize(rows: string[][]) {
    const h = rows.length;
    const w = rows.map(r => r.length).reduce((acc, cur) => Math.max(acc, cur));
    
    const hMaxSize = (HEIGHT - 2 * MARGIN) / h;
    const wMaxSize = (WIDTH - 2 * MARGIN - (w - 1) * (MARGIN / 2)) / w; // MARGIN / 2 should be 0.1 * size instead
    
    return Math.min(hMaxSize, wMaxSize);
}

function divide(emails: string[], numRows: number) {
    const result: string[][] = [];
    let prevEnd = 0;
    
    for (let i = 0; i < numRows; i++) {
        const rowLength = Math.ceil((emails.length - prevEnd) / (numRows - i));
        result.push(emails.slice(prevEnd, prevEnd + rowLength));
        prevEnd += rowLength;
    }
    
    return result;
}
