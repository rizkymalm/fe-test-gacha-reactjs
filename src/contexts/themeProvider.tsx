// src/contexts/ThemeProvider.tsx

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

// Tipe untuk nilai yang akan disediakan oleh context
type ThemeProviderState = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};

// Nilai awal untuk context
const initialState: ThemeProviderState = {
    theme: 'light',
    toggleTheme: () => null,
};

// Membuat Context
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Membuat Provider Component
export function ThemeProvider({
    children,
    defaultTheme = 'light',
    storageKey = 'vite-ui-theme',
}: {
    children: React.ReactNode;
    defaultTheme?: 'light' | 'dark';
    storageKey?: string;
}) {
    const [theme, setTheme] = useState<'light' | 'dark'>(
        () =>
            (localStorage.getItem(storageKey) as 'light' | 'dark') ||
            defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');
        root.classList.add(theme);

        localStorage.setItem(storageKey, theme);
    }, [theme, storageKey]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);
    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

// Membuat custom hook untuk menggunakan context dengan lebih mudah
export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};
