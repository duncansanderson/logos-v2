import { useColourStore } from "@/stores/colour";

// Set the desired download size.
const setNewSize = (data: string, height: number, width: number) => {
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
    const colourStore = useColourStore();
    const backgroundColour = colourStore.getColourHex(colourStore.backgroundColour);
    const foregroundColour = colourStore.getColourHex(colourStore.foregroundColour);

    const style = `style="background-color:${backgroundColour};color:${foregroundColour};width=100%;height:auto"`;

    if (data.indexOf('http://www.w3.org/2000/svg') < 0) {
        data = data.replace(/<svg/g, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    // Remove height and width attributes from the SVG.
    data = data.replace(/style=".+"/, style);
    return data;
};

// Encode the SVG to convert characters to HTML entities.
const encodeSVG = (data: string) => {
    const symbols = /[\r\n%#()<>?[\\\]^`{|}= ]/g;
    data = data.replace(/'/g, '"');
    data = data.replace(/>\s{1,}</g, '><');
    data = data.replace(/\s{2,}/g, ' ');

    return data.replace(symbols, encodeURIComponent);
};

const createDownloadLink = async (imageHeight: number, imageWidth: number, fileType: string) => {
    const svg = document.querySelector('.image-box__svg')?.innerHTML;

    if (!svg) return;

    const adjusted = setNewSize(svg, imageHeight, imageWidth);
    const namespaced = addNameSpace(adjusted);
    const escaped = encodeSVG(namespaced);

    return `data:image/svg+xml,${escaped}`;
}

const downloadFile = (downloadLink: string) => {

    // Download the file.
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = `icon`;
    link.setAttribute('target', '_blank');
    link.click();
    link.remove();
}

export const download = async (imageHeight: number, imageWidth: number, fileType: string) => {
    const downloadLink = await createDownloadLink(imageHeight, imageWidth, fileType);

    if (downloadLink && fileType === 'svg') {
        downloadFile(downloadLink);
    } else if (downloadLink && (fileType === 'png' || fileType === 'jpeg')) {
        // Create png and jpeg links.
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.height = imageHeight;
        canvas.width = imageWidth;

        const image = new Image();
        image.src = downloadLink;

        image.onload = () => {
            ctx?.drawImage(image, 0, 0);
            downloadFile(canvas.toDataURL(`image/${fileType}`));
        };
    }
}
