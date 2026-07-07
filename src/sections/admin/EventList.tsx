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
import { numberCeil } from '@/utils/numbers';

const EventList = () => {
    const dispatch = useDispatch();
    const eventState = useSelector((state: Reducers) => state.event);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selected, setSelected] = useState<number | null>(null);
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
                            queries: params,
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
                        {selected !== null &&
                        eventState?.list?.data?.data[selected]?.status ===
                            'ACTIVE'
                            ? 'Deactivate'
                            : 'Activate'}{' '}
                        this event?
                    </p>
                    <p className="ty-label">
                        {selected !== null &&
                            eventState?.list?.data?.data[selected]?.status ===
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
                        onClick={() => setDialogConfirmation(false)}
                    />
                    <ButtonPrimary
                        text="Yes"
                        type="button"
                        size="sm"
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            if (selected !== null) {
                                handleUpdateStatus(
                                    eventState?.list?.data?.data[selected]?._id,
                                    eventState?.list?.data?.data[selected]
                                        ?.status === 'INACTIVE'
                                        ? 'ACTIVE'
                                        : 'INACTIVE'
                                );
                            }
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
                            className={`flex size-full items-center gap-4 px-4 py-2 text-left align-middle ${selected !== null && eventState?.list?.data?.data[selected]?.status === 'ACTIVE' ? 'text-red' : 'text-accent-light'}`}
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
                            {selected !== null &&
                            eventState?.list?.data?.data[selected]?.status ===
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
                                window.location.href = `/admin/event/detail/${selected !== null && eventState?.list?.data?.data[selected]?._id}`;
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
                className="h-100 max-h-100"
                contentAfter={
                    <Pagination
                        params={params}
                        setParams={setParams}
                        totalPage={eventState?.list?.data?.totalData && numberCeil(
                            eventState.list.data.totalData / params.limit || 0
                        )}
                        total={eventState?.list?.data?.totalData}
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
                        ) : eventState?.list?.data?.data ? (
                            eventState?.list?.data.data.map(
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
                                                    setSelected(index);
                                                    setAnchorEl(null);
                                                    setAnchorEl(
                                                        e.currentTarget
                                                    );
                                                }}
                                            />
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
