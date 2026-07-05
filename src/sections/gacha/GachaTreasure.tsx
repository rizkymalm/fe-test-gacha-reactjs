import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundTreasure from '@/assets/games/background-treasure.png';
import ButtonGame from '@/components/buttons/ButtonGame';
import { CardFlat } from '@/components/cards';
import { Dialog, DialogContent } from '@/components/dialogs';
import SlideshowMultiple from '@/components/slideshow/SlideshowMultiple';
import { getGachaItem } from '@/redux/actions/gacha';
import type { Reducers } from '@/redux/types';

import GachaAnimation from './GachaAnimation';

const GachaTreasure = () => {
    const dispatch = useDispatch();
    const gachaState = useSelector((state: Reducers) => state.gacha);
    const walletState = useSelector((state: Reducers) => state.wallet);
    const [dialogGacha, setDialogGacha] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        async function getItem() {
            dispatch<any>(await getGachaItem({}));
        }
        getItem();
    }, [dispatch]);

    const handleOpenGacha = async (gachaCount: number) => {
        setDialogGacha(true);
        setCount(gachaCount);
    };
    const handleCloseDialog = (data: boolean) => {
        setDialogGacha(data);
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
            <Dialog
                open={dialogGacha}
                onClose={() => {
                    setDialogGacha(false);
                }}
                closeOnOutsideClick={false}
                animation="slide-up"
                width="xs"
            >
                <DialogContent padding="dense">
                    <GachaAnimation
                        count={count}
                        onCloseDialog={handleCloseDialog}
                    />
                </DialogContent>
            </Dialog>
            <div className="relative h-80 w-full">
                <div className="gacha-static box-close absolute inset-x-0 bottom-14 m-auto">
                    <div className="translate-y-[100px] scale-0 text-text-gold transition-all duration-300">
                        <h2 className="ty-h5 font-extrabold">2000</h2>
                        <p className="ty-body">Points</p>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 m-auto flex justify-center gap-2 py-4">
                    <ButtonGame
                        text="Open 1x"
                        type="button"
                        color="gold"
                        size="md"
                        onClick={() => handleOpenGacha(1)}
                        disabled={!!(walletState?.detail?.data?.balance < 10)}
                    />
                    <ButtonGame
                        text="Open 10x"
                        type="button"
                        color="diamond"
                        size="md"
                        disabled={!!(walletState?.detail?.data?.balance < 100)}
                        onClick={() => handleOpenGacha(10)}
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
