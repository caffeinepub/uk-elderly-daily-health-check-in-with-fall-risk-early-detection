import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetCheckInByDate, useGetRiskHistory } from '../hooks/useQueries';
import { formatUKDate } from '../lib/ukDate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import PrimaryButton from '../components/shared/PrimaryButton';
import RiskSummaryCard from '../components/risk/RiskSummaryCard';
import LoadingState from '../components/shared/LoadingState';
import ErrorState from '../components/shared/ErrorState';

export default function HistoryDetailPage() {
  const { date } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: checkIn, isLoading: checkInLoading } = useGetCheckInByDate(date || '');
  const { data: history, isLoading: historyLoading } = useGetRiskHistory(30);

  const isLoading = checkInLoading || historyLoading;

  if (isLoading) {
    return <LoadingState message="Loading details..." />;
  }

  if (!checkIn) {
    return <ErrorState message="No check-in found for this date" />;
  }

  const historyEntry = history?.find(([c]) => c.localDate === date);
  const assessment = historyEntry?.[1];

  const questions = [
    { label: 'Felt dizzy or lightheaded', value: checkIn.dizziness },
    { label: 'Felt unsteady on feet', value: checkIn.unsteadiness },
    { label: 'New pain or discomfort', value: checkIn.newPain },
    { label: 'Unusually tired or weak', value: checkIn.fatigue },
    { label: 'Vision problems', value: checkIn.visionIssues },
    { label: 'Changed medications', value: checkIn.medicationChanges },
    { label: 'Consumed alcohol', value: checkIn.alcoholIntake },
    { label: 'Slept well', value: checkIn.sleepQualityGood },
    { label: 'Had a near-fall', value: checkIn.nearFall },
    { label: 'Had an actual fall', value: checkIn.actualFall },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <PrimaryButton
          onClick={() => navigate({ to: '/history' })}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to History
        </PrimaryButton>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Check-In Details
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          {formatUKDate(checkIn.localDate)}
        </p>
      </div>

      {assessment && <RiskSummaryCard assessment={assessment} />}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Answers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span className="text-lg">{question.label}</span>
                {question.value ? (
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
