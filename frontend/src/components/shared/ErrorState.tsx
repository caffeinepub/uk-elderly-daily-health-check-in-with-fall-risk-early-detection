import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Alert variant="destructive" className="max-w-2xl">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-xl">Something went wrong</AlertTitle>
        <AlertDescription className="mt-2 text-base">
          {message}
        </AlertDescription>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            Try Again
          </Button>
        )}
      </Alert>
    </div>
  );
}
