import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DisclaimerBanner from "../components/shared/DisclaimerBanner";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        About FallCheck
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Our Purpose</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-base leading-relaxed">
            FallCheck is a daily health companion designed specifically for
            adults aged 65 and over in the UK. Our goal is to help you track
            your daily health status and identify potential fall risks early, so
            you can take preventive action and stay safe at home.
          </p>

          <p className="text-base leading-relaxed">
            Falls are a leading cause of injury among older adults, but many
            falls can be prevented with early awareness and simple precautions.
            By completing a quick daily check-in, you can monitor changes in
            your health that may increase your fall risk.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">What We Do</h3>
          <ul className="space-y-2 text-base">
            <li>Provide a simple daily health check-in</li>
            <li>Calculate your fall risk based on evidence-based factors</li>
            <li>Offer personalized guidance appropriate to your risk level</li>
            <li>Help you track your health over time</li>
            <li>Remind you when to speak with your GP or contact NHS 111</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">What We Don't Do</h3>
          <ul className="space-y-2 text-base">
            <li>We are not a medical device or diagnostic tool</li>
            <li>We do not provide medical diagnosis or treatment</li>
            <li>We do not offer emergency response services</li>
            <li>We cannot predict falls with certainty</li>
            <li>We do not replace professional medical advice</li>
          </ul>
        </CardContent>
      </Card>

      <DisclaimerBanner />
    </div>
  );
}
