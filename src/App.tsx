import './App.css';

import { Provider } from 'react-redux';

import { DialogStackProvider } from './components/dialogs/DialogStackContext';
import { ThemeProvider } from './contexts/themeProvider';
import { store } from './redux/store';
import Router from './routes';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="dark" storageKey="ui-key">
                <DialogStackProvider>
                    <Router />
                </DialogStackProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
