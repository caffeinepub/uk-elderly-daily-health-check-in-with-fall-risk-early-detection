import { Button } from '@/components/ui/button';
import { ComponentProps } from 'react';

type PrimaryButtonProps = ComponentProps<typeof Button>;

export default function PrimaryButton({ children, className = '', ...props }: PrimaryButtonProps) {
  return (
    <Button
      size="lg"
      className={`min-h-[56px] text-lg px-8 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
