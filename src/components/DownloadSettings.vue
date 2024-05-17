<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { BModal } from 'bootstrap-vue-next';
import { COLOURS, PRESET_SIZES } from '@/constants';
import { useColourStore } from '@/stores/colour';
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';

const colourStore = useColourStore();
const modalStore = useModalStore();

const showModal = ref(false);
const selectedSize = ref('Square (2000x2000)');
// const imageTooBig = ref(false);
// const imageTooSmall = ref(false);
// const pngDownloadLink = ref('#');
// const jpgDownloadLink = ref('#');
// const canvas = ref(null);

const imageHeight = computed(() => modalStore.imageHeight);
const imageWidth = computed(() => modalStore.imageWidth);
const svgDownloadLink = computed(() => modalStore.svgDownloadLink);
const pngDownloadLink = computed(() => modalStore.pngDownloadLink);
const jpgDownloadLink = computed(() => modalStore.jpgDownloadLink);

const { backgroundColour, foregroundColour } = storeToRefs(colourStore);

const openModal = () => {
    showModal.value = true;
};

const updateSize = () => modalStore.updateSize(selectedSize.value);

const handleKeyup = () => {
    console.log('handle keyup');
};

onMounted(() => {
    modalStore.createDownloadLinks();
});
</script>

<template>
    <div class="image-download__options">
        <label for="size">Size</label>
        <select name="size" id="size" v-model="selectedSize" @change="updateSize">
            <option v-for="size in PRESET_SIZES" :key="size.name" :value="size.name">
                {{ size.name }}
            </option>
        </select>
        <div class="image-size-controls">
            <label for="width-adjust">
                W
                <input type="text" id="width-adjust" :value="imageWidth" @keyup="handleKeyup" />
                px
            </label>
            <label for="height-adjust">
                H
                <input type="text" id="height-adjust" :value="imageHeight" @keyup="handleKeyup" />
                px
            </label>
        </div>

        <!-- <div class="size-error" v-if="imageTooBig">
            Too big. Try a size smaller than 10,000px
        </div>
        <div class="size-error" v-if="imageTooSmall">
            Too small. Try a size larger than 50px
        </div> -->

        <div class="image-download_buttons">
            <a
                :href="svgDownloadLink"
                class="image-download__button svg-download"
                download="logo.svg"
            >
                SVG
            </a>
            <a
                :href="pngDownloadLink"
                class="image-download__button png-download"
                download="logo.png"
            >
                PNG
            </a>
            <a
                v-if="backgroundColour != 'transparent'"
                :href="jpgDownloadLink"
                class="image-download__button jpg-download"
                download="logo.jpg"
            >
                JPG
            </a>
        </div>
    </div>
</template>
