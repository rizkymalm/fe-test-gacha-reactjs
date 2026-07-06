import BadgeBronze from '@/assets/games/badge-bronze.png';
import BadgeDiamond from '@/assets/games/badge-diamond.png';
import BadgeGold from '@/assets/games/badge-gold.png';
import BadgeGrandMaster from '@/assets/games/badge-grandmaster.png';
import BadgeLegend from '@/assets/games/badge-legend.png';
import BadgeMaster from '@/assets/games/badge-master.png';
import BadgePlatinum from '@/assets/games/badge-platinum.png';
import BadgeSilver from '@/assets/games/badge-silver.png';
import BackgroundBronze from '@/assets/games/bg-bronze.png';
import BackgroundDiamond from '@/assets/games/bg-diamond.png';
import BackgroundGold from '@/assets/games/bg-gold.png';
import BackgroundGrandMaster from '@/assets/games/bg-grandmaster.png';
import BackgroundLegend from '@/assets/games/bg-legend.png';
import BackgroundMaster from '@/assets/games/bg-master.png';
import BackgroundPlatinum from '@/assets/games/bg-platinum.png';
import BackgroundSilver from '@/assets/games/bg-silver.png';

export interface BadgeProps {
    name: string;
    image: string;
    background: string;
    particles?: number[];
    badgeText: string;
    badgeBg: string;
}

const badge = [
    {
        name: 'BRONZE',
        minLevel: 1,
        maxLevel: 10,
        image: BadgeBronze,
        background: BackgroundBronze,
        badgeText: 'text-tier-bronze',
        badgeBg: 'bg-tier-bronze',
    },
    {
        name: 'SILVER',
        minLevel: 11,
        maxLevel: 20,
        image: BadgeSilver,
        background: BackgroundSilver,
        badgeText: 'text-tier-silver',
        badgeBg: 'bg-tier-silver',
    },
    {
        name: 'GOLD',
        minLevel: 21,
        maxLevel: 30,
        image: BadgeGold,
        background: BackgroundGold,
        badgeText: 'text-tier-gold',
        badgeBg: 'bg-tier-gold',
    },
    {
        name: 'PLATINUM',
        minLevel: 31,
        maxLevel: 40,
        image: BadgePlatinum,
        background: BackgroundPlatinum,
        badgeText: 'text-tier-platinum',
        badgeBg: 'bg-tier-platinum',
    },
    {
        name: 'DIAMOND',
        minLevel: 41,
        maxLevel: 60,
        image: BadgeDiamond,
        background: BackgroundDiamond,
        particles: [187, 106, 236],
        badgeText: 'text-tier-diamond',
        badgeBg: 'bg-tier-diamond',
    },
    {
        name: 'MASTER',
        minLevel: 61,
        maxLevel: 90,
        image: BadgeMaster,
        background: BackgroundMaster,
        particles: [211, 29, 52],
        badgeText: 'text-tier-master',
        badgeBg: 'bg-tier-master',
    },
    {
        name: 'GRANDMASTER',
        minLevel: 91,
        maxLevel: 120,
        image: BadgeGrandMaster,
        background: BackgroundGrandMaster,
        particles: [103, 158, 230],
        badgeText: 'text-tier-grandmaster',
        badgeBg: 'bg-tier-grandmaster',
    },
    {
        name: 'LEGENDARY',
        minLevel: 121,
        maxLevel: 150,
        image: BadgeLegend,
        background: BackgroundLegend,
        particles: [243, 51, 30],
        badgeText: 'text-tier-legendary',
        badgeBg: 'bg-tier-legend',
    },
];
export function badgeType(level: number) {
    const result: BadgeProps | undefined = badge.find(
        b => level >= b.minLevel && level <= b.maxLevel
    );
    return result;
}

export function badgeName(name: string) {
    const result: BadgeProps | undefined = badge.find(
        item => item.name === name
    );
    return result;
}
