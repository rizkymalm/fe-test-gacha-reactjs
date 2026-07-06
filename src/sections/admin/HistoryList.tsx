import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { getHistoryList } from '@/redux/actions/history';
import type { Reducers } from '@/redux/types';
import { numberCeil } from '@/utils/numbers';

const HistoryList = () => {
    const dispatch = useDispatch();
    const historyState = useSelector((state: Reducers) => state.history);
    const [params, setParams] = useState({
        search: '',
        page: 1,
        limit: 10,
    });
    useEffect(() => {
        async function historyGet() {
            await dispatch<any>(
                getHistoryList({
                    queries: params,
                })
            );
        }
        historyGet();
    }, [dispatch, params]);

    return (
        <div className="col-span-12">
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
                        totalPage={numberCeil(
                            historyState.list.data.totalData / params.limit || 0
                        )}
                        total={historyState?.list?.data?.totalData}
                        loading={false}
                    />
                }
            >
                <Table fullWidth>
                    <Thead sticky>
                        <Tr zebra>
                            <Th align="left">User</Th>
                            <Th align="left">Items</Th>
                            <Th>Transaction ID</Th>
                            <Th>Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {historyState?.list?.loading ? (
                            <Tr>
                                <Td colSpan={4}>Loading</Td>
                            </Tr>
                        ) : historyState?.list?.data?.data ? (
                            historyState?.list?.data.data.map((item: any) => (
                                <Tr hover zebra>
                                    <Td>
                                        <div className="flex flex-col">
                                            <p>{`${item.user[0]?.firstName} ${item.user[0]?.lastName}`}</p>
                                            <p className="ty-label">
                                                {item.user[0].email}
                                            </p>
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="flex gap-2">
                                            <img
                                                src={item.items[0]?.image}
                                                alt="aa"
                                                width={30}
                                            />
                                            <div className="flex flex-col">
                                                <p>{item.items[0]?.name}</p>
                                                <p className="ty-label">
                                                    {item.items[0]?.tier}
                                                </p>
                                            </div>
                                        </div>
                                    </Td>
                                    <Td align="center">{item.referenceId}</Td>
                                    <Td align="center">
                                        {moment(item.createdAt).format(
                                            'DD-MMM-YYYY'
                                        )}
                                    </Td>
                                </Tr>
                            ))
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

export default HistoryList;
