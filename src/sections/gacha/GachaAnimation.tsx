import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ButtonGame from '@/components/buttons/ButtonGame';
import SpotlightParticlesBadge from '@/components/features/SpotlightParticlesBadge';
import { getGachaRandom } from '@/redux/actions/gacha';
import { getWalletAmount } from '@/redux/actions/wallet';
import type { Reducers } from '@/redux/types';
import { badgeName } from '@/utils/badge';

interface Props {
    count: number;
    onCloseDialog: (data: boolean) => void;
}

export interface BadgeProps {
    name: string;
    image: string;
    background: string;
    particles?: number[];
    badgeText: string;
    badgeBg: string;
}

const GachaAnimation = ({ count, onCloseDialog }: Props) => {
    const dispatch = useDispatch();
    const gachaState = useSelector((state: Reducers) => state.gacha);
    const [reward, setReward] = useState(false);
    const [rewardOrder, setRewardOrder] = useState(-1);
    const [gachaCount, setGachaCount] = useState(-1);
    const [badge, setBadge] = useState<BadgeProps>();
    useEffect(() => {
        function gachaOpen() {
            const gachaDiv = document.querySelector('.gacha');
            if (gachaDiv) {
                setReward(false);
                dispatch<any>(
                    getGachaRandom({
                        queries: {
                            count,
                        },
                        callback: (values: any) => {
                            dispatch<any>(
                                getWalletAmount({
                                    callback: () => {
                                        gachaDiv.classList.remove('box-open');
                                        gachaDiv.classList.add('box-close');
                                        gachaDiv.classList.remove('shake');
                                        gachaDiv.classList.add('shake');
                                        setGachaCount(count - 1);
                                        setRewardOrder(0);
                                        setTimeout(() => {
                                            setBadge(badgeName(values[0].tier));
                                            gachaDiv.classList.remove(
                                                'box-close'
                                            );
                                            gachaDiv.classList.add('box-open');
                                            gachaDiv.classList.remove('shake');
                                            setReward(true);
                                        }, 2000);
                                    },
                                })
                            );
                        },
                    })
                );
            }
        }
        gachaOpen();
    }, [dispatch]);
    const handleNextAnimation = () => {
        const gachaDiv = document.querySelector('.gacha');
        if (gachaDiv) {
            setReward(false);
            gachaDiv.classList.remove('box-open');
            gachaDiv.classList.add('box-close');
            gachaDiv.classList.remove('shake');
            gachaDiv.classList.add('shake');
            setRewardOrder(rewardOrder + 1);
            setTimeout(() => {
                setBadge(
                    badgeName(gachaState?.random?.data[rewardOrder + 1].tier)
                );
                gachaDiv.classList.remove('box-close');
                gachaDiv.classList.add('box-open');
                gachaDiv.classList.remove('shake');
                setReward(true);
            }, 2000);
        }
    };

    return (
        <div
            className="relative m-auto h-125 w-full rounded-xl bg-dark-1"
            style={{
                backgroundImage: badge
                    ? `url('${badge.background}')`
                    : `url('${badgeName('SILVER')?.background}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {badge?.name === 'DIAMOND' || badge?.name === 'LEGENDARY' ? (
                <SpotlightParticlesBadge
                    badge={badge?.particles || [0, 0, 0]}
                />
            ) : (
                ''
            )}
            <div className="gacha box-close absolute inset-0 m-auto">
                <div className="translate-y-[-50px] transition-all duration-300">
                    {reward && rewardOrder !== -1 && (
                        <div className="game-bg-silver reward bounce absolute inset-0 m-auto">
                            <img
                                src={
                                    gachaState?.random?.data[rewardOrder].image
                                }
                                className="w-full scale-[1.7]"
                                alt="item gacha"
                            />
                        </div>
                    )}
                </div>
            </div>
            {reward && rewardOrder !== -1 && (
                <div className="absolute inset-x-0 bottom-32 m-auto">
                    <p
                        className={`ty-body-lg tier-${badge?.name.toLocaleLowerCase()} text-center`}
                    >
                        {gachaState?.random?.data[rewardOrder].name}
                    </p>
                    <p
                        className={`ty-body-sm tier-${badge?.name.toLocaleLowerCase()} text-center`}
                    >
                        {gachaState?.random?.data[rewardOrder].tier}
                    </p>
                </div>
            )}
            <div className="absolute inset-x-0 bottom-18 m-auto flex w-2/5 justify-center">
                {reward && rewardOrder >= gachaCount ? (
                    <ButtonGame
                        text="Claim"
                        size="md"
                        type="button"
                        fullWidth
                        onClick={() => onCloseDialog(false)}
                    />
                ) : reward && rewardOrder < gachaCount ? (
                    <ButtonGame
                        text="Next"
                        size="md"
                        type="button"
                        fullWidth
                        onClick={handleNextAnimation}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default GachaAnimation;
