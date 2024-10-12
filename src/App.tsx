import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/Editor';
import { LLMPrompt } from '@/components/LLMPrompt';
import { CompileButton } from '@/components/CompileButton';
import { animated, useSpring } from 'react-spring';
import { CheckCircle, Terminal } from 'lucide-react';

function App() {
  const [code, setCode] = useState('');
  const compilationPlaceHolder = "Compilation output will appear here..."
  const [compilationOutput, setCompilationOutput] = useState(compilationPlaceHolder);
  const [isLoading, setIsLoading] = useState(false); // State to manage loader visibility
  const [isSuccess, setIsSuccess] = useState(false); // State to manage success animation visibility

  const handleCompile = (compilationOutput: string, success: boolean) => {
    setCompilationOutput(compilationOutput);
    if (success) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    }
  };
  const handleGenerateCode = (loading: boolean) => {
    setIsLoading(loading);
  };

  const successAnimation = useSpring({
    opacity: isSuccess ? 1 : 0,
    transform: isSuccess ? 'scale(1)' : 'scale(0.8)',
  });

  const loadingAnimation = useSpring({
    opacity: isLoading ? 1 : 0,
    transform: isLoading ? 'scale(1)' : 'scale(0.8)',
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Aptos AI Writer</h1> 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4 relative">
            {isLoading && (
              <animated.div style={loadingAnimation} className="absolute inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-10">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                <p className="text-white mt-4 mx-4">Writing the code...</p>
              </animated.div>
            )}
            <CodeEditor code={code} setCode={setCode} />
            <LLMPrompt setCode={setCode} onGenerateCode={handleGenerateCode} />
          </div>
          <div className="space-y-4">
            <Tabs defaultValue="output" className="w-full">
              <TabsList className="flex w-full">
                <TabsTrigger value="output" className="flex-1 text-center">
                <Terminal className='mx-2'/>
                Output
                </TabsTrigger>
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
            <CompileButton
              onCompile={handleCompile}
              code={code}
            />
            <animated.div style={successAnimation} className="flex justify-center items-center">
              <CheckCircle className="text-green-500 h-8 w-8 mr-2" />
              <span className="text-green-500 font-bold">Compilation Successful!</span>
            </animated.div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;