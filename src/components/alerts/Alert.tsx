import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';

import { ButtonIcon } from '../buttons';

interface Props {
    type: 'error' | 'success' | 'info' | 'warning';
    text: string;
    code?: number;
    show: boolean;
    onClose?: () => void;
}

const Alert = ({ type, text, code, show, onClose }: Props) => {
    const [isShow, setIsShow] = useState(show);
    const [isRunning, setIsRunning] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => {
        if (show) {
            setIsShow(true);
        } else {
            setIsShow(false);
        }
    }, [show]);

    useEffect(() => {
        if (isShow) {
            if (isRunning) {
                intervalRef.current = setInterval(() => {
                    setIsShow(false);
                }, 5000);
            } else if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning, isShow, show]);

    const handleStopInterval = () => {
        setIsRunning(false);
    };
    const handleStartInterval = () => {
        setIsRunning(true);
    };

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
            className={`ty-body relative flex gap-3 rounded-md border-l-4 p-2 transition-opacity duration-500 ${type === 'error' ? 'border-error bg-error/25' : type === 'success' ? 'border-success bg-success/25' : type === 'warning' ? 'border-warning bg-warning/25' : 'border-indigo-600 bg-indigo-600/25'} ${isShow ? 'opacity-100' : 'opacity-0'}`}
            onMouseEnter={handleStopInterval}
            onMouseLeave={handleStartInterval}
        >
            <div className="flex shrink-0 align-middle">
                <Icon
                    icon={icon}
                    width={20}
                    height={20}
                    className={`my-auto flex-auto ${color}`}
                />
            </div>
            <div className="ty-body text-text-light-secondary dark:text-text-dark-secondary">
                {code}
            </div>
            <div className="ty-body text-text-light-primary dark:text-text-dark-primary">
                {text}
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

export default Alert;
