import * as React from 'react';

export interface Props {
    href: string;
    onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

export default function DownloadLink({href, onClick} : Props) {
    return (
        <div>
            <a
                download
                href={href}
                onClick={onClick}
            >
                Download
            </a>
        </div>
    );
}
