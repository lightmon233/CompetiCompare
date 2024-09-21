import { EditorView } from '@codemirror/view'
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';

// 替代codemirror5的fromTextArea方法
function editorFromTextArea(textarea, extensions) {
    let view = new EditorView({doc: textarea.value, extensions})
    textarea.parentNode.insertBefore(view.dom, textarea)
    textarea.style.display = "none"
    if (textarea.form) textarea.form.addEventListener("submit", () => {
        textarea.value = view.state.doc.toString()
    })
    return view
}

// 初始化codemirror编辑器
var editor1 = editorFromTextArea(document.getElementById('code1'), [
    cpp(),
    oneDark
]);
var editor2 = editorFromTextArea(document.getElementById('code2'), [
    cpp(),
    oneDark
])

export { editor1, editor2 };