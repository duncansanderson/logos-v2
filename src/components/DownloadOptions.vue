<script setup lang="ts">
import { ref } from 'vue';
import { FILE_TYPES, PRESET_SIZES } from '@/constants';
import { download } from '../utils/download';

const emit = defineEmits<{
  (e: 'update', height: number, width: number): void
}>();

const imageHeight = ref(2000);
const imageWidth = ref(2000);
const selectedFileType = ref('');
const selectedSize = ref(PRESET_SIZES[1].name);

const updateSize = () => {
    const selected = PRESET_SIZES.find((size) => size.name === selectedSize.value);
    if (!selected) return;

    imageHeight.value = selected.height;
    imageWidth.value = selected.width;

    emit('update', imageHeight.value, imageWidth.value);
};

const updateSelectedSize = () => {
    const selected = PRESET_SIZES.find((size) =>
        size.height === imageHeight.value && size.width === imageWidth.value
    );

    if (!selected) {
        selectedSize.value = PRESET_SIZES[0].name;
    } else {
        selectedSize.value = selected.name;
    }

    emit('update', imageHeight.value, imageWidth.value);
}

const downloadFile = () => {
    if (selectedFileType.value === '') return; // Show error message.
    // TODO: validate form before download.

    download(imageHeight.value, imageWidth.value, selectedFileType.value);
}
</script>

<template>
    <div
        class="image-download__options"
        data-test="download-options"
    >
        <form @submit.prevent="downloadFile">
            <fieldset>
                <legend>Download options</legend>

                <label for="size">Size</label>
                <select
                    name="size"
                    id="size"
                    v-model="selectedSize"
                    @change="updateSize"
                >
                    <option
                        v-for="size in PRESET_SIZES"
                        :key="size.name"
                        :value="size.name"
                    >
                        {{ size.name }}
                    </option>
                </select>

                <div class="image-size-controls">
                    <label for="height-adjust">Height(px):</label>
                    <input
                        type="number"
                        id="height-adjust"
                        v-model="imageHeight"
                        @change="updateSelectedSize"
                    />

                    <label for="width-adjust">Width(px):</label>
                    <input
                        type="number"
                        id="width-adjust"
                        v-model="imageWidth"
                        @change="updateSelectedSize"
                    />
                </div>

                <label for="size">File type</label>
                <select
                    name="fileType"
                    id="fileType"
                    v-model="selectedFileType"
                >
                    <option value="">Select file type</option>
                    <option
                        v-for="(type, index) in FILE_TYPES"
                        :key="index"
                        :value="type"
                    >
                        {{ type }}
                    </option>
                </select>
            </fieldset>
            <input type="submit" value="Download" />
        </form>
    </div>
</template>
