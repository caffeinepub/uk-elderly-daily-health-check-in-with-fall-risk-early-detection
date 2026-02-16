import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { DISCLAIMER } from '../../content/guidance';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export default function DisclaimerBanner({ compact = false }: DisclaimerBannerProps) {
  if (compact) {
    return (
      <Alert variant="default" className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-sm text-amber-900 dark:text-amber-100">
          <strong>Important:</strong> This app is not a medical device and does not provide diagnosis or emergency response. 
          In an emergency, call 999. For medical advice, contact your GP or NHS 111.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="default" className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="text-base text-amber-900 dark:text-amber-100 leading-relaxed">
        {DISCLAIMER}
      </AlertDescription>
    </Alert>
  );
}
