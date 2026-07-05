import React from 'react';

interface DialogContentProps {
    children: React.ReactNode;
    padding?: 'dense' | 'loose' | undefined;
}

const DialogContent = ({ children, padding = 'loose' }: DialogContentProps) => {
    return (
        <div
            className={`ty-body flex-1 overflow-y-auto ${padding === 'loose' ? 'px-6 py-4' : 'p-0'}`}
        >
            {children}
        </div>
    );
};

export default DialogContent;
