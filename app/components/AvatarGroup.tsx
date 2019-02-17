import * as React from 'react';

import Avatar from './Avatar'

export interface Props {
    emails: string[];
}

export default function AvatarGroup({emails} : Props) {
    return (
        <div className='avatarGroup'>
            {emails.map(email => <Avatar email={email} />)}
        </div>
    );
}
