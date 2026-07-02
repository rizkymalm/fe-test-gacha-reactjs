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
}

const CardFull = ({
    colSpan,
    children,
    title,
    subtitle,
    ...props
}: CardBasicProps) => {
    return (
        <div
            className={`relative overflow-x-hidden rounded-xl border-2 border-accent-light/40 bg-bg-light-1 text-text-light-primary shadow-custom-light drop-shadow-lg dark:border-accent-dark/20 dark:bg-bg-dark-1 dark:text-text-dark-primary ${colSpan && colSpan}`}
            {...props}
        >
            {title || subtitle ? (
                <div className="absolute inset-x-0 top-0 z-9 m-auto p-3">
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

export default CardFull;
