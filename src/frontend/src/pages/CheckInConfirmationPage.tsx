import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";
import PrimaryButton from "../components/shared/PrimaryButton";

export default function CheckInConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-emerald-200 dark:border-emerald-800">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-20 h-20 text-emerald-600" />
          </div>
          <CardTitle className="text-3xl">Check-In Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Thank you for completing your daily health check-in.
          </p>

          <div className="space-y-3">
            <PrimaryButton
              onClick={() => navigate({ to: "/risk-results" })}
              className="w-full"
            >
              View Your Risk Assessment
            </PrimaryButton>

            <PrimaryButton
              onClick={() => navigate({ to: "/history" })}
              variant="outline"
              className="w-full"
            >
              View Your History
            </PrimaryButton>

            <PrimaryButton
              onClick={() => navigate({ to: "/" })}
              variant="ghost"
              className="w-full"
            >
              Back to Home
            </PrimaryButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
