import BannerEvent from '@public/banner/banner-festival-of-fortune.png';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ButtonIcon, ButtonPrimary } from '@/components/buttons';
import { CardBasic } from '@/components/cards';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@/components/dialogs';
import { Spinner } from '@/components/features';
import { TextField } from '@/components/form';
import SelectOptions from '@/components/form/SelectOptions';
import Page from '@/components/Page';
import {
    deleteEventItemDeleteItem,
    getEventDetail,
    getEventItemExclude,
    patchEventItemUpdateDropRate,
    postEventItemAdd,
} from '@/redux/actions/event';
import type { Reducers } from '@/redux/types';
import sumArrayObject from '@/utils/sumArrayObject';

interface PropsOption {
    key: any;
    text: string;
    value: any;
}

interface PropNewItem {
    item: string;
    dropRate: number;
}

interface PropEdit {
    id: string;
    dropRate: number;
}

const EventDetailPage = () => {
    const { event } = useParams();
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);
    const eventState = useSelector((state: Reducers) => state.event);
    const [heightItem, setHeightItem] = useState(0);
    const [totalDropRate, setTotalDropRate] = useState(0);
    const [dialogNewItem, setDialogNewItem] = useState(false);
    const [dialogEditItem, setDialogEditItem] = useState(false);
    const [dialogDeleteItem, setDialogDeleteItem] = useState(false);
    const [optionItem, setOptionItem] = useState<PropsOption[]>([]);
    const [selectedNewItem, setSelectedNewItem] = useState<PropNewItem>({
        item: '',
        dropRate: 0,
    });
    const [selectedEditItem, setSelectedEditItem] = useState<PropEdit>({
        id: '',
        dropRate: 0,
    });
    const [selectedDelete, setSelectedDelete] = useState('');
    const [params] = useState({
        search: '',
        page: 1,
        limit: 100,
    });
    useEffect(() => {
        if (ref && ref.current) {
            setHeightItem(ref.current.offsetWidth);
        }
    }, [ref]);

    useEffect(() => {
        async function getDetail() {
            await dispatch<any>(
                getEventDetail({
                    id: event,
                    callback: (data: any) => {
                        if (data) {
                            const total = sumArrayObject(
                                data.items,
                                'dropRate'
                            );
                            setTotalDropRate(total);
                        }
                    },
                })
            );
        }
        getDetail();
    }, [dispatch]);

    const handleOpenAddNewItem = async () => {
        await dispatch<any>(
            getEventItemExclude({
                id: event,
                queries: params,
                callback: (data: any) => {
                    setOptionItem(
                        data.map((item: any) => {
                            return {
                                key: item.name,
                                value: item._id,
                                text: `${item.name} - ${item.tier}`,
                            };
                        })
                    );
                    setDialogNewItem(true);
                },
            })
        );
    };
    const handleUpdateNewItem = async () => {
        await dispatch<any>(
            postEventItemAdd({
                data: selectedNewItem,
                id: event,
                callback: async () => {
                    await dispatch<any>(
                        getEventDetail({
                            id: event,
                            callback: (data: any) => {
                                if (data) {
                                    const total = sumArrayObject(
                                        data.items,
                                        'dropRate'
                                    );
                                    setTotalDropRate(total);
                                }
                                setDialogNewItem(false);
                            },
                        })
                    );
                },
            })
        );
    };
    const handleUpdateDropRate = async () => {
        await dispatch<any>(
            patchEventItemUpdateDropRate({
                data: selectedEditItem,
                id: event,
                callback: async () => {
                    await dispatch<any>(
                        getEventDetail({
                            id: event,
                            callback: (data: any) => {
                                if (data) {
                                    const total = sumArrayObject(
                                        data.items,
                                        'dropRate'
                                    );
                                    setTotalDropRate(total);
                                }
                                setDialogEditItem(false);
                            },
                        })
                    );
                },
            })
        );
    };
    const handleDeleteItem = async () => {
        await dispatch<any>(
            deleteEventItemDeleteItem({
                id: selectedDelete,
                callback: async () => {
                    await dispatch<any>(
                        getEventDetail({
                            id: event,
                            callback: (data: any) => {
                                if (data) {
                                    const total = sumArrayObject(
                                        data.items,
                                        'dropRate'
                                    );
                                    setTotalDropRate(total);
                                }
                                setDialogDeleteItem(false);
                            },
                        })
                    );
                },
            })
        );
    };
    return (
        <Page title="Detail Event | Admin">
            <Dialog
                open={dialogNewItem}
                onClose={() => setDialogNewItem(false)}
                animation="slide-up"
            >
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                    <SelectOptions
                        options={optionItem || []}
                        name="items"
                        onChange={(e: any) => {
                            setSelectedNewItem({
                                ...selectedNewItem,
                                item: e.target.value,
                            });
                        }}
                        nullValue
                        nullValueText="Select Item"
                    />
                    <TextField
                        type="number"
                        name="dropRate"
                        placeholder="Drop Rate(%)"
                        onChange={(e: any) => {
                            setSelectedNewItem({
                                ...selectedNewItem,
                                dropRate: e.target.value,
                            });
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonPrimary
                        text="Cancel"
                        type="reset"
                        size="sm"
                        variant="outline"
                        fullWidth
                        disabled={eventState?.actions?.loading}
                        loading={eventState?.actions?.loading}
                        onClick={() => setDialogNewItem(false)}
                    />
                    <ButtonPrimary
                        text="Save"
                        type="submit"
                        size="sm"
                        variant="contained"
                        fullWidth
                        disabled={
                            eventState?.actions?.loading ||
                            !selectedNewItem.item
                        }
                        loading={eventState?.actions?.loading}
                        onClick={handleUpdateNewItem}
                    />
                </DialogActions>
            </Dialog>
            <Dialog
                open={dialogEditItem}
                onClose={() => setDialogEditItem(false)}
                animation="slide-up"
            >
                <DialogTitle>Edit Drop Rate</DialogTitle>
                <DialogContent>
                    <TextField
                        type="number"
                        name="dropRate"
                        placeholder="Drop Rate(%)"
                        defaultValue={selectedEditItem.dropRate}
                        onChange={(e: any) => {
                            setSelectedEditItem({
                                ...selectedEditItem,
                                dropRate: e.target.value,
                            });
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonPrimary
                        text="Cancel"
                        type="reset"
                        size="sm"
                        variant="outline"
                        fullWidth
                        disabled={eventState?.actions?.loading}
                        loading={eventState?.actions?.loading}
                        onClick={() => setDialogEditItem(false)}
                    />
                    <ButtonPrimary
                        text="Update"
                        type="submit"
                        size="sm"
                        variant="contained"
                        fullWidth
                        disabled={eventState?.actions?.loading}
                        loading={eventState?.actions?.loading}
                        onClick={handleUpdateDropRate}
                    />
                </DialogActions>
            </Dialog>
            <Dialog
                open={dialogDeleteItem}
                onClose={() => setDialogDeleteItem(false)}
                animation="slide-up"
            >
                <DialogTitle>Delete Item!</DialogTitle>
                <DialogContent>
                    <p className="ty-body">
                        Are you sure want to delete this item from event?
                    </p>
                    <p className="ty-body-sm">
                        This item no longer display on this gacha event
                    </p>
                </DialogContent>
                <DialogActions>
                    <ButtonPrimary
                        text="Cancel"
                        type="reset"
                        size="sm"
                        variant="outline"
                        fullWidth
                        disabled={eventState?.actions?.loading}
                        loading={eventState?.actions?.loading}
                        onClick={() => setDialogDeleteItem(false)}
                    />
                    <ButtonPrimary
                        text="Delete"
                        type="submit"
                        size="sm"
                        variant="contained"
                        fullWidth
                        disabled={eventState?.actions?.loading}
                        loading={eventState?.actions?.loading}
                        onClick={handleDeleteItem}
                    />
                </DialogActions>
            </Dialog>
            <div className="min-h-screen w-full items-center justify-center p-2 text-text-light-primary dark:text-text-dark-primary">
                <div className="grid w-full grid-cols-12 gap-4">
                    <CardBasic colSpan="col-span-12" padding="dense">
                        <div
                            className="h-48 w-full rounded-xl"
                            style={{
                                backgroundImage: `url('${BannerEvent}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'top',
                            }}
                        />
                    </CardBasic>
                    <CardBasic
                        colSpan="col-span-4"
                        title={eventState?.detail?.data?.event}
                    >
                        <div className="flex w-full flex-col gap-5">
                            <p className="ty-body">
                                {eventState?.detail?.data?.description}
                            </p>
                            <div className="flex flex-col gap-0">
                                <p className="ty-body-sm">
                                    Crated at: 1 Mei 2026
                                </p>
                                <p className="ty-body-sm">
                                    Jumlah Item:{' '}
                                    {eventState?.detail?.data?.items &&
                                        eventState?.detail?.data?.items.length}
                                </p>
                                <p className="ty-body-sm">
                                    Total Drop Rate: {totalDropRate}
                                </p>
                            </div>
                        </div>
                    </CardBasic>
                    <CardBasic colSpan="col-span-8">
                        <div className="grid w-full grid-cols-12 gap-2">
                            {eventState?.detail?.loading ? (
                                <div
                                    className="relative col-span-3 rounded-md border-accent-light/30 dark:border-accent-dark/30"
                                    style={{
                                        borderWidth: '1px',
                                        height: `${heightItem}px`,
                                    }}
                                >
                                    <div className="relative inset-x-0 top-0 m-auto h-[70%] w-[70%]">
                                        <Spinner color="accent" size="md" />
                                    </div>
                                </div>
                            ) : eventState?.detail?.data ? (
                                eventState?.detail?.data.items.map(
                                    (data: any) => (
                                        <div
                                            className="group relative col-span-3 rounded-md border-accent-light/30 dark:border-accent-dark/30"
                                            style={{
                                                borderWidth: '1px',
                                                height: `${heightItem}px`,
                                            }}
                                            key={data.name}
                                        >
                                            <div className="absolute inset-0 z-99 m-auto flex size-full items-center justify-center gap-4 bg-dark-3/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                <div className="size-8">
                                                    <ButtonIcon
                                                        icon="material-symbols:edit-outline-rounded"
                                                        iconSize={24}
                                                        type="button"
                                                        onClick={() => {
                                                            setDialogEditItem(
                                                                true
                                                            );
                                                            setSelectedEditItem(
                                                                {
                                                                    dropRate:
                                                                        data.dropRate,
                                                                    id: data._id,
                                                                }
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <div className="size-8">
                                                    <ButtonIcon
                                                        icon="material-symbols:delete-outline-rounded"
                                                        iconSize={24}
                                                        type="button"
                                                        color="error"
                                                        onClick={() => {
                                                            setDialogDeleteItem(
                                                                true
                                                            );
                                                            setSelectedDelete(
                                                                data._id
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative inset-x-0 top-0 m-auto h-[70%] w-[70%]">
                                                <img
                                                    src={data.details.image}
                                                    className="size-full"
                                                    alt={`${data.details.name}-${data.details.tier}`}
                                                />
                                            </div>
                                            <div className="text-center">
                                                <p className="ty-body-sm">
                                                    {`${data.details.tier} (${data.dropRate})`}
                                                </p>
                                                <p className="ty-body">
                                                    {data.details.name}
                                                </p>
                                                <p className="ty-body" />
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                'No data to display'
                            )}
                            <div
                                className="relative col-span-3 rounded-md border-dashed border-accent-light/30 dark:border-accent-dark/30"
                                ref={ref}
                                style={{
                                    borderWidth: '1px',
                                    height: `${heightItem}px`,
                                }}
                            >
                                <div className="absolute inset-0 m-auto size-8">
                                    <ButtonIcon
                                        icon="ic:round-plus"
                                        iconSize={24}
                                        type="button"
                                        onClick={handleOpenAddNewItem}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardBasic>
                </div>
            </div>
        </Page>
    );
};

export default EventDetailPage;
