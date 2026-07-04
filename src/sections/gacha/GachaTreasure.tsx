import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundTreasure from '@/assets/games/background-treasure.png';
import ButtonGame from '@/components/buttons/ButtonGame';
import { CardFlat } from '@/components/cards';
import SlideshowMultiple from '@/components/slideshow/SlideshowMultiple';
import { getGachaItem, getGachaRandom } from '@/redux/actions/gacha';
import { getWalletAmount } from '@/redux/actions/wallet';
import type { Reducers } from '@/redux/types';

const GachaTreasure = () => {
    const dispatch = useDispatch();
    const gachaState = useSelector((state: Reducers) => state.gacha);
    const walletState = useSelector((state: Reducers) => state.wallet);
    const [reward, setReward] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getItem() {
            dispatch<any>(await getGachaItem({}));
        }
        getItem();
    }, [dispatch]);

    const handleOpenGacha = async () => {
        const gachaDiv = document.querySelector('.gacha');
        if (gachaDiv) {
            setLoading(true);
            setReward(false);
            gachaDiv.classList.remove('box-open');
            gachaDiv.classList.add('box-close');
            gachaDiv.classList.remove('shake');
            gachaDiv.classList.add('shake');
            dispatch<any>(
                await getGachaRandom({
                    callback: async () => {
                        dispatch<any>(
                            await getWalletAmount({
                                callback: () => {
                                    setTimeout(() => {
                                        gachaDiv.classList.remove('box-close');
                                        gachaDiv.classList.add('box-open');
                                        gachaDiv.classList.remove('shake');
                                        setReward(true);
                                        setLoading(false);
                                    }, 2000);
                                },
                            })
                        );
                    },
                })
            );
        }
    };
    return (
        <div
            className="relative w-full flex-col justify-center overflow-hidden rounded-lg pb-5"
            style={{
                backgroundImage: `url('${BackgroundTreasure}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <div className="relative h-80 w-full">
                <div className="gacha box-close absolute inset-x-0 bottom-14 m-auto">
                    <div className="translate-y-[100px] scale-0 text-text-gold transition-all duration-300">
                        <h2 className="ty-h5 font-extrabold">2000</h2>
                        <p className="ty-body">Points</p>
                    </div>
                    {reward && (
                        <div className="game-bg-silver reward bounce absolute inset-x-0 -top-20 m-auto">
                            <img
                                src={gachaState?.random?.data?.image}
                                className="w-full scale-[1.7]"
                                alt="item gacha"
                            />
                        </div>
                    )}
                </div>
                <div className="absolute inset-x-0 bottom-0 m-auto flex justify-center gap-2 py-4">
                    <ButtonGame
                        text="Open 1x"
                        type="button"
                        color="gold"
                        size="md"
                        onClick={handleOpenGacha}
                        disabled={
                            !!(
                                walletState?.detail?.data?.balance < 10 ||
                                loading
                            )
                        }
                    />
                    <ButtonGame
                        text="Open 10x"
                        type="button"
                        color="diamond"
                        size="md"
                        disabled={
                            !!(
                                walletState?.detail?.data?.balance < 100 ||
                                loading
                            )
                        }
                    />
                </div>
            </div>
            <div className="grid w-full grid-cols-1 px-5">
                <CardFlat colSpan="col-span-12" title="Gacha Reward List">
                    {gachaState?.item?.loading ? (
                        'Loading'
                    ) : gachaState?.item?.data.length > 0 ? (
                        <SlideshowMultiple
                            data={gachaState.item.data}
                            show={5}
                            ratio="1:1"
                            hoverIncrease
                            peek
                            autoSlide
                        />
                    ) : (
                        'Data error'
                    )}
                </CardFlat>
            </div>
        </div>
    );
};

export default GachaTreasure;
