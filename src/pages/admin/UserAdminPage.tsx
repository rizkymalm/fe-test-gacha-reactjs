import React from 'react';

import { Title } from '@/components/features';
import Page from '@/components/Page';
import EventList from '@/sections/admin/EventList';

const UserAdminPage = () => {
    return (
        <Page title="User List | Admin">
            <Title title="Welcome" subtitle="Admin page" />
            <div className="min-h-screen w-full items-center justify-center p-2 text-text-light-primary dark:text-text-dark-primary">
                <div className="grid w-full grid-cols-12 gap-4">
                    <div className="relative col-span-12 bg-red">
                        {/* <div className="flex gap-3 rounded-xl border-x-8 border-y-2 border-x-accent-light/60 border-y-accent-light/40 bg-bg-light-1 p-3 text-text-light-primary shadow-custom-light drop-shadow-lg dark:border-x-accent-dark/60 dark:border-y-accent-dark/40 dark:bg-bg-dark-1 dark:text-text-dark-primary">
                            <p className='ty-h5'>Nama Event</p>
                            <p className='ty-body'>Ini deskripsi event</p>
                        </div> */}
                        <EventList />
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default UserAdminPage;
