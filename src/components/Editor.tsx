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
      height="400px"
      defaultLanguage="rust"
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
      }}
    />
  );
}