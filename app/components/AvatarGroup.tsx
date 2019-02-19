import * as React from 'react';
import * as Gravatar from 'gravatar';

import hexGridLayout from '../utils/hexGridLayout';

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
            const layout = hexGridLayout(emails.length);
            const nRows = layout.length;
            const size = computeSize(layout);
            
            const xOffset = (WIDTH - width(layout) * size) / 2 - left(layout) * size;
            const yOffset = (HEIGHT - nRows * size) / 2;
            
            let emailIdx = 0;
            layout.forEach((row, rowIdx) => {
                const x = xOffset + (rowIdx % 2 === 1 ? size * SPACING_FACTOR / 2 : 0);
                const avatarCount = row.filter(v => v).length;
                drawRow(row, emails.slice(emailIdx, emailIdx + avatarCount), x, yOffset + rowIdx * size, ctx, size);
                emailIdx += avatarCount;
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

function drawRow(row: boolean[], emails: string[], x: number, y: number, ctx: CanvasRenderingContext2D, size: number) {
    const fullWidth = size * SPACING_FACTOR;
    let emailIdx = 0;
    row.forEach((val, idx) => {
        if (val) {
            drawAvatar(emails[emailIdx], ctx, x + fullWidth * idx, y, size);
            emailIdx++;
        }
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

function computeSize(layout: boolean[][]) {
    return Math.min(horizontalSize(layout), verticalSize(layout.length));
}

function horizontalSize(layout: boolean[][]) {
    return (WIDTH - 2 * MARGIN) / width(layout);
}

function verticalSize(rows: number) {
    return (HEIGHT - 2 * MARGIN) / rows;
}

function width(layout: boolean[][]) {
    let left = Infinity;
    let right = 0;
    
    layout.forEach((row, idx) => {
        const offset = idx % 2 === 1 ? SPACING_FACTOR / 2 : 0;
        const first = row.indexOf(true) * SPACING_FACTOR;
        const last = row.lastIndexOf(true) * SPACING_FACTOR + 1;
        
        left = Math.min(left, offset + first);
        right = Math.max(right, offset + last);
        console.log(`row: ${JSON.stringify(row)} left: ${offset + first} right: ${offset + last}`);
    });
    console.log(`left: ${left} right: ${right}`);
    return right - left;
}

function left(layout: boolean[][]) {
    let left = Infinity;
    
    layout.forEach((row, idx) => {
        const offset = idx % 2 === 1 ? SPACING_FACTOR / 2 : 0;
        const first = row.indexOf(true) * SPACING_FACTOR;
        
        left = Math.min(left, offset + first);
    });
    return left;
}
