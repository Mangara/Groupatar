import * as React from 'react';

import EmailList from './components/EmailList';
import AvatarGroup from './components/AvatarGroup';
import DownloadLink from './components/DownloadLink';

interface State {
    emails: string;
    imageData?: string;
}

const EMAIL_REGEX = RegExp(/\S+@\S+\.\S+/);

export default class Groupatar extends React.Component<{}, State> {
    private emailList: string[] = [];
    
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
                    emails={this.splitEmails(this.state.emails)}
                    canvasChanged={
                        (imageData) => {
                            this.setState({imageData});
                        }
                    }
                />
                <DownloadLink
                    href={this.state.imageData || '#'}
                />
            </>
        );
    }

    private splitEmails(emails: string) {
        const newEmailList = emails.split(/\s+/)
            .filter(s => s.length > 0 && EMAIL_REGEX.test(s));
        
        if (!this.listsEqual(this.emailList, newEmailList)) {
            this.emailList = newEmailList;
        }
        
        return this.emailList;
    }
    
    private listsEqual(a: string[], b: string[]) {
        if (a.length !== b.length) {
            return false;
        }
        
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        
        return true;
    }
}
