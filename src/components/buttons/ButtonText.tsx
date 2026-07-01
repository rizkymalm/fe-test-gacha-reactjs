import React from 'react';

import { Spinner } from '../features';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    size: 'sm' | 'md' | 'lg';
    loading?: boolean;
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const ButtonText = ({
    text,
    size,
    loading,
    type,
    className,
    ...props
}: Props) => {
    return (
        <button
            type={
                type === 'button'
                    ? 'button'
                    : type === 'submit'
                      ? 'submit'
                      : 'reset'
            }
            className={`flex justify-center rounded-none bg-transparent px-4 py-2 dark:hover:border-transparent active:dark:bg-accent-dark/10 ${className ?? ''}`}
            {...props}
        >
            {loading ? <Spinner size={size} color="neutral" /> : text}
        </button>
    );
};

export default ButtonText;
