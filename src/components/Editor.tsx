import { useEffect } from 'react';
import MonacoEditor from "@monaco-editor/react";

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
}

export function CodeEditor({ code, setCode }: EditorProps) {
  useEffect(() => {
    // You can add any additional setup here
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <MonacoEditor
      height="70vh"
      defaultLanguage="rust"
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        wordWrap: 'on',
      }}
    />
  );
}