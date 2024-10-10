import { Button } from '@/components/ui/button';

interface CompileButtonProps {
  onCompile: () => void;
}

export function CompileButton({ onCompile }: CompileButtonProps) {
  return (
    <Button onClick={onCompile} className="w-full">
      Compile and Run
    </Button>
  );
}