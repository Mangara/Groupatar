import * as React from 'react';
import * as Gravatar from 'gravatar';

import {Placement} from '../utils/Layout';
import GridLayout from '../utils/GridLayout';
import HexGridLayout from '../utils/HexGridLayout';

const WIDTH = 1600;
const HEIGHT = 900;

export interface Props {
    emails: string[];
    canvasChanged(imageData?: string): void;
}

export default class AvatarGroup extends React.PureComponent<Props, {}> {
    private canvas: HTMLCanvasElement | null = null;
    private bufferCanvas: HTMLCanvasElement | null = null;
    private imageData: string | undefined = undefined;
    private avatarCount: number = 0;
    
    componentDidMount() {
        this.updateCanvas();
    }
    
    componentDidUpdate() {
        this.updateCanvas();
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
    
    private updateCanvas() {
        if (!this.canvas) {
            return;
        }
        
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCanvas.width = WIDTH;
        this.bufferCanvas.height = HEIGHT;
        
        const ctx = this.bufferCanvas.getContext('2d');
        if (!ctx) {
            return;
        }
        
        const {emails} = this.props;
        const layout = new HexGridLayout().layout(emails.length, WIDTH, HEIGHT);
        
        this.drawLayout(ctx, emails, layout);
    }
    
    private drawLayout(ctx: CanvasRenderingContext2D, emails: string[], layout: Placement) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
        if (emails.length == 0) {
            this.drawingComplete();
        } else {
            const {coords, size} = layout;
            
            this.avatarCount = 0;
            
            for (let i = 0; i < emails.length; i++) {
                this.drawAvatar(
                    emails[i], 
                    ctx, 
                    coords[i].x - size/2, 
                    coords[i].y - size/2, 
                    size
                );
            }
        }
    }

    private drawAvatar(email: string, ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        const img = new Image();
        const radius = size / 2;
        const gravatarSize = this.getGravatarSize(size);
        const avatarGroup = this;
        
        img.onload = function() {
            ctx.save()
            
            // Clip by a circle
            ctx.beginPath();
            ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
            ctx.clip();
            ctx.closePath();
            
            ctx.drawImage(
                img, 
                0, 0,                       // Source image coords
                gravatarSize, gravatarSize, // Source image size
                x, y,                       // Destination coords
                size, size                  // Destination size
            );
            
            ctx.restore();
            
            avatarGroup.avatarDrawn();
        };        

        img.crossOrigin = "Anonymous";
        img.src = Gravatar.url(email, {s: String(gravatarSize)}, true);
    }

    private getGravatarSize(size: number) {
        return Math.pow(2, Math.ceil(Math.log(size) / Math.log(2)));
    }
    
    private avatarDrawn() {
        this.avatarCount++;
        
        if (this.avatarCount === this.props.emails.length) {
            this.drawingComplete();
        }
    }
    
    private drawingComplete() {
        this.drawBuffer();
        this.sendImageData();
    }
    
    private sendImageData() {
        if (!this.canvas) {
            return;
        }
        
        const imageData = this.canvas.toDataURL();
        
        if (this.imageData !== imageData) {
            this.imageData = imageData;
            this.props.canvasChanged(this.imageData);
        }
    }
    
    private drawBuffer() {
        if (!this.canvas || !this.bufferCanvas) {
            return;
        }
        const ctx = this.canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        
        ctx.drawImage(this.bufferCanvas, 0, 0);
    }
}
