import { useNavigate } from '@tanstack/react-router';
import { useGetCurrentRiskAssessment } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import PrimaryButton from '../components/shared/PrimaryButton';
import RiskSummaryCard from '../components/risk/RiskSummaryCard';
import DisclaimerBanner from '../components/shared/DisclaimerBanner';
import LoadingState from '../components/shared/LoadingState';
import ErrorState from '../components/shared/ErrorState';
import { LOW_RISK_GUIDANCE, MEDIUM_RISK_GUIDANCE, HIGH_RISK_GUIDANCE } from '../content/guidance';

export default function RiskResultsPage() {
  const navigate = useNavigate();
  const { data: assessment, isLoading, error, refetch } = useGetCurrentRiskAssessment();

  if (isLoading) {
    return <LoadingState message="Calculating your risk assessment..." />;
  }

  if (error) {
    return <ErrorState message="Failed to load risk assessment" onRetry={() => refetch()} />;
  }

  if (!assessment) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              No risk assessment available. Please complete a daily check-in first.
            </p>
            <PrimaryButton onClick={() => navigate({ to: '/' })}>
              Go to Daily Check-In
            </PrimaryButton>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getGuidance = () => {
    switch (assessment.riskLevel) {
      case 'low':
        return LOW_RISK_GUIDANCE;
      case 'medium':
        return MEDIUM_RISK_GUIDANCE;
      case 'high':
        return HIGH_RISK_GUIDANCE;
      default:
        return '';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <PrimaryButton
          onClick={() => navigate({ to: '/' })}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Check-In
        </PrimaryButton>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Your Fall Risk Assessment
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Based on your latest check-in
        </p>
      </div>

      <DisclaimerBanner />

      <RiskSummaryCard assessment={assessment} />

      <Card>
        <CardContent className="py-6">
          <h2 className="text-2xl font-bold mb-4">What This Means</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="whitespace-pre-line text-base leading-relaxed">
              {getGuidance()}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <PrimaryButton
          onClick={() => navigate({ to: '/history' })}
          variant="outline"
          className="flex-1"
        >
          View History
        </PrimaryButton>
        <PrimaryButton
          onClick={() => navigate({ to: '/' })}
          className="flex-1"
        >
          New Check-In
        </PrimaryButton>
      </div>
    </div>
  );
}
