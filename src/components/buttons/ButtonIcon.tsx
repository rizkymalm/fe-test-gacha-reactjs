import { Icon } from '@iconify/react';
import type { JSX } from 'react';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    onClick?: any;
    iconSize?: number;
    type: JSX.IntrinsicElements['button']['type'];
    color?: 'primary' | 'error';
}

const ButtonIcon = ({
    icon,
    iconSize,
    type,
    onClick,
    color = 'primary',
    ...props
}: Props) => {
    return (
        <button
            className={`flex gap-2 rounded-full border-transparent bg-transparent p-1 ${color === 'primary' ? 'text-accent-dark' : 'text-error'} transition-all hover:bg-accent-light/20 disabled:text-textlight-muted hover:dark:bg-accent-dark/30`}
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            onClick={onClick}
            {...props}
        >
            <Icon
                icon={`${icon}`}
                width={iconSize}
                height={iconSize}
                className="m-auto"
            />
        </button>
    );
};

export default ButtonIcon;
