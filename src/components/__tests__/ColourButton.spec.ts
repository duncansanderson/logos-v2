import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ColourButton from '../ColourButton.vue';

const factoryMount = () => mount(ColourButton, {
    props: {
        class: 'test',
        colour: {
            name: 'blue-sky',
            hex: '#85b6c5',
            background: true,
            matches: ['#1d253c', '#653727', 'transparent'],
        },
    },
});

describe('ColourButton', () => {
    it('renders a button', () => {
        const wrapper = factoryMount();

        expect(wrapper.text()).toContain('blue-sky');
    });
});
