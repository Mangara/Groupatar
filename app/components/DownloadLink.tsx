import * as React from 'react';

export interface Props {
    href: string;
}

export default function DownloadLink({href} : Props) {
    return (
        <div className={'downloadContainer'}>
            <a
                className={'downloadButton'}
                download={'groupatar.png'}
                href={href}
            >
                Download
            </a>
        </div>
    );
}
