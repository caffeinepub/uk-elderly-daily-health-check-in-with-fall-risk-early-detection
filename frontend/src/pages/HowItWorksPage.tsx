import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        How It Works
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Rules-Based Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-base leading-relaxed">
            FallCheck uses a transparent, rules-based system to assess your fall risk. This means we don't 
            use complex algorithms or artificial intelligence—instead, we apply well-established clinical 
            guidelines and research about fall risk factors.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">How We Calculate Your Risk</h3>
          <p className="text-base leading-relaxed">
            Each day, your check-in answers are scored based on known fall risk factors:
          </p>

          <ul className="space-y-2 text-base">
            <li><strong>Dizziness or unsteadiness:</strong> These symptoms significantly increase fall risk</li>
            <li><strong>New pain or fatigue:</strong> Can affect your mobility and balance</li>
            <li><strong>Vision issues or medication changes:</strong> May impact your stability</li>
            <li><strong>Poor sleep or alcohol intake:</strong> Can reduce alertness and coordination</li>
            <li><strong>Near-falls or actual falls:</strong> Strong indicators of increased risk</li>
          </ul>

          <p className="text-base leading-relaxed mt-4">
            Your total score (0-100) determines your risk level:
          </p>

          <ul className="space-y-2 text-base">
            <li><strong>Low Risk (0-39):</strong> Few or no concerning symptoms</li>
            <li><strong>Medium Risk (40-69):</strong> Some risk factors present</li>
            <li><strong>High Risk (70-100):</strong> Multiple risk factors or serious symptoms</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Why Rules-Based?</h3>
          <p className="text-base leading-relaxed">
            We use a rules-based approach because it's:
          </p>

          <ul className="space-y-2 text-base">
            <li><strong>Transparent:</strong> You can understand exactly how your score is calculated</li>
            <li><strong>Consistent:</strong> The same answers always produce the same result</li>
            <li><strong>Evidence-based:</strong> Based on established clinical research</li>
            <li><strong>Explainable:</strong> We can show you which factors contributed to your score</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Important Limitations</h3>
          <p className="text-base leading-relaxed">
            While our assessment is based on research, it has limitations:
          </p>

          <ul className="space-y-2 text-base">
            <li>It cannot predict falls with certainty</li>
            <li>It relies on your self-reported symptoms</li>
            <li>It doesn't replace a professional medical assessment</li>
            <li>It's designed as an early warning tool, not a diagnostic device</li>
          </ul>

          <p className="text-base leading-relaxed mt-4">
            Always speak with your GP if you have concerns about your health or fall risk.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
