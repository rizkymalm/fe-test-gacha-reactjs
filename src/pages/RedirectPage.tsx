import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from '@/components/features';
import Page from '@/components/Page';
import { getWalletAmount } from '@/redux/actions/wallet';

import { getUserProfile } from '../redux/actions/user';
import type { Reducers } from '../redux/types';

const RedirectPage = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state: Reducers) => state.auth);
    useEffect(() => {
        async function getData() {
            if (authState.login?.isLogin) {
                dispatch<any>(
                    await getUserProfile({
                        callback: async () => {
                            dispatch<any>(
                                await getWalletAmount({
                                    callback: () => {
                                        setTimeout(() => {
                                            window.location.href = '/dashboard';
                                        }, 2000);
                                    },
                                })
                            );
                        },
                    })
                );
            }
        }
        getData();
    }, [dispatch]);

    return (
        <Page title="Redirect Page">
            <div className="relative flex min-h-screen max-w-full justify-center overflow-hidden bg-bg-light-1 transition-colors duration-300 dark:bg-bg-dark-1">
                <div className="m-auto">
                    <Spinner size="lg" color="accent" />
                    <p className="ty-body mt-2 text-accent-light dark:text-accent-dark">
                        Loading for Redirect
                    </p>
                </div>
            </div>
        </Page>
    );
};

export default RedirectPage;
