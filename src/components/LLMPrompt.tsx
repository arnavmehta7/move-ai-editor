import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface LLMPromptProps {
  setCode: (code: string) => void;
}

export function LLMPrompt({ setCode }: LLMPromptProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async () => {
    // TODO: Implement LLM API call
    const response = `// This is a mock response from the LLM
module MyModule {
    use std::vector;

    struct MyResource has key {
        value: u64,
    }

    public fun initialize(account: &signer) {
        move_to(account, MyResource { value: 0 });
    }

    public fun increment(account: &signer) acquires MyResource {
        let resource = borrow_global_mut<MyResource>(signer::address_of(account));
        resource.value = resource.value + 1;
    }
}`;
    setCode(response);
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