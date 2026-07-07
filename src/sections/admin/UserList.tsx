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
import { getUserList } from '@/redux/actions/user';
import type { Reducers } from '@/redux/types';
import { numberCeil } from '@/utils/numbers';

const UserList = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const [params, setParams] = useState({
        search: '',
        page: 1,
        limit: 10,
    });
    useEffect(() => {
        async function userListGet() {
            await dispatch<any>(
                getUserList({
                    queries: params,
                })
            );
        }
        userListGet();
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
                        totalPage={
                            userState?.list?.data?.totalData &&
                            numberCeil(
                                userState.list.data.totalData / params.limit ||
                                    0
                            )
                        }
                        total={userState?.list?.data?.totalData}
                        loading={false}
                    />
                }
            >
                <Table fullWidth>
                    <Thead sticky>
                        <Tr zebra>
                            <Th align="left">Name</Th>
                            <Th align="left">Email</Th>
                            <Th>Balance</Th>
                            <Th>Role</Th>
                            <Th>Created Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {userState?.list?.loading ? (
                            <Tr>
                                <Td colSpan={4}>Loading</Td>
                            </Tr>
                        ) : userState?.list?.data?.data ? (
                            userState?.list?.data?.data.map((data: any) => (
                                <Tr hover zebra>
                                    <Td>
                                        <div className="flex flex-col">
                                            <p>{`${data.firstName} ${data.lastName}`}</p>
                                            <p className="ty-label">
                                                {data.username}
                                            </p>
                                        </div>
                                    </Td>
                                    <Td>{data.email}</Td>
                                    <Td align='center'>{data.wallets[0].balance}</Td>
                                    <Td align="center">{data.roles.role}</Td>
                                    <Td align="center">
                                        {moment(data.createdAt).format(
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

export default UserList;
