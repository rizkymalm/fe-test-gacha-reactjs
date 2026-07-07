import React, { useState } from 'react';

import { ButtonIcon } from '@/components/buttons';
import { Dialog, DialogTitle } from '@/components/dialogs';
import { Title } from '@/components/features';
import Page from '@/components/Page';
import CreateEvent from '@/sections/admin/CreateEvent';
import EventList from '@/sections/admin/EventList';

const EventAdminPage = () => {
    const [dialogForm, setDialogForm] = useState(false);
    return (
        <Page title="User List | Admin">
            <Title title="Event List" subtitle="Event List page" />
            <div className="min-h-screen w-full items-center justify-center p-2 text-text-light-primary dark:text-text-dark-primary">
                <div className="grid w-full grid-cols-12 gap-4">
                    <div className="relative col-span-12">
                        <Dialog
                            open={dialogForm}
                            onClose={() => setDialogForm(false)}
                            animation="scale"
                            width="md"
                            closeOnOutsideClick={false}
                            closeButton
                        >
                            <DialogTitle>Add new Event</DialogTitle>
                            <CreateEvent />
                        </Dialog>
                        <div className="absolute right-4 top-4 z-99 m-auto">
                            <ButtonIcon
                                icon="ic:round-plus"
                                iconSize={24}
                                type="button"
                                onClick={() => setDialogForm(true)}
                            />
                        </div>
                        <EventList />
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default EventAdminPage;
