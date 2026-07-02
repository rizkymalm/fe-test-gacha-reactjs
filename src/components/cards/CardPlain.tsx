import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
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

const CardPlain = ({ colSpan, children, title, subtitle, ...props }: Props) => {
    return (
        <div
            className={`relative rounded-md border-2 border-none bg-bg-light-3 p-4 text-text-light-primary dark:bg-bg-dark-3/40 dark:text-text-dark-primary ${colSpan && colSpan}`}
            {...props}
        >
            {title || subtitle ? (
                <div className="mb-3">
                    {title && <h3 className="ty-body font-medium">{title}</h3>}
                    {subtitle && (
                        <p className="ty-body-sm text-text-light-secondary dark:text-text-dark-secondary">
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

export default CardPlain;
