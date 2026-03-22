import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import type { HealthCondition, MobilityAid, UserProfile } from "../backend";
import PrimaryButton from "../components/shared/PrimaryButton";
import { useSaveCallerUserProfile } from "../hooks/useQueries";
import { normalizeError } from "../lib/errors";

export default function OnboardingPage() {
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [hadFall, setHadFall] = useState(false);
  const [fallCount, setFallCount] = useState("");
  const [hasBalanceMeds, setHasBalanceMeds] = useState(false);
  const [mobilityAids, setMobilityAids] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [error, setError] = useState("");

  const saveMutation = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const ageNum = Number.parseInt(age);
    if (!age || Number.isNaN(ageNum)) {
      setError("Please enter your age.");
      return;
    }

    if (ageNum < 65) {
      setError(
        "This service is for adults aged 65 and over. If you need health advice, please contact your GP or NHS 111.",
      );
      return;
    }

    if (hadFall && (!fallCount || Number.parseInt(fallCount) < 1)) {
      setError(
        "Please enter how many falls you have had in the last 12 months.",
      );
      return;
    }

    const mobilityAidsArray: MobilityAid[] = mobilityAids.map((aid) => {
      if (aid === "none") return { __kind__: "none", none: null };
      if (aid === "cane") return { __kind__: "cane", cane: null };
      if (aid === "walker") return { __kind__: "walker", walker: null };
      if (aid === "wheelchair")
        return { __kind__: "wheelchair", wheelchair: null };
      return { __kind__: "none", none: null };
    });

    const conditionsArray: HealthCondition[] = conditions.map((cond) => {
      if (cond === "dizziness")
        return { __kind__: "dizziness", dizziness: null };
      if (cond === "arthritis")
        return { __kind__: "arthritis", arthritis: null };
      if (cond === "parkinsons")
        return { __kind__: "parkinsons", parkinsons: null };
      if (cond === "visionImpairment")
        return { __kind__: "visionImpairment", visionImpairment: null };
      if (cond === "balanceDisorder")
        return { __kind__: "balanceDisorder", balanceDisorder: null };
      if (cond === "osteoporosis")
        return { __kind__: "osteoporosis", osteoporosis: null };
      return { __kind__: "dizziness", dizziness: null };
    });

    const profile: UserProfile = {
      age: BigInt(ageNum),
      sex: undefined,
      heightCm: heightCm ? Number.parseFloat(heightCm) : undefined,
      weightKg: weightKg ? Number.parseFloat(weightKg) : undefined,
      mobilityAids:
        mobilityAidsArray.length > 0
          ? mobilityAidsArray
          : [{ __kind__: "none", none: null }],
      hadFallLast12Months: hadFall,
      fallCountLast12Months: BigInt(hadFall ? Number.parseInt(fallCount) : 0),
      hasBalanceAffectingMedications: hasBalanceMeds,
      healthConditions: conditionsArray,
    };

    try {
      await saveMutation.mutateAsync(profile);
    } catch (err) {
      setError(normalizeError(err));
    }
  };

  const toggleMobilityAid = (aid: string) => {
    setMobilityAids((prev) =>
      prev.includes(aid) ? prev.filter((a) => a !== aid) : [...prev, aid],
    );
  };

  const toggleCondition = (condition: string) => {
    setConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition],
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <img
          src="/assets/generated/checkin-hero.dim_1600x900.png"
          alt="Welcome to FallCheck"
          className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to FallCheck
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Let's set up your profile to provide personalized fall risk insights
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Health Profile</CardTitle>
          <CardDescription className="text-base">
            This information helps us provide better fall risk assessments. All
            fields are optional except age.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription className="text-base">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="age" className="text-lg">
                Age (required) *
              </Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className="text-lg h-12"
                min="1"
                max="120"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This service is for adults aged 65 and over
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-lg">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="Optional"
                  className="text-lg h-12"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="text-lg">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="Optional"
                  className="text-lg h-12"
                  step="0.1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-lg">Do you use any mobility aids?</Label>
              <div className="space-y-3">
                {[
                  { id: "none", label: "None" },
                  { id: "cane", label: "Walking stick / Cane" },
                  { id: "walker", label: "Walking frame / Walker" },
                  { id: "wheelchair", label: "Wheelchair" },
                ].map((aid) => (
                  <div key={aid.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={aid.id}
                      checked={mobilityAids.includes(aid.id)}
                      onCheckedChange={() => toggleMobilityAid(aid.id)}
                      className="w-6 h-6"
                    />
                    <Label
                      htmlFor={aid.id}
                      className="text-base cursor-pointer"
                    >
                      {aid.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-lg">
                Have you had any falls in the last 12 months?
              </Label>
              <div className="flex items-center space-x-3">
                <Switch
                  id="hadFall"
                  checked={hadFall}
                  onCheckedChange={setHadFall}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <Label htmlFor="hadFall" className="text-base cursor-pointer">
                  {hadFall ? "Yes" : "No"}
                </Label>
              </div>

              {hadFall && (
                <div className="space-y-2 mt-3">
                  <Label htmlFor="fallCount" className="text-base">
                    How many falls?
                  </Label>
                  <Input
                    id="fallCount"
                    type="number"
                    value={fallCount}
                    onChange={(e) => setFallCount(e.target.value)}
                    placeholder="Number of falls"
                    className="text-lg h-12"
                    min="1"
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-lg">
                Do you have any of these conditions?
              </Label>
              <div className="space-y-3">
                {[
                  { id: "dizziness", label: "Frequent dizziness or vertigo" },
                  { id: "arthritis", label: "Arthritis" },
                  { id: "parkinsons", label: "Parkinson's disease" },
                  { id: "visionImpairment", label: "Vision problems" },
                  { id: "balanceDisorder", label: "Balance disorder" },
                  { id: "osteoporosis", label: "Osteoporosis" },
                ].map((condition) => (
                  <div
                    key={condition.id}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={condition.id}
                      checked={conditions.includes(condition.id)}
                      onCheckedChange={() => toggleCondition(condition.id)}
                      className="w-6 h-6"
                    />
                    <Label
                      htmlFor={condition.id}
                      className="text-base cursor-pointer"
                    >
                      {condition.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-lg">
                Do you take medications that may affect balance?
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Examples: blood pressure medications, sedatives, or medications
                that cause dizziness
              </p>
              <div className="flex items-center space-x-3">
                <Switch
                  id="balanceMeds"
                  checked={hasBalanceMeds}
                  onCheckedChange={setHasBalanceMeds}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <Label
                  htmlFor="balanceMeds"
                  className="text-base cursor-pointer"
                >
                  {hasBalanceMeds ? "Yes" : "No"}
                </Label>
              </div>
            </div>

            <PrimaryButton
              type="submit"
              disabled={saveMutation.isPending}
              className="w-full"
            >
              {saveMutation.isPending ? "Saving..." : "Complete Setup"}
            </PrimaryButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
