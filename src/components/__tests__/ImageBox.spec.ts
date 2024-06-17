import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { createPinia } from 'pinia';
import ImageBox from '../ImageBox.vue';
import { useColourStore } from '@/stores/colour';

const factoryShallowMount = () =>
    shallowMount(ImageBox, {
        global: {
            plugins: [
                createTestingPinia({
                    createSpy: vi.fn,
                }),
            ],
        },
    });

const factoryMount = () =>
    mount(ImageBox, {
        global: {
            plugins: [
                createTestingPinia({
                    createSpy: vi.fn,
                }),
            ],
        },
    });

const colourStore = useColourStore(createPinia());

describe('ImageBox', () => {
    it('should render an image box component', () => {
        const wrapper = factoryShallowMount();
        const imageBox = wrapper.find('div[data-test=image-box]');

        expect(imageBox.exists()).toBe(true);
    });

    describe(':computed', () => {
        it('should correctly set the background colour', () => {
            const wrapper = factoryShallowMount();
            expect(wrapper.vm.backgroundColour).toBe(colourStore.backgroundColour);
        });

        it('should correctly set the foreground colour', () => {
            const wrapper = factoryShallowMount();
            expect(wrapper.vm.foregroundColour).toBe(colourStore.foregroundColour);
        });

        it('should correctly set the imageBoxClasses', () => {
            const wrapper = factoryShallowMount();
            expect(wrapper.vm.imageBoxClasses).toBe(`image-box bg-${colourStore.backgroundColour} fg-${colourStore.foregroundColour}`)
        })
    });

    describe(':methods', () => {
        it('should call the `updateIconSize` method when the DownloadOption component emits `update`', async () => {
            const wrapper = factoryMount();
            const mockUpdateIconSize = vi.spyOn(wrapper.vm, 'updateIconSize');

            const downloadOptionComponent = wrapper.findComponent({
                name: 'DownloadOptions',
            });

            downloadOptionComponent.vm.$emit('update');

            setTimeout(() => {
                expect(mockUpdateIconSize).toHaveBeenCalled();
            }, 500);
        });
    });
});
