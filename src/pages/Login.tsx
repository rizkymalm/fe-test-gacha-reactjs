import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { Reducers } from '@/redux/types';

import LogoRectangle from '../assets/logo.png';
import { Alert, AlertContent } from '../components/alerts';
import { ButtonThemeSwitch } from '../components/buttons';
import SpotlightParticles from '../components/features/SpotlightParticles';
import Page from '../components/Page';
import { useTheme } from '../contexts/themeProvider';
import { LoginForm } from '../sections/login/LoginForm';

const Login = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state: Reducers) => state.auth);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        if (authState?.login?.error) {
            setAlert(true);
        } else {
            setAlert(false);
        }
    }, [authState?.login?.error]);
    const handleCloseAlert = () => {
        dispatch<any>({
            type: 'AUTH_LOGIN_ERROR_CLEAR',
        });
        setAlert(false);
    };
    const { theme, toggleTheme } = useTheme();
    return (
        <Page title="Login Page">
            <SpotlightParticles />
            <div className="fixed right-0 top-5 z-99 my-auto h-[50px] w-[90px]">
                <ButtonThemeSwitch theme={theme} onClick={toggleTheme} />
            </div>
            <div className="flex min-h-screen w-full items-center justify-center bg-light-1 dark:bg-dark-1">
                <div className="fixed inset-x-0 top-2 m-auto max-w-screen-md">
                    <Alert
                        text={authState?.login?.error?.message}
                        code={authState?.login?.error?.statusCode}
                        type="error"
                        show={alert}
                        onClose={handleCloseAlert}
                    />
                </div>
                <div className="m-auto w-full max-w-screen-md rounded-lg bg-light-2 drop-shadow-lg dark:bg-dark-2">
                    <div className="glow-card min-h-72.5 py-8 after:bg-light-3 dark:after:bg-dark-3">
                        <div className="relative z-99 flex h-full gap-4 text-text-light-primary dark:text-text-dark-primary">
                            <div className="hidden w-1/2 items-center justify-between border-r-2 px-10 pr-4 dark:border-dark-2 lg:flex lg:flex-col">
                                <div className="ty-body-lg text-center">
                                    Welcome Back!
                                    <img
                                        src={LogoRectangle}
                                        alt="Logo Digimal"
                                        className="mx-auto my-2 w-1/2"
                                    />
                                </div>
                                <AlertContent type="info">
                                    <p>
                                        Use for demo{' '}
                                        <b>rizkymalm@gmail.com</b> with
                                        password <b>testpassword</b>
                                    </p>
                                </AlertContent>
                                <div className="ty-body-sm">
                                    Powered by digimal
                                </div>
                            </div>
                            <div className="flex w-full flex-col place-items-end p-4 lg:w-1/2 lg:pr-8">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default Login;
