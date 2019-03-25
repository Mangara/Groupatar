import * as React from 'react';

export interface Props {
    emails: string;
    onEmailsChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export default function EmailList({emails, onEmailsChange} : Props) {
    return (
        <textarea
            className={"emails"}
            value={emails}
            onChange={onEmailsChange}
            placeholder={"name1@example.com\nname2@example.com"}
            wrap={"off"}
        />
    );
}
