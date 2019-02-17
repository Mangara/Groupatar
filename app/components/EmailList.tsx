import * as React from 'react';

const NEW_LINE = '\n';

export interface Props {
    emails: string[];
}

export default function EmailList({emails} : Props) {
    const text = emails.reduce(
        (text: string, email: string) => (text + NEW_LINE + email)
    );
    
    return (
        <textarea value={text} />
    );
}
