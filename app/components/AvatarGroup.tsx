import * as React from 'react';
import * as Gravatar from 'gravatar';

import {Placement} from '../utils/Layout';
import GridLayout from '../utils/GridLayout';

const WIDTH = 1600;
const HEIGHT = 900;

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
            const {emails} = this.props;
            const layout = new GridLayout().layout(emails.length, WIDTH, HEIGHT);
            
            ctx.clearRect(0,0, WIDTH, HEIGHT);
            drawLayout(ctx, emails, layout);
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

function drawLayout(ctx: CanvasRenderingContext2D, emails: string[], layout: Placement) {
    const {coords, size} = layout;
    for (let i = 0; i < emails.length; i++) {
        drawAvatar(emails[i], ctx, coords[i].x - size/2, coords[i].y - size/2, size);
    }
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
