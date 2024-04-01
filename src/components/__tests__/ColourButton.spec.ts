import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ColourButton from '../ColourButton.vue';

const propClass = 'colour-picker__colour';
const propColourName = 'red';

const factoryShallowMount = (propsData: any = {}) =>
    shallowMount(ColourButton, {
        propsData: {
            class: propClass,
            'colour-name': propColourName,
            ...propsData,
        },
    });

let wrapper: any;
beforeEach(() => {
    wrapper = factoryShallowMount();
});

describe('ColourButton', () => {
    it('should render a colour button', () => {
        const colourButton = wrapper.find('div[data-test=colour-button]');

        expect(colourButton.exists()).toBe(true);
    });

    describe(':props', () => {
        it('should render `class` passed to component'),
            () => {
                expect(wrapper.text()).toContain(propClass);
            };

        it('should render `colour-name` paseed to component', () => {
            expect(wrapper.text()).toContain(propColourName);
        });
    });

    describe(':emits', () => {
        it('should emit `click` when the button is clicked', () => {
            const colourButton = wrapper.find('button');
            colourButton.trigger('click');

            expect(wrapper.emitted().click).toBeTruthy();
        });
    });
});
