import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CardBasic } from '@/components/cards';
import { Spinner } from '@/components/features';
import { getUserInventory, getUserLatestInventory } from '@/redux/actions/user';
import type { Reducers } from '@/redux/types';
import { badgeName } from '@/utils/badge';

const MyInventory = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const [params] = useState({
        page: 1,
        limit: 10,
    });
    useEffect(() => {
        async function getMyInventory() {
            await dispatch<any>(
                getUserInventory({
                    queries: {
                        page: 1,
                        limit: 6,
                    },
                })
            );
            await dispatch<any>(
                getUserLatestInventory({
                    queries: params,
                })
            );
        }
        getMyInventory();
    }, [dispatch, params]);

    return (
        <div className="grid-cols col-span-5 grid gap-2">
            <CardBasic
                colSpan="col-span-12"
                title="My Items"
                subtitle="Top tier items"
            >
                <div className="grid w-full grid-cols-12 gap-2">
                    {userState?.inventory?.loading ? (
                        <Spinner size="lg" color="accent" />
                    ) : userState?.inventory?.data?.data ? (
                        userState?.inventory?.data?.data.map((item: any) => (
                            <div
                                className="relative col-span-4 flex flex-col gap-4 rounded-xl border-accent-light/30 p-4 dark:border-accent-dark/30"
                                style={{
                                    borderWidth: '1px',
                                    backgroundImage: `url('${badgeName(item.items?.tier)?.background}')`,
                                    backgroundSize: '120%',
                                    backgroundPosition: 'top center',
                                }}
                            >
                                <div className="relative">
                                    <img
                                        src={item.items?.image}
                                        className="m-auto w-1/2"
                                        alt={item.items.name}
                                    />
                                </div>
                                <div
                                    className={`text-center ${badgeName(item.items?.tier)?.badgeText}`}
                                >
                                    <p className="ty-body-sm">
                                        {item.items?.tier}
                                    </p>
                                    <p className="ty-body">
                                        {item.items?.name}
                                    </p>
                                    <p className="ty-caption font-bold">
                                        {item.quantity} items collected
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        ''
                    )}
                </div>
            </CardBasic>
            <CardBasic
                colSpan="col-span-12"
                title="Recent Items"
                subtitle="Recent Pulls"
            >
                <ul className="custom-scrollbar max-h-60 w-full overflow-auto">
                    {userState?.latestInventory?.loading ? (
                        'Loading'
                    ) : userState?.latestInventory?.data.data ? (
                        userState?.latestInventory?.data.data.map(
                            (item: any) => (
                                <li className="flex items-center gap-3 px-2 py-1 hover:bg-accent-dark/20">
                                    <div
                                        className="flex size-10 justify-center rounded-md border-accent-light/30 dark:border-accent-dark/30"
                                        style={{
                                            borderWidth: '1px',
                                            backgroundImage: `url('${badgeName(item.items?.tier)?.background}')`,
                                            backgroundSize: '120%',
                                            backgroundPosition: 'top center',
                                        }}
                                    >
                                        <img
                                            src={item.items.image}
                                            className="m-auto w-[90%]"
                                            alt={item.items.name}
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <img
                                            src={
                                                badgeName(item.items?.tier)
                                                    ?.image
                                            }
                                            className="m-auto size-8"
                                            alt={`tier-${item.items.tier}`}
                                        />
                                    </div>
                                    <div className="flex flex-grow justify-between">
                                        <p className="ty-body">
                                            {item.items.name}
                                        </p>
                                        <p className="ty-caption">
                                            {moment(item.createdAt).fromNow()}
                                        </p>
                                    </div>
                                </li>
                            )
                        )
                    ) : (
                        <li>N</li>
                    )}
                </ul>
            </CardBasic>
        </div>
    );
};

export default MyInventory;
