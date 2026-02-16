import { useNavigate } from '@tanstack/react-router';
import { useGetRiskHistory } from '../hooks/useQueries';
import { formatUKDate } from '../lib/ukDate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import LoadingState from '../components/shared/LoadingState';
import ErrorState from '../components/shared/ErrorState';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { data: history, isLoading, error, refetch } = useGetRiskHistory(30);

  if (isLoading) {
    return <LoadingState message="Loading your history..." />;
  }

  if (error) {
    return <ErrorState message="Failed to load history" onRetry={() => refetch()} />;
  }

  if (!history || history.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Your History
        </h1>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-xl text-gray-700 dark:text-gray-300">
              No check-ins yet. Complete your first daily check-in to start tracking your health.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Your History
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Past Check-Ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {history.map(([checkIn, assessment], index) => (
              <button
                key={index}
                onClick={() => navigate({ to: `/history/${checkIn.localDate}` })}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <div className="text-lg font-semibold">
                      {formatUKDate(checkIn.localDate)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Risk Score: {Number(assessment.riskScore)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={getRiskColor(assessment.riskLevel)}>
                    {assessment.riskLevel.toUpperCase()}
                  </Badge>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
