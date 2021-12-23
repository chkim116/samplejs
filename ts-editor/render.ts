import { TextData, Style, Text, ImgType, TextDataWrapper } from "./sample";

interface RenderImg {
    $imgWrapper: HTMLElement;
    url: string;
    type: ImgType;
}

interface ApplyStyle {
    $target: HTMLElement;
    style: Style;
}

interface RenderTextNode {
    $target: HTMLElement;
    text: Text;
}

const isHasData = (data: TextData[]) => !!data.length;
const isStyle = (style: Style) => !!Object.keys(style).length;

function renderImg({ $imgWrapper, url, type }: RenderImg) {
    const img = document.createElement("img");
    img.src = url;
    if (type === "img-grid") {
        $imgWrapper.style.display = "flex";
    }
    $imgWrapper.appendChild(img);
    return $imgWrapper;
}

function renderTextNode({ $target, text }: RenderTextNode) {
    const $textNode = document.createTextNode(text);
    $target.appendChild($textNode);
}

function applyStyle({ $target, style }: ApplyStyle) {
    for (const key in style) {
        $target.style[key as any] = style[key];
    }
}

function renderHasTagName($target: HTMLElement, props: TextData) {
    const {
        tagName = "",
        type = "",
        text = "",
        style = {},
        data = [],
        caption = "",
    } = props;

    let $el = document.createElement(tagName);

    if (type === "img-grid") {
        $el.style.display = "flex";
        if (caption) {
            const span = document.createElement("span");
            span.textContent = caption;
            $el.append(span);
        }
        $target.appendChild($el);
        rendering($el, data);
        return;
    }

    if (isStyle(style)) {
        applyStyle({ $target: $el, style });
    }
    $el.textContent = text;
    $target.appendChild($el);

    // 재귀 호출
    if (isHasData(data)) {
        rendering($el, data);
    }
}

function renderHasNoTagName($target: HTMLElement, props: TextData) {
    const { type = "", text = "", style = {}, data = [], url = "" } = props;

    if (type === "text") {
        if (isStyle(style)) {
            applyStyle({ $target, style });
        }
        renderTextNode({ $target, text });
    }

    if (type === "img" || type === "img-grid") {
        const $imgWrapper = document.createElement("div");
        const $img = renderImg({
            $imgWrapper,
            url,
            type,
        });
        $target.appendChild($img);
    }

    if (isHasData(data)) {
        // 재귀 호출
        rendering($target, data);
    }
}

function rendering($target: HTMLElement, textData: TextData[]) {
    textData.map((props: TextDataWrapper | TextData) => {
        if (props.tagName) {
            renderHasTagName($target, props);
            return;
        }
        renderHasNoTagName($target, props);
    });
}

export default rendering;
