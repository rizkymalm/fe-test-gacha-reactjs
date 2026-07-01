import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    name: string;
    label: any;
}

const Checkboxes = ({ value, name, label, ...props }: Props) => {
    return (
        <div className="w-full text-text-sm font-medium">
            <span>
                <div className="flex w-full items-center rounded-md p-2 hover:cursor-pointer">
                    <input
                        type="checkbox"
                        id={value}
                        name={name}
                        value={value}
                        className="mr-2 size-4 accent-accent-light hover:cursor-pointer dark:accent-accent-dark"
                        {...props}
                    />
                    <label
                        className="ty-body w-full text-accent-light hover:cursor-pointer dark:text-accent-dark"
                        htmlFor={value}
                    >
                        {label}
                    </label>
                </div>
            </span>
        </div>
    );
};

export default Checkboxes;
