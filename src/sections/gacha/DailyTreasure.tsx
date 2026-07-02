import '@/styles/game.css';

import React, { useState } from 'react';

import { CardBasic } from '@/components/cards';
import { getRandomNumber } from '@/utils/numbers';

const DailyTreasure = () => {
    const [treasure, setTreasure] = useState({
        open: false,
        points: 0,
    });
    const handleOpenTreasure = () => {
        const treasureDiv = document.querySelector('.treasure');
        const randPoint = getRandomNumber({
            min: 0,
            max: 10000,
        });
        if (treasureDiv) {
            treasureDiv.classList.remove('shake');
            treasureDiv.classList.add('shake');
            setTimeout(() => {
                setTreasure({
                    open: true,
                    points: randPoint,
                });
                treasureDiv.classList.remove('box-close');
                treasureDiv.classList.add(
                    randPoint <= 500
                        ? 'box-small'
                        : randPoint > 500 && randPoint <= 2500
                          ? 'box-medium'
                          : randPoint > 2500 && randPoint <= 5000
                            ? 'box-large'
                            : 'box-super'
                );
            }, 2000);
        }
    };
    return (
        <CardBasic colSpan="col-span-4" title="Treasure Box">
            <div className="flex w-full justify-center py-5">
                <button onClick={handleOpenTreasure} type="button">
                    <div className="treasure box-close">
                        <div
                            className={`text-text-gold transition-all duration-300 ${treasure.open ? 'translate-y-0 scale-100' : 'translate-y-[30px] scale-0'}`}
                        >
                            <h2 className="ty-h5 font-extrabold">
                                {treasure.points}
                            </h2>
                            <p className="ty-body">Points</p>
                        </div>
                    </div>
                </button>
            </div>

            <div className="text-center">
                <h2 className="ty-h5 font-bold text-accent-light dark:text-accent-dark">
                    Daily Treasure
                </h2>
                <p>Open Your Lucky Treasure</p>
            </div>
        </CardBasic>
    );
};

export default DailyTreasure;
