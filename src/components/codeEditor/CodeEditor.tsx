import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import styles from "./CodeEditor.module.css";

type CodeEditorProps = {
  code: string;
  onCodeChange: (value: string) => void;
  readOnly: boolean;
};

function CodeEditor({ code, onCodeChange, readOnly }: CodeEditorProps) {
  return (
    <div className={styles.container}>
      <CodeMirror
        theme={vscodeDark}
        value={code}
        extensions={[javascript(), EditorView.editable.of(!readOnly)]}
        onChange={onCodeChange}
        width="550px"
        className={styles.codeMirrorStyle}
      />
    </div>
  );
}

export default CodeEditor;
