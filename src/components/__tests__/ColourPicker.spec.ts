import { beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createPinia } from 'pinia';
import ColourPicker from '../ColourPicker.vue';
import { useColourStore } from '@/stores/colour';

const factoryShallowMount = () =>
shallowMount(ColourPicker, {
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

describe('ColourPicker', () => {
    it('should render the colour contrast component', () => {
        const ColourPicker = wrapper.find('div[data-test=colour-picker]');

        expect(ColourPicker.exists()).toBe(true);
    });

    describe(':computed', () => {
        it('should correctly get the background colour', () => {
            expect(wrapper.vm.backgroundColour).toBe(colourStore.backgroundColour);
        });

        it('should correctly get the foreground colour', () => {
            expect(wrapper.vm.foregroundColour).toBe(colourStore.foregroundColour);
        });

        it('should correctly get the colour filter list', async () => {
            const colourFilter = await colourStore.colourFilter();

            setTimeout(() => {
                expect(wrapper.vm.colourFilter).toBe(colourFilter);
            }, 500);
        });
    });

    describe(':methods', () => {
        it('should call the `updateColours` method when a background ColourButton is clicked ', async () => {
            const mockUpdateColours = vi.spyOn(wrapper.vm, 'updateColours');
            const colourButton = wrapper.findComponent('#colour-picker__backgroundColour-1');

            colourButton.vm.$emit('click');

            setTimeout(() => {
                expect(mockUpdateColours).toHaveBeenCalled();
            }, 500);
        });

        it('should call the `updateForegroundColours` method when a foreground ColourButton is clicked ', async () => {
            const mockUpdateForegroundColours = vi.spyOn(wrapper.vm, 'updateForegroundColour');
            const colourButton = await wrapper.findComponent('#colour-picker__foregroundColour-1');

            setTimeout(() => {
                colourButton.trigger('click');
                expect(mockUpdateForegroundColours).toHaveBeenCalled();
            }, 500);
        });
    });
});
