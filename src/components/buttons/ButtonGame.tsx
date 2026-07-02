import { Icon } from '@iconify/react';
import type { JSX } from 'react';
import React, { useEffect, useState } from 'react';

import { Spinner } from '../features';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    type: JSX.IntrinsicElements['button']['type'];
    size: 'sm' | 'md' | 'lg';
    icon?: string;
    iconSize?: number;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    color?: 'gold' | 'diamond';
}

const ButtonGame = ({
    text,
    type,
    size,
    icon,
    iconSize,
    fullWidth,
    loading,
    disabled,
    className,
    color = 'gold',
    ...props
}: Props) => {
    const [colorTheme, setcolorTheme] = useState({
        background: '',
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
        if (color === 'gold') {
            setcolorTheme({
                background: 'game-bg-gold',
                text: 'text-text-light-primary',
                disabled: 'disabled:text-text-light-muted',
            });
        } else {
            setcolorTheme({
                background: 'game-bg-diamond',
                text: 'text-text-dark-primary',
                disabled: 'disabled:text-text-dark-muted',
            });
        }
    }, [color]);

    return (
        <button
            className={`flex justify-center gap-1 rounded-md ${colorTheme.background} ${colorTheme.text} ${colorTheme.disabled} ${paddingSize} ${textSize} ${fullWidth ? 'w-full' : ''} ${className}`}
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
    );
};

export default ButtonGame;
