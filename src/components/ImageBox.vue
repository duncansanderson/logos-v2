<script setup lang="ts">
import { computed } from 'vue';
import IconPete from './icons/IconPete.vue';
import { useColourStore } from '../stores/colour';
const store = useColourStore();

const backgroundColour = computed(() => store.backgroundColour);
const foregroundColour = computed(() => store.foregroundColour);
const imageBoxClasses = computed(
    () => `image-box bg-${backgroundColour.value} fg-${foregroundColour.value}`
);
</script>

<template>
    <div :class="imageBoxClasses">
        <IconPete />
        <!-- <svg
            id="Download"
            x="0px"
            y="0px"
            viewBox="0 0 2000 2000"
            xml:space="preserve"
        >
            <g>
                <path
                    fill="currentColor"
                    d="M697.6,936.6c-27.5-0.6-46.2-0.6-69.3,0c0,26-0.1,54.8-0.1,80.7c23.1-1.5,46.2-2.8,69.3-4c5.5-0.3,7.4-2,7.5-8 c0-20,0.1-40.1,0.1-60.1C705,939.2,703.1,936.5,697.6,936.6z"
                ></path>
                <path
                    fill="currentColor"
                    d="M490.9,808.8v474.9c0,1.3,1.3,2.2,2.5,1.7c106.1-40.8,293.4-68,506.9-68c212.2,0,398.7,26.8,505.1,67.3 c1.2,0.5,2.5-0.4,2.5-1.7V808.8c0-1-0.8-1.9-1.9-1.9H492.8C491.8,806.9,490.9,807.7,490.9,808.8z M770,1012 c-0.1,36.8-17.8,54.9-54.2,57.5c-29.2,2-58.5,4.4-87.7,7c0,30.7-0.1,61.3-0.1,92c0,0.9-0.7,1.7-1.6,1.8c-20.3,2.8-40.7,5.7-61,8.9 c-1.1,0.2-2.2-0.7-2.2-1.8V882.1c0-1,0.8-1.9,1.9-1.9h151c36.4,0.1,54,17.3,54,54.1C770.1,960.2,770,986.1,770,1012z M992.9,882.6 l-14.3,52.6c-0.2,0.8-1,1.4-1.8,1.4c-35,0.1-71.8-0.3-106.8,0c0,16.2,0.4,30.7,0.4,46.9c34.2,0.1,61.5-0.5,92.9-0.7 c1.2,0,2.1,1.1,1.8,2.3c-2.2,8.1-9.5,35-14.3,50.4c-0.2,0.7-0.9,1.2-1.7,1.2c-26.3,0.3-52.9,0.8-79.2,1.6c0,18.2-0.1,36.5-0.1,54.7 c40.3-1.5,80.6-2.3,121-2.5c1.2,0,2.1,1.2,1.8,2.4l-13.8,50.8c-0.2,0.8-0.9,1.4-1.8,1.4c-56.3,0.6-114.3,2.8-170.5,6.7 c-1.1,0.1-2-0.8-2-1.9c0.2-89.3,0.3-178.6,0.5-267.9c0-1,0.8-1.9,1.9-1.9h184.2C992.4,880.3,993.3,881.4,992.9,882.6z  M1222.2,934.8c0,1-0.8,1.9-1.9,1.9c-34.3,0.2-50.3-0.2-69.3,0c0.1,70.4,0.2,140,0.3,210.4c0,1.1-0.9,1.9-2,1.9 c-20.5-1.1-41-1.9-61.4-2.5c-1,0-1.8-0.9-1.8-1.9c-0.1-69.7-0.1-138.1-0.2-207.8c-23.2-0.1-46.4,0-69.5,0c-1,0-1.8-0.8-1.8-1.8 c0-17.2,0-35.6,0-52.7c0-1,0.8-1.8,1.8-1.8l204,0c1,0,1.9,0.8,1.9,1.9V934.8z M1440.6,882.6l-14.3,52.7c-0.2,0.8-1,1.4-1.8,1.4 c-52.3,0.1-63.7,0.1-109.5,0c0,17.1,0.1,37.7,0.1,54.8c29,1.8,55.8,3.2,91.4,5.4c1.2,0.1,2,1.2,1.7,2.3l-13.3,51.8 c-0.2,0.9-1.1,1.5-2,1.4c-31.8-3.7-42.9-4.3-77.7-7.3c0,19.2,0.1,40.7,0.1,59.9c42.6,4.5,81.5,9.1,118.3,15.1 c1.1,0.2,1.8,1.3,1.5,2.3l-14.1,52c-0.2,0.9-1.1,1.5-2.1,1.4c-54.9-8.2-111.7-14.7-166.9-19.6c-1-0.1-1.7-0.9-1.7-1.8 c-0.2-90.7-0.3-181.4-0.5-272.2c0-1,0.8-1.9,1.9-1.9h187.1C1440,880.3,1440.9,881.4,1440.6,882.6z"
                ></path>
            </g>
        </svg> -->
    </div>
</template>

<style scss scoped>
.image-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    max-height: 436px;
    position: relative;
    width: 100%;

    &.bg-blue-sky svg {
        background-color: #85b6c5;
    }

    &.fg-blue-sky svg {
        color: #85b6c5;
    }

    &.bg-buddy-gold svg {
        background-color: #b88a57;
    }

    &.fg-buddy-gold svg {
        color: #b88a57;
    }

    &.bg-calm-blue svg {
        background-color: #eef4f8;
    }

    &.fg-calm-blue svg {
        color: #eef4f8;
    }

    &.bg-claeys-cream svg {
        background-color: #f2e4d6;
    }

    &.fg-claeys-cream svg {
        color: #f2e4d6;
    }

    &.bg-heartland-yellow svg {
        background-color: #f2ba42;
    }

    &.fg-heartland-yellow svg {
        color: #f2ba42;
    }

    &.bg-river-blue svg {
        background-color: #004d80;
    }

    &.fg-river-blue svg {
        color: #004d80;
    }

    &.bg-rust-belt svg {
        background-color: #d34e23;
    }

    &.fg-rust-belt svg {
        color: #d34e23;
    }

    &.bg-strato-blue svg {
        background-color: #1d253c;
    }

    &.fg-strato-blue svg {
        color: #1d253c;
    }

    &.bg-transparent svg {
        background-color: transparent;
    }

    &.fg-transparent svg {
        color: transparent;
    }

    &.bg-truman-brown svg {
        background-color: #653727;
    }

    &.fg-truman-brown svg {
        color: #653727;
    }
}

@media (min-width: 700px) {
    svg {
        height: 80%;
    }
}
</style>
