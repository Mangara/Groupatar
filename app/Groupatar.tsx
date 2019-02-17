import * as React from 'react';

import EmailList from './components/EmailList';
import AvatarGroup from './components/AvatarGroup';

interface State {
    emails: string;
}

export default class Groupatar extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            emails: 'sander.verdonschot@shopify.com\ngehana.booth@shopify.com'
        };
    }
    
    render() {
        return (
            <>
                <EmailList
                    emails={this.state.emails}
                    onEmailsChange={
                        (event) => this.setState({emails: event.target.value})
                    }
                />
                <AvatarGroup
                    emails={splitEmails(this.state.emails)}
                />
                <a>Download</a>
            </>
        );
    }
}

const EMAIL_REGEX = RegExp(/\S+@\S+\.\S+/);

function splitEmails(emails: string) {
    return emails
        .split(/\s+/)
        .filter(s => s.length > 0 && EMAIL_REGEX.test(s));
}
