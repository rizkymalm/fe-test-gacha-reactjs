import React from 'react';

interface TitleProps {
    title: string;
    subtitle?: string;
}

const Title = ({ title, subtitle }: TitleProps) => {
    return (
        <div className="mb-6 flex flex-col">
            <h2 className="ty-h4 my-2 text-text-light-primary dark:text-text-dark-primary">
                {title}
            </h2>
            {subtitle && (
                <h3 className="ty-body-sm text-text-light-secondary dark:text-text-dark-secondary">
                    {subtitle}
                </h3>
            )}
        </div>
    );
};

export default Title;
