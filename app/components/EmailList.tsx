import * as React from 'react';

export interface Props {
    emails: string;
    onEmailsChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export default function EmailList({emails, onEmailsChange} : Props) {
    return (
        <textarea
            className="emails"
            value={emails}
            onChange={onEmailsChange}
        />
    );
}
