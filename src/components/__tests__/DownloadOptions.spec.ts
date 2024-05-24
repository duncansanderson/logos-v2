import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DownloadOptions from '../DownloadOptions.vue';
import { PRESET_SIZES } from '@/constants';

const factoryShallowMount = () => shallowMount(DownloadOptions);

let wrapper: any;
beforeEach(() => {
    wrapper = factoryShallowMount();
});

describe('Download options', () => {
    it('should render the download options component', () => {
        const component = wrapper.find('div[data-test=download-options]');
        expect(component.exists()).toBe(true);
    });

    describe(':methods', () => {
        it('should update the selectedSize when an icon size is selected', async () => {
            const iconSizeSelect = wrapper.find('#size');
            await iconSizeSelect.setValue(PRESET_SIZES[2].name);

            expect(wrapper.vm.selectedSize).toBe(PRESET_SIZES[2].name);
        });

        it('should update the imageHeight value when an icon size is selected', async () => {
            const iconSizeSelect = wrapper.find('#size');
            await iconSizeSelect.setValue(PRESET_SIZES[2].name);

            expect(wrapper.vm.imageHeight).toBe(PRESET_SIZES[2].height);
        });

        it('should update the imageWidth value when an icon size is selected', async () => {
            const iconSizeSelect = wrapper.find('#size');
            await iconSizeSelect.setValue(PRESET_SIZES[2].name);

            expect(wrapper.vm.imageWidth).toBe(PRESET_SIZES[2].width);
        });

        it('should update the selectedSize when the icon height and width are updated', async () => {
            const iconHeight = wrapper.find('#height-adjust');
            const iconWidth = wrapper.find('#width-adjust');
            await iconHeight.setValue(PRESET_SIZES[2].height);
            await iconWidth.setValue(PRESET_SIZES[2].width);

            expect(wrapper.vm.selectedSize).toBe(PRESET_SIZES[2].name);
        });

        it('should set selectedSize to `custom` when the height doesn\'t match a preset size', async () => {
            const iconHeight = wrapper.find('#height-adjust');
            await iconHeight.setValue(2001);

            expect(wrapper.vm.selectedSize).toBe(PRESET_SIZES[0].name);
        });

        it('should set selectedSize to `custom` when the width doesn\'t match a preset size', async () => {
            const iconWidth = wrapper.find('#width-adjust');
            await iconWidth.setValue(2001);

            expect(wrapper.vm.selectedSize).toBe(PRESET_SIZES[0].name);
        });
    });
})

