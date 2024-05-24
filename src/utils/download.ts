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
    const backgroundColour = 'rgb(242, 186, 66)';
    const colour = 'rgb(0, 77, 128)';
    const style = `style="background-color:${backgroundColour};color:${colour};width=100%;height:auto"`;

    if (data.indexOf('http://www.w3.org/2000/svg') < 0) {
        data = data.replace(/<svg/g, `<svg xmlns="http://www.w3.org/2000/svg" ${style}`);
    }

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
    console.log('create', fileType)
    const svg = document.querySelector('.image-box__svg')?.innerHTML;

    if (!svg) return;

    const adjusted = setNewSize(svg, imageHeight, imageWidth);
    const namespaced = addNameSpace(adjusted);
    const escaped = encodeSVG(namespaced);

    const svgDownloadLink = `data:image/svg+xml,${escaped}`;
    console.log('create2')
    if (fileType === 'svg') {
        return svgDownloadLink;
    } else if (fileType === 'png' || fileType === 'jpeg') {
        console.log('filetype')
        // Create png and jpg links.
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.height = imageHeight;
        canvas.width = imageWidth;

        const image = new Image();
        image.src = svgDownloadLink;

        // let downloadLink = '';
        ctx?.drawImage(image, 0, 0);
        return canvas.toDataURL(`image/${fileType}`);
    //     image.onload = () => {
    //         console.log('image');
    //         ctx?.drawImage(image, 0, 0);
    //         return canvas.toDataURL(`image/${fileType}`);
    //     };
    }
}

export const download = async (imageHeight: number, imageWidth: number, fileType: string) => {
    console.log('download');
    const downloadLink = await createDownloadLink(imageHeight, imageWidth, fileType);
    console.log('downloadLink', downloadLink);
}
