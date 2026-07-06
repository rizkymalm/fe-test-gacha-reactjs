import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Placement =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';

type PopoverWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface PopoverProps {
    open: boolean;
    anchorRef: React.RefObject<HTMLElement | null | undefined>;
    children: React.ReactNode;
    placement?: Placement;
    offset?: number;
    onClickOutside?: () => void;
    maxWidth?: PopoverWidth;
}

const widthMap: Record<PopoverWidth, string> = {
    xs: 'max-w-[160px]',
    sm: 'max-w-[240px]',
    md: 'max-w-[320px]',
    lg: 'max-w-[400px]',
    xl: 'max-w-[480px]',
};

const Popover = ({
    open,
    anchorRef,
    children,
    placement = 'bottom-start',
    offset = 8,
    onClickOutside,
    maxWidth = 'sm',
}: PopoverProps) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});

    // Count position
    const updatePosition = () => {
        if (!anchorRef.current || !popoverRef.current) return;

        const anchorRect = anchorRef.current.getBoundingClientRect();
        const popRect = popoverRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (placement) {
            case 'bottom':
                top = anchorRect.bottom + offset;
                left =
                    anchorRect.left + anchorRect.width / 2 - popRect.width / 2;
                break;

            case 'bottom-start':
                top = anchorRect.bottom + offset;
                left = anchorRect.left;
                break;

            case 'bottom-end':
                top = anchorRect.bottom + offset;
                left = anchorRect.right - popRect.width;
                break;

            case 'top':
                top = anchorRect.top - popRect.height - offset;
                left =
                    anchorRect.left + anchorRect.width / 2 - popRect.width / 2;
                break;

            case 'top-start':
                top = anchorRect.top - popRect.height - offset;
                left = anchorRect.left;
                break;

            case 'top-end':
                top = anchorRect.top - popRect.height - offset;
                left = anchorRect.right - popRect.width;
                break;

            case 'left':
                top =
                    anchorRect.top + anchorRect.height / 2 - popRect.height / 2;
                left = anchorRect.left - popRect.width - offset;
                break;

            case 'right':
                top =
                    anchorRect.top + anchorRect.height / 2 - popRect.height / 2;
                left = anchorRect.right + offset;
                break;

            default:
                top =
                    anchorRect.top + anchorRect.height / 2 - popRect.height / 2;
                left = anchorRect.right + offset;
        }

        setStyle({
            position: 'fixed',
            top,
            left,
            zIndex: 30,
        });
    };

    // 🔥 Recalculate saat open / resize / scroll
    useEffect(() => {
        if (!open) return undefined;

        updatePosition();

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [open, placement, popoverRef, anchorRef]);

    // 🔥 Click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                anchorRef.current &&
                !anchorRef.current.contains(event.target as Node)
            ) {
                onClickOutside?.();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div
            ref={popoverRef}
            style={style}
            className={`shadow-lg w-full max-w-xs rounded-md bg-light-1 text-text-light-primary shadow-1 shadow-accent-light transition-opacity duration-200 dark:bg-dark-1 dark:text-text-dark-primary dark:shadow-accent-dark ${widthMap[maxWidth]}`}
        >
            {children}
        </div>,
        document.body
    );
};

export default Popover;

// absolute z-99 rounded-md bg-light-1 text-text-light-primary shadow-1 shadow-accent-light dark:bg-dark-1 dark:text-text-dark-primary dark:shadow-accent-dark ${anchorPositionVertical} ${anchorPositionHorizontal} ${open ? `max-h-svh overflow-auto ${widthSize}` : 'max-h-0 w-0 overflow-hidden'} no-scrollbar transition-all duration-300
