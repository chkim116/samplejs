import rendering from "./render";
import { sampleTextData } from "./sample";

type EditorInputType =
    | "insertParagraph" // enter
    | "deleteContentBackward" // backspace
    | "insertCompositionText" // same line
    | "insertLineBreak"; // shift + enter

const editorDOM = document.getElementById("editor");

function handleEditorInput(e: any) {
    const inputType: EditorInputType = e.inputType;
    const { textContent: textValue } = e.target;
    console.log(inputType, textValue);
}

function init() {
    if (editorDOM) {
        editorDOM.focus();
        editorDOM.addEventListener("input", handleEditorInput);
        editorDOM.innerHTML = "<p><br /></p>";
        rendering(editorDOM, sampleTextData);
    }
}

init();
