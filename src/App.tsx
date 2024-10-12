import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/Editor';
import { LLMPrompt } from '@/components/LLMPrompt';
import { CompileButton } from '@/components/CompileButton';

function App() {
  const [code, setCode] = useState('');
  // const [output, setOutput] = useState('');
  const [compilationOutput, setCompilationOutput] = useState("Compilation output will appear here...");

  const handleCompile = (compilationOutput: string) => {
    setCompilationOutput(compilationOutput);
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Aptos Move Code Editor</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <CodeEditor code={code} setCode={setCode} />
            <LLMPrompt setCode={setCode} />
          </div>
          <div className="space-y-4">
            <Tabs defaultValue="output" className="w-full">
              <TabsList className="flex w-full">
                <TabsTrigger value="output" className="flex-1 text-center">Output</TabsTrigger>
              </TabsList>
              <TabsContent value="output">
                <Textarea
                  value={compilationOutput}
                  readOnly
                  className="h-[300px] bg-gray-800 text-white"
                  placeholder={compilationOutput}
                />
              </TabsContent>
            </Tabs>
            <CompileButton onCompile={handleCompile} code={code} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;