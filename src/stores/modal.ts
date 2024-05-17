import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PRESET_SIZES } from '@/constants';
// import { useColourStore } from './colour';

// const colourStore = useColourStore();

export const useModalStore = defineStore('modalStore', () => {
    const imageHeight = ref(2000);
    const imageWidth = ref(2000);
    const svgDownloadLink = ref('');
    const pngDownloadLink = ref('');
    const jpgDownloadLink = ref('');

    // Create the SVG, PNG and JPG download data links.
    const createDownloadLinks = () => {
        const svg = document.querySelector('.image-box__svg')?.innerHTML;

        if (!svg) return;

        const adjusted = setNewSize(svg, imageWidth.value, imageHeight.value);
        const namespaced = addNameSpace(adjusted);
        const escaped = encodeSVG(namespaced);

        svgDownloadLink.value = `data:image/svg+xml,${escaped}`;

        // Create png and jpg links.
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.height = imageHeight.value;
        canvas.width = imageWidth.value;

        const image = new Image();
        image.src = svgDownloadLink.value;

        image.onload = () => {
            ctx?.drawImage(image, 0, 0);
            pngDownloadLink.value = canvas.toDataURL('image/png');
            jpgDownloadLink.value = canvas.toDataURL('image/jpeg');
        };
    };

    // Set the desired download size.
    const setNewSize = (data: string, width: number, height: number) => {
        let x = 0;
        let y = 0;
        let newWidth = 2000;
        let newHeight = 2000;
        let newCanvasWidth = 324;
        let newCanvasHeight = 324;

        if (width > height) {
            newWidth = (width / height) * newHeight;
            newCanvasHeight = (height / width) * newCanvasWidth;
            x = -Math.abs(newHeight / 2 - newWidth / 2);
        } else if (width < height) {
            newHeight = (height / width) * newWidth;
            newCanvasWidth = (width / height) * newCanvasHeight;
            y = -Math.abs(newHeight / 2 - newWidth / 2);
        }

        return data.replace(
            /viewBox="0 0 2000 2000"/,
            `viewBox="${x} ${y} ${newWidth} ${newHeight}"`
        );
    };

    // Add xmlns namespace and add style attributes to the SVG.
    const addNameSpace = (data: string) => {
        const backgroundColour = 'rgb(242, 186, 66)';
        const colour = 'rgb(0, 77, 128)';
        const style = `style="background-color:${backgroundColour};color:${colour};width=100%;height:auto"`;

        if (data.indexOf('http://www.w3.org/2000/svg') < 0) {
            data = data.replace(/<svg/g, `<svg xmlns="http://www.w3.org/2000/svg" ${style}`);
        }

        // const regex = /(style=".+")/;
        // let style = data.match(
        //     regex,
        //     'style="background-color: rgb(242, 186, 66);color: rgb(0, 77, 128);"'
        // )[0];
        // let style2 = style.match(regex)[0];
        // style2 = style2.replace(/;"/, ';width: 100%; height: auto;"');
        // return data.replace(regex, style2);
        return data;
    };

    // Encode the SVG to convert characters to HTML entities.
    const encodeSVG = (data: string) => {
        const symbols = /[\r\n%#()<>?\[\\\]^`{|}= ]/g;
        data = data.replace(/'/g, '"');
        data = data.replace(/>\s{1,}</g, '><');
        data = data.replace(/\s{2,}/g, ' ');

        return data.replace(symbols, encodeURIComponent);
    };

    // Update the image size when the pre-defined size selector is changed.
    const updateSize = (selectedSize: string) => {
        const newSize = PRESET_SIZES.filter((size) => size.name === selectedSize);
        selectedSize = newSize[0].name;

        if (selectedSize != 'Custom') {
            imageHeight.value = newSize[0].height;
            imageWidth.value = newSize[0].width;
        }
        createDownloadLinks();
    };

    return {
        imageHeight,
        imageWidth,
        jpgDownloadLink,
        pngDownloadLink,
        svgDownloadLink,
        createDownloadLinks,
        updateSize,
    };
});
