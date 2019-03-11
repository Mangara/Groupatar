import * as React from 'react';

import EmailList from './components/EmailList';
import AvatarGroup from './components/AvatarGroup';
import DownloadLink from './components/DownloadLink';

interface State {
    emails: string;
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
                />
                <DownloadLink 
                    href='#'
                    onClick={
                        (event) => {}
                    emails={this.splitEmails(this.state.emails)}
                    }
                />
            </>
        );
    }

    private splitEmails(emails: string) {
        const newEmailList = emails.split(/\s+/)
            .filter(s => s.length > 0 && EMAIL_REGEX.test(s));
        
        if (this.listsNotEqual(this.emailList, newEmailList)) {
            this.emailList = newEmailList;
        }
        
        return this.emailList;
    }
    
    private listsNotEqual(a: string[], b: string[]) {
        console.log('listsNotEqual?');
        
        if (a.length !== b.length) {
            console.log('true');
            return true;
        }
        
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                console.log('true');
                return true;
            }
        }
        
        console.log('false');
        return false;
    }
}
