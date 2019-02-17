import * as React from 'react';
import * as Gravatar from 'gravatar';

const OPTIONS = {
    s: '200'
}

export interface Props {
    email: string;
}

export default function Avatar({email} : Props) {
    return (
        <img src={Gravatar.url(email, OPTIONS)} title={email} className='avatar' />
    );
}
