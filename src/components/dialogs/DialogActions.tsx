import React from 'react';

const DialogActions = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex justify-end gap-2 border-t border-t-accent-light/40 px-6 py-3 dark:border-t-accent-dark/20">
            {children}
        </div>
    );
};

export default DialogActions;
