import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import type { RiskAssessment } from "../../backend";

interface RiskSummaryCardProps {
  assessment: RiskAssessment;
}

export default function RiskSummaryCard({ assessment }: RiskSummaryCardProps) {
  const { riskScore, riskLevel, contributingFactors } = assessment;

  const getRiskColor = () => {
    switch (riskLevel) {
      case "low":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel) {
      case "low":
        return <CheckCircle className="w-8 h-8 text-emerald-600" />;
      case "medium":
        return <AlertCircle className="w-8 h-8 text-amber-600" />;
      case "high":
        return <AlertTriangle className="w-8 h-8 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Fall Risk Assessment</span>
          {getRiskIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-6xl font-bold text-gray-900 dark:text-white">
            {Number(riskScore)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Risk Score (0-100)
          </div>
          <Badge className={`text-lg px-4 py-2 ${getRiskColor()}`}>
            {riskLevel.toUpperCase()} RISK
          </Badge>
        </div>

        {contributingFactors.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Contributing Factors:</h3>
            <ul className="space-y-2">
              {contributingFactors.map((factor) => (
                <li key={factor} className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1">
                    •
                  </span>
                  <span className="text-base">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {contributingFactors.length === 0 && (
          <Alert className="bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <AlertDescription className="text-emerald-900 dark:text-emerald-100">
              No significant risk factors identified in your latest check-in.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
