import * as React from 'react';

import EmailList from './components/EmailList';

interface State {
    emails: string[];
}

export default class Groupatar extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            emails: ['me@test.example.com', 'you@example.com']
        };
    }
    
    render() {
        return <EmailList emails={this.state.emails} />;
    }
}
