import React, { useState } from 'react';

import BackgroundTreasure from '@/assets/games/background-treasure.png';
import ItemSilver from '@/assets/games/items/item-gold-guardian-xp.png';
import ButtonGame from '@/components/buttons/ButtonGame';

const GachaTreasure = () => {
    const [reward, setReward] = useState({
        open: false,
        item: '',
    });
    const handleOpenTreasure = () => {
        const gachaDiv = document.querySelector('.gacha');
        if (gachaDiv) {
            gachaDiv.classList.remove('shake');
            gachaDiv.classList.add('shake');
            setTimeout(() => {
                gachaDiv.classList.remove('box-close');
                gachaDiv.classList.add('box-open');
                setReward({
                    open: true,
                    item: 'XP',
                });
            }, 2000);
        }
    };
    return (
        <div
            className="relative flex w-full justify-center rounded-lg"
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
                    {reward.open && (
                        <div className="game-bg-silver reward bounce absolute inset-x-0 -top-20 m-auto">
                            <img
                                src={ItemSilver}
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
                        onClick={handleOpenTreasure}
                    />
                    <ButtonGame
                        text="Open 10x"
                        type="button"
                        color="diamond"
                        size="md"
                    />
                </div>
            </div>
        </div>
    );
};

export default GachaTreasure;
