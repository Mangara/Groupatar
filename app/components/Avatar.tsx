import * as React from 'react';
import * as Gravatar from 'gravatar';

export interface Props {
    email: string;
}

export default function Avatar({email} : Props) {
    return (
        <p>{email}: <img src={Gravatar.url(email)} /></p>
    );
}
