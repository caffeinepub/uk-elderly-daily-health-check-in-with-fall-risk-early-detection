import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSubmitCheckIn, useGetCheckInByDate } from '../hooks/useQueries';
import { getUKLocalDate, formatUKDate } from '../lib/ukDate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import PrimaryButton from '../components/shared/PrimaryButton';
import LoadingState from '../components/shared/LoadingState';
import { normalizeError } from '../lib/errors';
import type { DailyCheckIn } from '../backend';

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
              <QuestionSwitch
                id="dizziness"
                label="Have you felt dizzy or lightheaded?"
                checked={formData.dizziness}
                onChange={(checked) => setFormData({ ...formData, dizziness: checked })}
                disabled={alreadySubmitted}
              />

              <QuestionSwitch
                id="unsteadiness"
                label="Have you felt unsteady on your feet?"
                checked={formData.unsteadiness}
                onChange={(checked) => setFormData({ ...formData, unsteadiness: checked })}
                disabled={alreadySubmitted}
              />

              <QuestionSwitch
                id="newPain"
                label="Do you have any new pain or discomfort?"
                checked={formData.newPain}
                onChange={(checked) => setFormData({ ...formData, newPain: checked })}
                disabled={alreadySubmitted}
              />

              <QuestionSwitch
                id="fatigue"
                label="Have you felt unusually tired or weak?"
                checked={formData.fatigue}
                onChange={(checked) => setFormData({ ...formData, fatigue: checked })}
                disabled={alreadySubmitted}
              />

              <QuestionSwitch
                id="visionIssues"
                label="Have you had any vision problems?"
                checked={formData.visionIssues}
                onChange={(checked) => setFormData({ ...formData, visionIssues: checked })}
                disabled={alreadySubmitted}
              />

              <QuestionSwitch
                id="medicationChanges"
                label="Have you changed any medications today?"
                checked={formData.medicationChanges}
                onChange={(checked) => setFormData({ ...formData, medicationChanges: checked })}
                disabled={alreadySubmitted}
              />

              <QuestionSwitch
                id="alcoholIntake"
                label="Have you consumed alcohol today?"
                checked={formData.alcoholIntake}
                onChange={(checked) => setFormData({ ...formData, alcoholIntake: checked })}
                disabled={alreadySubmitted}
              />

              <QuestionSwitch
                id="sleepQualityGood"
                label="Did you sleep well last night?"
                checked={formData.sleepQualityGood}
                onChange={(checked) => setFormData({ ...formData, sleepQualityGood: checked })}
                disabled={alreadySubmitted}
              />

              <QuestionSwitch
                id="nearFall"
                label="Have you had a near-fall (almost fell but caught yourself)?"
                checked={formData.nearFall}
                onChange={(checked) => setFormData({ ...formData, nearFall: checked })}
                disabled={alreadySubmitted}
              />

              <QuestionSwitch
                id="actualFall"
                label="Have you had an actual fall?"
                checked={formData.actualFall}
                onChange={(checked) => setFormData({ ...formData, actualFall: checked })}
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

interface QuestionSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function QuestionSwitch({ id, label, checked, onChange, disabled }: QuestionSwitchProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <Label htmlFor={id} className="text-lg cursor-pointer flex-1">
        {label}
      </Label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className="data-[state=checked]:bg-emerald-600"
      />
    </div>
  );
}
