import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CardBasic, CardFlat } from '@/components/cards';
import Page from '@/components/Page';
import { getEventActive } from '@/redux/actions/event';
import type { Reducers } from '@/redux/types';
import GachaTreasure from '@/sections/gacha/GachaTreasure';
import MyInventory from '@/sections/gacha/MyInventory';

const GachaPage = () => {
    const dispatch = useDispatch();
    const eventState = useSelector((state: Reducers) => state.event);
    useEffect(() => {
        async function activeEvent() {
            await dispatch<any>(getEventActive({}));
        }
        activeEvent();
    }, [dispatch]);

    return (
        <Page title="Dashboard Home | Revenue">
            <div className="min-h-screen w-full items-center justify-center p-2 text-text-light-primary dark:text-text-dark-primary">
                {/* <Title title="Gacha" subtitle="Claim your reward" /> */}
                <div className="flex w-full gap-2">
                    <div className="grid w-full grid-cols-12 gap-4">
                        {eventState?.active?.data?.data && (
                            <CardFlat colSpan="col-span-12" padding="dense">
                                <div
                                    className="h-40 w-full rounded-xl"
                                    style={{
                                        backgroundImage: `url('${eventState?.active?.data?.data.image}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'top center',
                                    }}
                                />
                            </CardFlat>
                        )}
                        <CardBasic
                            colSpan="col-span-7"
                            title="Gacha"
                            subtitle="Open the Gacha Treasure Chest and get amazing items!"
                        >
                            {eventState?.active?.data ? (
                                <GachaTreasure />
                            ) : (
                                <div className="flex size-full items-center justify-center">
                                    No gacha event to display
                                </div>
                            )}
                        </CardBasic>
                        <MyInventory />
                        {/* <DailyTreasure /> */}
                        <CardBasic colSpan="col-span-12" title="How it works?">
                            <ul className="ty-body-sm w-full">
                                <li className="flex content-center">
                                    <Icon
                                        icon="boxicons:arrow-right-filled"
                                        width={24}
                                        height={24}
                                    />
                                    <p>
                                        User your coin to pull items from the
                                        gacha treasure
                                    </p>
                                </li>
                                <li className="flex content-center">
                                    <Icon
                                        icon="boxicons:arrow-right-filled"
                                        width={24}
                                        height={24}
                                    />
                                    <p>
                                        Different Items hava different drop
                                        rates
                                    </p>
                                </li>
                                <li className="flex content-center">
                                    <Icon
                                        icon="boxicons:arrow-right-filled"
                                        width={24}
                                        height={24}
                                    />
                                    <p>
                                        The higher the rarity, the lower the
                                        drop rate
                                    </p>
                                </li>
                                <li className="flex content-center">
                                    <Icon
                                        icon="boxicons:arrow-right-filled"
                                        width={24}
                                        height={24}
                                    />
                                    <p>Good luck and happy Gacha!</p>
                                </li>
                            </ul>
                        </CardBasic>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default GachaPage;
