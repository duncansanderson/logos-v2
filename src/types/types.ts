import type { CONTRAST_LEVELS, CONTRAST_SIZES } from '@/constants';

export type Colour = {
    name: string;
    hex: string;
    background: boolean;
    matchingForeground: string[];
};

export type ReadabilityTest = {
    name: string;
    level: ContrastLevel;
    size: ContrastSize;
    result: boolean;
};

type ContrastLevel = typeof CONTRAST_LEVELS[number];
type ContrastSize = typeof CONTRAST_SIZES[number];
