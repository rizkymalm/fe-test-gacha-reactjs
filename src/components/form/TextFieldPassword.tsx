import { Icon } from '@iconify/react';
import { useState } from 'react';

import { ButtonIcon } from '../buttons';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    helperText?: any;
    fullWidth?: boolean;
}

const TextFieldPassword = ({
    error,
    helperText,
    fullWidth,
    ...props
}: Props) => {
    const [visible, setVisible] = useState(false);
    const handleVisibilityPassword = () => {
        setVisible(!visible);
    };
    return (
        <div className={`${fullWidth && 'w-full'} my-2`}>
            <span
                className={`inline-flex w-full gap-1 rounded-[4px] border px-2 ${error ? 'border-error' : 'border-[#cfcfcf] dark:border-dark-3'} bg-light-1 transition-all focus-within:border-b-2 focus-within:border-b-accent-light-hover focus-visible:outline-none dark:bg-dark-1 dark:focus-within:border-b-accent-dark-hover`}
            >
                <span className="m-auto box-border">
                    <Icon
                        icon="mdi:password-outline"
                        width="16"
                        height="16"
                        className="dark:text-textDarkTertiary"
                    />
                </span>
                <input
                    {...props}
                    type={visible ? 'text' : 'password'}
                    className={`${fullWidth && 'w-full'} py-2 focus-visible:outline-none dark:border-dark-3 dark:bg-dark-1 dark:text-textDarkPrimary`}
                />
                <ButtonIcon
                    icon={visible ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                    iconSize={16}
                    type="button"
                    onClick={handleVisibilityPassword}
                />
            </span>
            {error && (
                <div className="text-left text-text-xs font-medium text-error">
                    {helperText}
                </div>
            )}
        </div>
    );
};

export default TextFieldPassword;
