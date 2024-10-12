import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface LLMPromptProps {
  setCode: (code: string) => void;
  onGenerateCode: (generating: boolean) => void; // New prop for handling code generation
}

export function LLMPrompt({ setCode, onGenerateCode }: LLMPromptProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async () => {
    onGenerateCode(true); // Call the new prop function to show loader
    try {
      const response = await fetch("http://localhost:8000/answer-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch code from LLM");
      }

      const data = await response.json();
      const extractedCode = data.extracted_code || "// No code extracted";
      setCode(extractedCode);
      onGenerateCode(false); // Call the new prop function to show loader
  } catch (error) {
      console.error("Error fetching code:", error);
      setCode("// Error fetching code");
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt for the LLM..."
        className="bg-gray-800 text-white"
      />
      <Button onClick={handleSubmit} className="w-full">Generate Code</Button>
    </div>
  );
}