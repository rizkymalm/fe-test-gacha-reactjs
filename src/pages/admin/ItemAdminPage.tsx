import React from 'react';

import { Title } from '@/components/features';
import Page from '@/components/Page';
import ItemList from '@/sections/admin/ItemList';

const ItemAdminPage = () => {
    return (
        <Page title="List Items | Admin">
            <Title title="Items" subtitle="Items List page" />
            <div className="min-h-screen w-full items-center justify-center p-2 text-text-light-primary dark:text-text-dark-primary">
                <div className="grid w-full grid-cols-12 gap-4">
                    <ItemList />
                </div>
            </div>
        </Page>
    );
};

export default ItemAdminPage;
