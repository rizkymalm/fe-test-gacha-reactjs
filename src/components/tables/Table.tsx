import '../../styles/table.css';

import React from 'react';

import { CardBasic } from '../cards';

interface PropsContainer extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    colSpan:
        | 'col-span-1'
        | 'col-span-2'
        | 'col-span-3'
        | 'col-span-4'
        | 'col-span-5'
        | 'col-span-6'
        | 'col-span-7'
        | 'col-span-8'
        | 'col-span-9'
        | 'col-span-10'
        | 'col-span-11'
        | 'col-span-12';
    padding?: 'dense' | 'loose' | undefined;
    sticky?: boolean;
    contentAfter?: React.ReactNode;
}

interface PropsTable extends React.HTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | undefined;
    fullWidth?: boolean;
}

interface PropsThead {
    children: React.ReactNode;
    sticky?: boolean;
}

interface PropsRow extends React.HTMLAttributes<HTMLTableRowElement> {
    children: React.ReactNode;
    hover?: boolean;
    zebra?: boolean;
}

interface PropsCell extends React.HTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
    align?: 'center' | 'left' | 'right' | 'justify' | 'char' | undefined;
    colSpan?: number;
    rowSpan?: number;
}

export const TableContainer = ({
    children,
    colSpan,
    title,
    subtitle,
    padding,
    sticky,
    contentAfter,
    className,
    ...props
}: PropsContainer) => {
    return (
        <CardBasic
            colSpan={colSpan}
            title={title}
            subtitle={subtitle}
            padding={padding}
        >
            <div
                className={`relative ${sticky ? 'table-sticky custom-scrollbar pb-12' : 'pb-4'} ${className && className}`}
                {...props}
            >
                {children}
            </div>
            {contentAfter && (
                <div className="absolute inset-x-0 bottom-0 m-auto [&>div]:rounded-b-lg">
                    {contentAfter}
                </div>
            )}
        </CardBasic>
    );
};

export const Table = ({
    children,
    fullWidth,
    size,
    className,
    ...props
}: PropsTable) => {
    const tableSize =
        size === 'sm'
            ? 'table-sm'
            : size === 'md'
              ? 'table-md'
              : size === 'lg'
                ? 'table-lg'
                : 'table-md';
    const fontSize =
        size === 'sm'
            ? 'ty-body-sm'
            : size === 'md'
              ? 'ty-body'
              : size === 'lg'
                ? 'ty-body-lg'
                : 'ty-body';
    return (
        <table
            className={`ty-body ${fullWidth && 'w-full'} ${tableSize} ${fontSize} ${className && className}`}
            {...props}
        >
            {children}
        </table>
    );
};

export const Thead = ({ children, sticky }: PropsThead) => {
    return (
        <thead
            className={`sticky top-0 ${sticky && 'table-sticky-selected z-9 bg-light-1 dark:bg-dark-1'} `}
        >
            {children}
        </thead>
    );
};

export const Tbody = ({ children, sticky }: PropsThead) => {
    return (
        <tbody
            className={`sticky top-0 ${sticky && 'table-sticky-selected z-9 bg-light-1 dark:bg-dark-1'} `}
        >
            {children}
        </tbody>
    );
};

export const Tr = ({
    children,
    hover,
    zebra,
    className,
    ...props
}: PropsRow) => {
    return (
        <tr
            className={`${hover && 'hover:bg-text-light-muted/20 hover:dark:bg-dark-3/50'} ${zebra ? 'even:bg-text-light-muted/10 even:dark:bg-dark-3/20' : ''} ${className && className}`}
            {...props}
        >
            {children}
        </tr>
    );
};

export const Th = ({
    children,
    align = 'center',
    className,
    colSpan,
    rowSpan,
    ...props
}: PropsCell) => {
    return (
        <th
            align={align}
            className={`${className && className}`}
            colSpan={colSpan}
            rowSpan={rowSpan}
            {...props}
        >
            {children}
        </th>
    );
};

export const Td = ({
    children,
    align = 'left',
    className,
    colSpan,
    rowSpan,
    ...props
}: PropsCell) => {
    return (
        <td
            align={align}
            className={`${className && className}`}
            colSpan={colSpan}
            rowSpan={rowSpan}
            {...props}
        >
            {children}
        </td>
    );
};
