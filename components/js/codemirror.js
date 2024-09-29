import { EditorView, lineNumbers, gutter, keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLineGutter } from '@codemirror/view'
import { Extension, EditorState } from '@codemirror/state';
import { cppLanguage, cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark';
import { bracketMatching, syntaxTree, indentOnInput, defaultHighlightStyle, syntaxHighlighting, foldGutter, foldKeymap } from '@codemirror/language';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { history, indentWithTab, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { autocompletion, closeBrackets, completionKeymap, closeBracketsKeymap } from '@codemirror/autocomplete';
import { minimalSetup, basicSetup } from 'codemirror';
import { lintKeymap } from '@codemirror/lint';

// 替代codemirror5的fromTextArea方法
// function editorFromTextArea(textarea, extensions) {
//     let view = new EditorView({doc: textarea.value, extensions})
//     textarea.parentNode.insertBefore(view.dom, textarea)
//     textarea.style.display = "none"
//     if (textarea.form) textarea.form.addEventListener("submit", () => {
//         textarea.value = view.state.doc.toString()
//     })
//     return view
// }

const myTheme = EditorView.theme({
    '&': {
        fontFamily: "JetBrains Mono NL",
        fontSize: '16px',
        height: "100px",
    },
    '.cm-content': {
        fontFamily: "JetBrains Mono NL",
        fontSize: '16px'
    },
    '.cm-gutters': {
        fontFamily: "JetBrains Mono NL",
        fontSize: '16px'
    },
    '.cm-scroller': {
        overflow: "auto"
    }
})

// 初始化codemirror编辑器
// var editor1 = editorFromTextArea(document.getElementById('code1'), [
//     cpp(),
//     oneDark,
//     myTheme,
//     lineNumbers(),
//     gutter()
// ]);
// var editor2 = editorFromTextArea(document.getElementById('code2'), [
//     cpp(),
//     oneDark,
//     myTheme,
//     lineNumbers(),
//     gutter()
// ]);

const createNewEditorView = (parent_id, content="") => {
    return new EditorView({
        doc: content,
        extensions: [
            cpp(),
            oneDark,
            myTheme,
            lineNumbers(),
            gutter(),
            bracketMatching({brackets: "(){}[]"}),
            highlightSelectionMatches(),
            history(),
            closeBrackets(),
            autocompletion(),
            EditorView.lineWrapping,
            keymap.of([
                indentWithTab,
                ...closeBracketsKeymap,
                ...defaultKeymap, // 使得光标在{}中间按回车时自动创建新行并将光标指向新行并自动换行
                ...searchKeymap,
                ...historyKeymap,
                ...foldKeymap,
                ...completionKeymap,
                ...lintKeymap
            ]),
            indentOnInput(),
            highlightActiveLineGutter(),
            highlightSpecialChars(),
            foldGutter(),
            drawSelection(),
            EditorState.allowMultipleSelections.of(true),
            syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
            rectangularSelection(),
            crosshairCursor(),
            highlightActiveLine(),
            highlightSelectionMatches(),
        ],
        parent: document.getElementById(parent_id)
    });
};

// export { editor1, editor2 };
export default createNewEditorView;