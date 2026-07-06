import React from 'react';

import { Title } from '@/components/features';
import Page from '@/components/Page';
import HistoryList from '@/sections/admin/HistoryList';

const HistoryAdminPage = () => {
    return (
        <Page title="History | Admin">
            <Title title="History" />
            <div className="min-h-screen w-full items-center justify-center p-2 text-text-light-primary dark:text-text-dark-primary">
                <div className="grid w-full grid-cols-12 gap-4">
                    <HistoryList />
                </div>
            </div>
        </Page>
    );
};

export default HistoryAdminPage;
