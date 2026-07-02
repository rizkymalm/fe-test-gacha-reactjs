import React from 'react';

interface CardBasicProps extends React.HTMLAttributes<HTMLDivElement> {
    colSpan:
        | 'col-span-1'
        | 'col-span-2'
        | 'col-span-3'
        | 'col-span-4'
        | 'col-span-5'
        | 'col-span-6'
        | 'col-span-7'
        | 'col-span-8'
        | 'col-span-9'
        | 'col-span-10'
        | 'col-span-11'
        | 'col-span-12';
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
    padding?: 'dense' | 'loose' | undefined;
}

const CardFlat = ({
    colSpan,
    children,
    title,
    subtitle,
    padding = 'loose',
    ...props
}: CardBasicProps) => {
    return (
        <div
            className={`relative rounded-xl bg-bg-light-1 ${padding === 'loose' ? 'p-3' : 'p-0'} text-text-light-primary drop-shadow-lg dark:border-accent-dark/20 dark:bg-bg-dark-1 dark:text-text-dark-primary ${colSpan && colSpan}`}
            {...props}
        >
            {title || subtitle ? (
                <div className={`mb-3 ${padding === 'dense' ? 'p-3' : 'p-0'}`}>
                    {title && <h3 className="ty-body font-medium">{title}</h3>}
                    {subtitle && (
                        <p className="ty-label text-text-light-secondary dark:text-text-dark-secondary">
                            {subtitle}
                        </p>
                    )}
                </div>
            ) : (
                ''
            )}
            {children}
        </div>
    );
};

export default CardFlat;
