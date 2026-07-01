import { Icon } from '@iconify/react';
import type { JSX } from 'react';
import React, { useEffect, useState } from 'react';

import { Spinner } from '../features';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    type: JSX.IntrinsicElements['button']['type'];
    size: 'sm' | 'md' | 'lg';
    variant: 'contained' | 'text' | 'outline';
    icon?: string;
    iconSize?: number;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning';
}

const ButtonPrimary = ({
    text,
    type,
    variant,
    size,
    icon,
    iconSize,
    fullWidth,
    loading,
    disabled,
    className,
    color = 'primary',
    ...props
}: Props) => {
    const [colorTheme, setcolorTheme] = useState({
        background: '',
        border: '',
        text: '',
        disabled: '',
    });
    const textSize =
        size === 'sm' ? 'ty-body-sm' : size === 'md' ? 'ty-body' : 'ty-body-lg';
    const paddingSize =
        size === 'sm'
            ? 'px-[10px] py-1'
            : size === 'md'
              ? 'px-4 py-[10px]'
              : 'px-[18px] py-[10px]';
    useEffect(() => {
        if (color === 'primary') {
            setcolorTheme({
                background: `${variant === 'contained' && 'bg-accent-light dark:bg-accent-dark'} hover:dark:bg-accent-dark-hover hover:bg-accent-light-hover active:bg-transparent active:dark:bg-transparent`,
                border: `${variant === 'contained' || variant === 'outline' ? 'border' : ''} active:border border-accent-light hover:border-accent-light dark:border-accent-dark hover:dark:border-accent-dark active:border-accent-light active:dark:border-accent-dark`,
                text: `${variant === 'contained' && 'dark:text-text-light-primary text-text-light-primary'} text-accent-light dark:text-accent-dark hover:text-text-light-primary hover:dark:text-text-light-primary active:dark:text-text-dark-primary`,
                disabled: `${variant === 'contained' && 'disabled:bg-accent-light-subtle disabled:dark:bg-accent-dark-subtle disabled:border-accent-light-subtle disabled:dark:border-accent-dark-subtle'} ${variant === 'outline' || variant === 'text' ? 'disabled:border-accent-light-subtle disabled:dark:border-accent-dark-subtle disabled:hover:bg-transparent disabled:dark:hover:bg-transparent' : ''} ${variant === 'text' && 'disabled:active:border-none'} disabled:text-accent-light-hover/50 disabled:dark:text-accent-dark-hover/30`,
            });
        }
    }, [color]);

    return variant === 'contained' ? (
        <button
            className={`flex justify-center gap-1 ${colorTheme.background} ${colorTheme.border} ${colorTheme.text} ${colorTheme.disabled} ${paddingSize} ${textSize} ${fullWidth ? 'w-full' : ''} ${className}`}
            disabled={disabled || loading}
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            {...props}
        >
            {loading ? (
                <Spinner size="sm" color="dark" />
            ) : (
                <>
                    {icon && (
                        <Icon
                            icon={`${icon}`}
                            width={iconSize}
                            height={iconSize}
                            className="m-auto"
                        />
                    )}
                    {text}
                </>
            )}
        </button>
    ) : variant === 'outline' ? (
        <button
            className={`flex justify-center gap-1 ${colorTheme.background} ${colorTheme.border} ${colorTheme.text} ${colorTheme.disabled} ${paddingSize} ${textSize} ${fullWidth && 'w-full'} ${className}`}
            disabled={disabled || loading}
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            {...props}
        >
            {loading ? (
                <Spinner size="sm" color="accent" />
            ) : (
                <>
                    {icon && (
                        <Icon
                            icon={`${icon}`}
                            width={iconSize}
                            height={iconSize}
                            className="m-auto"
                        />
                    )}
                    {text}
                </>
            )}
        </button>
    ) : (
        <button
            className={`flex justify-center gap-1 ${colorTheme.background} ${colorTheme.border} ${colorTheme.text} ${colorTheme.disabled} ${paddingSize} ${textSize} ${fullWidth && 'w-full'} ${className}`}
            disabled={disabled || loading}
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            {...props}
        >
            {loading ? (
                <Spinner size="sm" color="accent" />
            ) : (
                <>
                    {icon && (
                        <Icon
                            icon={`${icon}`}
                            width={iconSize}
                            height={iconSize}
                            className="m-auto"
                        />
                    )}
                    {text}
                </>
            )}
        </button>
    );
};

export default ButtonPrimary;
