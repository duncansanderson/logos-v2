export default function (height: number, width: number) {
    const ratio = (height > width) ? width / height : height / width;

    const newHeight = (height < width) ? ratio * 100 : 100;
    const newWidth = (height > width) ? ratio * 100 : 100;

    return `height:${newHeight}%;width:${newWidth}%`;
}
