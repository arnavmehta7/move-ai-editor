import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function TestArea() {
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');

  const handleRunTest = async () => {
    // TODO: Implement test execution logic
    setTestOutput('Test results will be shown here.');
  };

  return (
    <div className="space-y-2">
      <Textarea
        value={testInput}
        onChange={(e) => setTestInput(e.target.value)}
        placeholder="Enter test cases or commands..."
        className="h-[150px] bg-gray-800 text-white"
      />
      <Button onClick={handleRunTest} className="w-full">Run Test</Button>
      <Textarea
        value={testOutput}
        readOnly
        className="h-[100px] bg-gray-800 text-white"
        placeholder="Test output will appear here..."
      />
    </div>
  );
}