export const COLOURS = [
    {
        name: 'blue-sky',
        hex: '#85b6c5',
        background: true,
        matchingForeground: [
            'strato-blue',
            'truman-brown',
            'transparent',
        ],
    },
    {
        name: 'buddy-gold',
        hex: '#b88a57',
        background: true,
        matchingForeground: [
            'strato-blue',
            'transparent',
        ],
    },
    {
        name: 'calm-blue',
        hex: '#eef4f8',
        background: true,
        matchingForeground: [
            'strato-blue',
            'river-blue',
            'rust-belt',
            'truman-brown',
            'transparent',
        ],
    },
    {
        name: 'claeys-cream',
        hex: '#f2e4d6',
        background: true,
        matchingForeground: [
            'strato-blue',
            'river-blue',
            'rust-belt',
            'truman-brown',
            'transparent',
        ],
    },
    {
        name: 'heartland-yellow',
        hex: '#f2ba42',
        background: true,
        matchingForeground: [
            'strato-blue',
            'river-blue',
            'truman-brown',
            'transparent',
        ],
    },
    {
        name: 'river-blue',
        hex: '#004d80',
        background: true,
        matchingForeground: [
            'claeys-cream',
            'heartland-yellow',
            'calm-blue',
            'transparent',
        ],
    },
    {
        name: 'rust-belt',
        hex: '#d34e23',
        background: true,
        matchingForeground: [
            'river-blue',
            'transparent',
        ],
    },
    {
        name: 'strato-blue',
        hex: '#1d253c',
        background: true,
        matchingForeground: [
            'claeys-cream',
            'heartland-yellow',
            'calm-blue',
            'blue-sky',
            'rust-belt',
            'buddy-gold',
            'transparent',
        ],
    },
    {
        name: 'transparent',
        hex: 'transparent',
        background: true,
        matchingForeground: [],
    },
    {
        name: 'truman-brown',
        hex: '#653727',
        background: true,
        matchingForeground: [
            'claeys-cream',
            'heartland-yellow',
            'calm-blue',
            'blue-sky',
            'transparent',
        ],
    },
];

export const PRESET_SIZES = [
    {
        name: 'Custom',
        height: 0,
        width: 0,
    },
    {
        name: 'Square (2000x2000)',
        height: 2000,
        width: 2000,
    },
    {
        name: 'Desktop (5120x2880)',
        height: 2880,
        width: 5120,
    },
    {
        name: 'Mobile (1080x1920)',
        height: 1920,
        width: 1080,
    },
    {
        name: 'Banner (4500x1500)',
        height: 1500,
        width: 4500,
    },
];

export const MODAL_ERROR_MESSAGES = {
    'image-too-big': 'Too big. Try a size smaller than 10,000px',
    'image-too-small': 'Too small. Try a size larger than 50px',
};

export const FILE_TYPES = [
    'svg',
    'png',
    'jpeg',
];
