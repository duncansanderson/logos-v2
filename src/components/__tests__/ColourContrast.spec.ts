import { beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createPinia } from 'pinia';
import ColourContrast from '../ColourContrast.vue';
import { useColourStore } from '@/stores/colour';

const factoryShallowMount = () =>
shallowMount(ColourContrast, {
    global: {
        plugins: [
            createTestingPinia({
                createSpy: vi.fn,
            }),
        ],
    },
});

const colourStore = useColourStore(createPinia());

let wrapper: any;
beforeEach(() => {
    wrapper = factoryShallowMount();
});

describe('ColourContrast', () => {
    it('should render the colour contrast component', () => {
        const ColourContrast = wrapper.find('div[data-test=colour-contrast]');

        expect(ColourContrast.exists()).toBe(true);
    });

    describe(':computed', () => {
        it('should correctly get the background colour', () => {
            expect(wrapper.vm.backgroundColour).toBe(colourStore.backgroundColour);
        });

        it('should correctly get the contrast ratio', () => {
            expect(wrapper.vm.contrastRatio).toBe(colourStore.contrastRatio);
        });

        it('should correctly get the small readability score', () => {
            expect(wrapper.vm.smallReadability).toBe(colourStore.readabilityTests[1].result);
        });

        it('should correctly get the large readability score', () => {
            expect(wrapper.vm.largeReadability).toBe(colourStore.readabilityTests[0].result);
        });
    });
});
