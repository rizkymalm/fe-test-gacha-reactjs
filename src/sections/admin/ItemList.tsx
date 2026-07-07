import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonIcon } from '@/components/buttons';
import { CardBasic } from '@/components/cards';
import { Dialog, DialogTitle } from '@/components/dialogs';
import { Spinner } from '@/components/features';
import Pagination from '@/components/tables/Pagination';
import { getItemList } from '@/redux/actions/item';
import type { Reducers } from '@/redux/types';
import { badgeName } from '@/utils/badge';
import { numberCeil } from '@/utils/numbers';

import FormCreateItem from './FormCreateItem';

const ItemList = () => {
    const dispatch = useDispatch();
    const itemState = useSelector((state: Reducers) => state.item);
    const ref = useRef<HTMLDivElement>(null);
    const [heightItem, setHeightItem] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [params, setParams] = useState({
        limit: 10,
        page: 1,
        search: '',
    });
    useEffect(() => {
        if (ref && ref.current) {
            setHeightItem(ref.current.offsetWidth);
        }
    }, [ref]);
    useEffect(() => {
        async function itemList() {
            await dispatch<any>(
                getItemList({
                    queries: params,
                })
            );
        }
        itemList();
    }, [dispatch, params]);
    return (
        <CardBasic colSpan="col-span-12" title="Items" subtitle="List Items">
            <Dialog
                open={openDialog}
                closeOnOutsideClick={false}
                onClose={() => setOpenDialog(false)}
                closeButton
            >
                <DialogTitle>Add New Item</DialogTitle>
                <FormCreateItem />
            </Dialog>
            <div className="relative grid w-full grid-cols-10 gap-4">
                <div className="absolute -top-13 right-4 m-auto size-8">
                    <ButtonIcon
                        icon="ic:round-plus"
                        iconSize={24}
                        type="button"
                        onClick={() => setOpenDialog(true)}
                    />
                </div>
                {itemState?.list?.loading ? (
                    <Spinner color="accent" size="lg" />
                ) : itemState.list?.data?.data ? (
                    itemState.list.data.data.map((data: any) => (
                        <div
                            className="group relative col-span-2 rounded-md border-accent-light/30 p-4 dark:border-accent-dark/30"
                            style={{
                                borderWidth: '1px',
                                minHeight: `${heightItem}px`,
                                backgroundImage: `url('${badgeName(data.tier)?.background}')`,
                                backgroundSize: '120%',
                                backgroundPosition: 'top center',
                            }}
                            key={data.name}
                        >
                            <div className="absolute inset-0 z-99 m-auto flex size-full items-center justify-center gap-4 bg-dark-3/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                <div className="size-8">
                                    <ButtonIcon
                                        icon="material-symbols:edit-outline-rounded"
                                        iconSize={24}
                                        type="button"
                                    />
                                </div>
                                <div className="size-8">
                                    <ButtonIcon
                                        icon="material-symbols:delete-outline-rounded"
                                        iconSize={24}
                                        type="button"
                                        color="error"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <img
                                    src={data.image}
                                    className="m-auto w-full"
                                    alt={`${data.name}-${data.tier}`}
                                />
                            </div>
                            <div
                                className={`text-center ${badgeName(data.tier)?.badgeText}`}
                            >
                                <p className="ty-body-sm">{`${data.tier}`}</p>
                                <p className="ty-body">{data.name}</p>
                                <p className="ty-body" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-12">No data to display</div>
                )}
            </div>
            <Pagination
                params={params}
                setParams={setParams}
                totalPage={itemState.list.data.totalData && numberCeil(
                    itemState.list.data.totalData / params.limit || 0
                )}
                total={itemState?.list?.data?.totalData}
                loading={false}
            />
        </CardBasic>
    );
};

export default ItemList;
