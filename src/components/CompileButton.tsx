import { Button } from '@/components/ui/button';

interface CompileButtonProps {
  onCompile: (data: string) => void;
  code: string;
}

export function CompileButton({ onCompile, code }: CompileButtonProps) {
  const handleCompileClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/test-unit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();
      console.log(result)
      result.stdout = result.returncode == 0 ? 'Compilation succeeded:\n\n' + result.stdout: 'Compilation failed with errors:\n\n' + result.stderr;
      onCompile(result.stdout); // Pass the result to the onCompile function
    } catch (error) {
      console.error('Compilation error:', error);
      onCompile('Error during compilation.');
    }
  };

  return (
    <Button onClick={handleCompileClick} className="w-full">
      Compile and Run
    </Button>
  );
}