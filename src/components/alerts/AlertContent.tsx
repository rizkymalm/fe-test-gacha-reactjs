import { Icon } from '@iconify/react';

import { ButtonIcon } from '../buttons';

interface Props {
    type: 'error' | 'success' | 'info' | 'warning';
    children: React.ReactNode;
    onClose?: () => void;
}

const AlertContent = ({ type, children, onClose }: Props) => {
    const icon =
        type === 'error'
            ? 'mdi:error'
            : type === 'success'
              ? 'fluent:checkmark-circle-16-filled'
              : type === 'warning'
                ? 'mdi:car-brake-warning'
                : 'mdi:information';

    const color =
        type === 'error'
            ? 'text-error'
            : type === 'success'
              ? 'text-success'
              : type === 'warning'
                ? 'text-warning'
                : 'text-indigo-600';
    return (
        <div
            className={`ty-body relative flex gap-3 rounded-md border-l-4 py-4 pl-2 pr-6 ${type === 'error' ? 'border-error bg-error/25' : type === 'success' ? 'border-success bg-success/25' : type === 'warning' ? 'border-warning bg-warning/25' : 'border-indigo-600 bg-indigo-600/25'}`}
        >
            <div className="shrink-0">
                <Icon
                    icon={icon}
                    width={20}
                    height={20}
                    className={`my-auto flex-auto ${color}`}
                />
            </div>
            <div className="ty-body flex-auto text-text-light-primary dark:text-text-dark-primary">
                {children}
            </div>
            {onClose && (
                <div className="absolute inset-y-0 right-4 m-auto flex h-full w-4 text-text-light-primary dark:text-textDarkPrimary">
                    <ButtonIcon
                        icon="mdi:clear-bold"
                        type="button"
                        iconSize={20}
                        onClick={onClose}
                    />
                </div>
            )}
        </div>
    );
};

export default AlertContent;
