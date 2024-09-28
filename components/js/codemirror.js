import { EditorView, lineNumbers, gutter, keymap } from '@codemirror/view'
import { cppLanguage, cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark';
import { bracketMatching, syntaxTree } from '@codemirror/language';
import { highlightSelectionMatches } from '@codemirror/search';
import { history, indentWithTab } from '@codemirror/commands';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';

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
        fontSize: '16px'
    },
    '.cm-content': {
        fontSize: '16px'
    },
    '.cm-gutters': {
        fontSize: '16px'
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
            keymap.of([indentWithTab]),
            cpp(),
        ],
        parent: document.getElementById(parent_id)
    });
};

// export { editor1, editor2 };
export default createNewEditorView;