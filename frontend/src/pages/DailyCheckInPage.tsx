import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSubmitCheckIn, useGetCheckInByDate } from '../hooks/useQueries';
import { getUKLocalDate, formatUKDate } from '../lib/ukDate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import PrimaryButton from '../components/shared/PrimaryButton';
import LoadingState from '../components/shared/LoadingState';
import { normalizeError } from '../lib/errors';
import type { DailyCheckIn } from '../backend';
import { cn } from '@/lib/utils';

export default function DailyCheckInPage() {
  const navigate = useNavigate();
  const todayDate = getUKLocalDate();
  const { data: existingCheckIn, isLoading: checkingExisting } = useGetCheckInByDate(todayDate);
  const submitMutation = useSubmitCheckIn();

  const [formData, setFormData] = useState({
    dizziness: false,
    unsteadiness: false,
    newPain: false,
    fatigue: false,
    visionIssues: false,
    medicationChanges: false,
    alcoholIntake: false,
    sleepQualityGood: true,
    nearFall: false,
    actualFall: false,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (existingCheckIn) {
      setFormData({
        dizziness: existingCheckIn.dizziness,
        unsteadiness: existingCheckIn.unsteadiness,
        newPain: existingCheckIn.newPain,
        fatigue: existingCheckIn.fatigue,
        visionIssues: existingCheckIn.visionIssues,
        medicationChanges: existingCheckIn.medicationChanges,
        alcoholIntake: existingCheckIn.alcoholIntake,
        sleepQualityGood: existingCheckIn.sleepQualityGood,
        nearFall: existingCheckIn.nearFall,
        actualFall: existingCheckIn.actualFall,
      });
    }
  }, [existingCheckIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const checkIn: DailyCheckIn = {
      ...formData,
      localDate: todayDate,
      timestamp: BigInt(Date.now() * 1000000),
    };

    try {
      await submitMutation.mutateAsync(checkIn);
      navigate({ to: '/confirmation' });
    } catch (err) {
      setError(normalizeError(err));
    }
  };

  if (checkingExisting) {
    return <LoadingState message="Checking today's check-in..." />;
  }

  const alreadySubmitted = !!existingCheckIn;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Daily Health Check-In
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          {formatUKDate(todayDate)}
        </p>
      </div>

      {alreadySubmitted && (
        <Alert className="mb-6 bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <AlertDescription className="text-base text-emerald-900 dark:text-emerald-100">
            You've already completed your check-in for today. Below are your submitted answers.
            <div className="mt-3">
              <PrimaryButton
                onClick={() => navigate({ to: '/risk-results' })}
                variant="outline"
                className="mr-3"
              >
                View Risk Results
              </PrimaryButton>
              <PrimaryButton
                onClick={() => navigate({ to: '/history' })}
                variant="outline"
              >
                View History
              </PrimaryButton>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How are you feeling today?</CardTitle>
          <CardDescription className="text-base">
            Please answer these questions about your health in the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription className="text-base">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <QuestionButtons
                id="dizziness"
                label="Have you felt dizzy or lightheaded?"
                value={formData.dizziness}
                onChange={(value) => setFormData({ ...formData, dizziness: value })}
                disabled={alreadySubmitted}
              />

              <QuestionButtons
                id="unsteadiness"
                label="Have you felt unsteady on your feet?"
                value={formData.unsteadiness}
                onChange={(value) => setFormData({ ...formData, unsteadiness: value })}
                disabled={alreadySubmitted}
              />

              <QuestionButtons
                id="newPain"
                label="Do you have any new pain or discomfort?"
                value={formData.newPain}
                onChange={(value) => setFormData({ ...formData, newPain: value })}
                disabled={alreadySubmitted}
              />

              <QuestionButtons
                id="fatigue"
                label="Have you felt unusually tired or weak?"
                value={formData.fatigue}
                onChange={(value) => setFormData({ ...formData, fatigue: value })}
                disabled={alreadySubmitted}
              />

              <QuestionButtons
                id="visionIssues"
                label="Have you had any vision problems?"
                value={formData.visionIssues}
                onChange={(value) => setFormData({ ...formData, visionIssues: value })}
                disabled={alreadySubmitted}
              />

              <QuestionButtons
                id="medicationChanges"
                label="Have you changed any medications today?"
                value={formData.medicationChanges}
                onChange={(value) => setFormData({ ...formData, medicationChanges: value })}
                disabled={alreadySubmitted}
              />

              <QuestionButtons
                id="alcoholIntake"
                label="Have you consumed alcohol today?"
                value={formData.alcoholIntake}
                onChange={(value) => setFormData({ ...formData, alcoholIntake: value })}
                disabled={alreadySubmitted}
              />

              <QuestionButtons
                id="sleepQualityGood"
                label="Did you sleep well last night?"
                value={formData.sleepQualityGood}
                onChange={(value) => setFormData({ ...formData, sleepQualityGood: value })}
                disabled={alreadySubmitted}
              />

              <QuestionButtons
                id="nearFall"
                label="Have you had a near-fall (almost fell but caught yourself)?"
                value={formData.nearFall}
                onChange={(value) => setFormData({ ...formData, nearFall: value })}
                disabled={alreadySubmitted}
              />

              <QuestionButtons
                id="actualFall"
                label="Have you had an actual fall?"
                value={formData.actualFall}
                onChange={(value) => setFormData({ ...formData, actualFall: value })}
                disabled={alreadySubmitted}
              />
            </div>

            {!alreadySubmitted && (
              <PrimaryButton
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full"
              >
                {submitMutation.isPending ? 'Submitting...' : 'Submit Check-In'}
              </PrimaryButton>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

interface QuestionButtonsProps {
  id: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

function QuestionButtons({ id, label, value, onChange, disabled }: QuestionButtonsProps) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <Label htmlFor={id} className="text-lg block mb-3">
        {label}
      </Label>
      <div className="flex gap-3" role="group" aria-labelledby={id}>
        <button
          type="button"
          onClick={() => onChange(true)}
          disabled={disabled}
          aria-pressed={value === true}
          className={cn(
            'flex-1 min-h-[56px] px-6 py-3 rounded-lg font-semibold text-lg transition-all',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            value === true
              ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-500'
          )}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          disabled={disabled}
          aria-pressed={value === false}
          className={cn(
            'flex-1 min-h-[56px] px-6 py-3 rounded-lg font-semibold text-lg transition-all',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            value === false
              ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-500'
          )}
        >
          No
        </button>
      </div>
    </div>
  );
}
