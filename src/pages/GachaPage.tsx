import { Icon } from '@iconify/react';
import React from 'react';

import LuckyGachaBanner from '@/assets/banner/lucky-gacha.png';
import { CardBasic, CardFlat } from '@/components/cards';
import Page from '@/components/Page';
import DailyTreasure from '@/sections/gacha/DailyTreasure';
import GachaTreasure from '@/sections/gacha/GachaTreasure';

const GachaPage = () => {
    return (
        <Page title="Dashboard Home | Revenue">
            <div className="min-h-screen w-full items-center justify-center p-2 text-text-light-primary dark:text-text-dark-primary">
                {/* <Title title="Gacha" subtitle="Claim your reward" /> */}
                <div className="flex w-full gap-2 pr-20">
                    <div className="grid w-full grid-cols-12 gap-4">
                        <CardFlat colSpan="col-span-12" padding="dense">
                            <img
                                src={LuckyGachaBanner}
                                className="rounded-md"
                                alt="gacha banner"
                            />
                        </CardFlat>
                        <CardBasic
                            colSpan="col-span-8"
                            title="Gacha"
                            subtitle="Open the Gacha Treasure Chest and get amazing items!"
                        >
                            <GachaTreasure />
                        </CardBasic>
                        <DailyTreasure />
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
