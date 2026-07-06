import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonIcon, ButtonPrimary } from '@/components/buttons';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@/components/dialogs';
import { Popover } from '@/components/features';
import Pagination from '@/components/tables/Pagination';
import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@/components/tables/Table';
import { getEventList, patchEventUpdateStatus } from '@/redux/actions/event';
import type { Reducers } from '@/redux/types';

const EventList = () => {
    const dispatch = useDispatch();
    const eventState = useSelector((state: Reducers) => state.event);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selected, setSelected] = useState(-1);
    const [dialogConfirmation, setDialogConfirmation] = useState(false);
    const [params, setParams] = useState({
        search: '',
        page: 1,
        limit: 10,
    });
    const handleUpdateStatus = async (id: string, status: string) => {
        await dispatch<any>(
            patchEventUpdateStatus({
                data: {
                    status,
                },
                id,
                callback: async () => {
                    dispatch<any>(
                        getEventList({
                            queries: {
                                page: 1,
                                limit: 10,
                            },
                            callback: () => {
                                setDialogConfirmation(false);
                            },
                        })
                    );
                },
            })
        );
    };
    useEffect(() => {
        async function eventListData() {
            await dispatch<any>(
                getEventList({
                    queries: params,
                })
            );
        }
        eventListData();
    }, [dispatch, params]);

    return (
        <div className="col-span-12">
            <Dialog
                open={dialogConfirmation}
                onClose={() => setDialogConfirmation(false)}
                animation="scale"
                width="sm"
            >
                <DialogTitle>Change Status!</DialogTitle>
                <DialogContent>
                    <p className="ty-body">
                        Are you sure want to{' '}
                        {eventState?.list?.data[selected]?.status === 'ACTIVE'
                            ? 'Deactivate'
                            : 'Activate'}{' '}
                        this event?
                    </p>
                    <p className="ty-label">
                        {eventState?.list?.data[selected]?.status ===
                            'INACTIVE' &&
                            'If you activate this event, other running event will be automatically change to INACTIVE'}
                    </p>
                </DialogContent>
                <DialogActions>
                    <ButtonPrimary
                        text="Cancel"
                        type="button"
                        size="sm"
                        variant="outline"
                        fullWidth
                    />
                    <ButtonPrimary
                        text="Yes"
                        type="button"
                        size="sm"
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            handleUpdateStatus(
                                eventState?.list?.data[selected]?._id,
                                eventState?.list?.data[selected]?.status ===
                                    'INACTIVE'
                                    ? 'ACTIVE'
                                    : 'INACTIVE'
                            );
                        }}
                    />
                </DialogActions>
            </Dialog>
            <Popover
                open={!!anchorEl}
                anchorRef={{ current: anchorEl }}
                placement="left"
                onClickOutside={() => setAnchorEl(null)}
                maxWidth="sm"
            >
                <ul className="w-full">
                    <li className="hover:bg-accent-light/20 hover:dark:bg-accent-dark/20">
                        <button
                            className={`flex size-full items-center gap-4 px-4 py-2 text-left align-middle ${eventState?.list?.data[selected]?.status === 'ACTIVE' ? 'text-red' : 'text-accent-light'}`}
                            type="button"
                            onClick={() => {
                                setAnchorEl(null);
                                setDialogConfirmation(true);
                            }}
                        >
                            <Icon
                                icon="ic:outline-change-circle"
                                width={18}
                                height={18}
                            />
                            {eventState?.list?.data[selected]?.status ===
                            'ACTIVE'
                                ? 'Deactivate'
                                : 'Activate'}
                        </button>
                    </li>
                    <li className="hover:bg-accent-light/20 hover:dark:bg-accent-dark/20">
                        <button
                            className="flex size-full items-center gap-4 px-4 py-2 text-left align-middle"
                            type="button"
                            onClick={() => {
                                window.location.href = `/admin/event/detail/${eventState?.list?.data[selected]?._id}`;
                            }}
                        >
                            <Icon
                                icon="hugeicons:view"
                                width={18}
                                height={18}
                            />
                            <p>View Detail</p>
                        </button>
                    </li>
                </ul>
            </Popover>
            <TableContainer
                colSpan="col-span-12"
                title="Event"
                subtitle="List Event"
                padding="dense"
                sticky
                className="max-h-70"
                contentAfter={
                    <Pagination
                        params={params}
                        setParams={setParams}
                        totalPage={2}
                        total={10}
                        loading={false}
                    />
                }
            >
                <Table fullWidth>
                    <Thead sticky>
                        <Tr zebra>
                            <Th align="left">Event Name</Th>
                            <Th align="left">Description</Th>
                            <Th>Status</Th>
                            <Th />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {eventState?.list?.loading ? (
                            <Tr>
                                <Td colSpan={4}>Loading</Td>
                            </Tr>
                        ) : eventState?.list?.data ? (
                            eventState?.list?.data.map(
                                (item: any, index: number) => (
                                    <Tr hover zebra>
                                        <Td>{item.event}</Td>
                                        <Td>{item.description}</Td>
                                        <Td align="center">{item.status}</Td>
                                        <Td align="center">
                                            <ButtonIcon
                                                icon="mdi:dots-vertical"
                                                type="button"
                                                iconSize={18}
                                                onMouseDown={event =>
                                                    event.stopPropagation()
                                                }
                                                onClick={(e: any) => {
                                                    setAnchorEl(null);
                                                    setAnchorEl(
                                                        e.currentTarget
                                                    );
                                                    setSelected(index);
                                                }}
                                            />
                                            {/* <Icon icon="mdi:dots-vertical" /> */}
                                        </Td>
                                    </Tr>
                                )
                            )
                        ) : (
                            <Tr>
                                <Td colSpan={4}>No data to display</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EventList;
