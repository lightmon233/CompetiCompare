import createNewEditorView from '../../dist/codemirror.bundle.js'

const editor1 = createNewEditorView('code1');
const editor2 = createNewEditorView('code2');

// localStorage: 页面关闭后重新打开仍然存在
// sessionStorage: 只会在页面会话期间保存数据

// 恢复编辑器内容
window.onload = () => {
    if (sessionStorage.getItem('code1Content')) {
        editor1.dispatch({
            changes: {from: 0, to: editor1.state.doc.length, insert: sessionStorage.getItem('code1Content')}
        });
    }
    if (sessionStorage.getItem('code2Content')) {
        editor2.dispatch({
            changes: {from: 0, to: editor2.state.doc.length, insert: sessionStorage.getItem('code2Content')}
        });
    }

    //可选: 跳转后清除保存的数据
    sessionStorage.removeItem('code1Content');
    sessionStorage.removeItem('code2Content');
}

// 页面离开是保存编辑器内容
window.onbeforeunload = () => {
    sessionStorage.setItem('code1Content', editor1.state.doc.toString());
    sessionStorage.setItem('code2Content', editor2.state.doc.toString());
}

export {
    editor1,
    editor2
};