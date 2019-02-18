import * as React from 'react';

import Avatar from './Avatar'

const WIDTH = 1600;
const HEIGHT = 1200;

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
            
            this.props.emails.forEach((email, idx) => {
               drawAvatar(email, ctx, 300 * idx, 0, 200)
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

function drawAvatar(email: string, ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.fillRect(x, y, size, size);
}
