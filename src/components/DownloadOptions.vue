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

                <div class="input-group">
                    <label for="size">File type</label>
                    <select
                        class="form-select"
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
                </div>

                <div class="input-group">
                    <label for="size">Size</label>
                    <select
                        class="form-select"
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
                </div>

                <div class="image-size-control">
                    <div class="input-group">
                        <label for="height-adjust">Height:</label>
                        <input
                            class="form-input"
                            type="number"
                            id="height-adjust"
                            v-model="imageHeight"
                            max="10000"
                            min="50"
                            @change="updateSelectedSize"
                        />
                        <span class="input-group__text">px</span>
                    </div>

                    <div class="input-group">
                        <label for="width-adjust">Width:</label>
                        <input
                            class="form-input"
                            type="number"
                            id="width-adjust"
                            v-model="imageWidth"
                            max="10000"
                            min="50"
                            @change="updateSelectedSize"
                        />
                        <span class="input-group__text">px</span>
                    </div>
                </div>
            </fieldset>
            <input
                type="submit"
                value="Download"
                class="btn"
            />
        </form>
    </div>
</template>

<style scss scoped>
.input-group {
    margin-bottom: 1rem;
    position: relative;
    width: 100%;
}

.input-group__text {
    background-color: #f8f9fa;
    border: 1px solid black;
    border-left: none;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: #000;
    display: inline-block;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: .375rem .75rem;
    text-align: center;
    white-space: nowrap;
}

.form-input,
.form-select {
    border: 1px solid #000;
    border-radius: 5px;
    display: block;
    font-size: 1rem;
    line-height: 1.5;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
}

.form-input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    display: inline-block;
    width: 84%;
}

.form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e"), url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e"), none;
    background-position: right 0.75rem center;
    background-repeat: no-repeat;
    background-size: 16px 12px;
    width: 100%;
}

.image-size-control {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
}

.btn {
    background-color: #0d6efd;
    border: 3px solid #0d6efd;
    border-radius: 7px;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #fff;
        color: #0d6efd;
    }
}

label {
    display: block;
}
</style>
