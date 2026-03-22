import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Privacy & Data
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Data is Private</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-base leading-relaxed">
            FallCheck is built with your privacy in mind. We store your data
            securely and never share it with third parties.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            What Data We Store
          </h3>
          <ul className="space-y-2 text-base">
            <li>
              <strong>Your profile:</strong> Age, optional health information,
              and mobility details
            </li>
            <li>
              <strong>Daily check-ins:</strong> Your answers to daily health
              questions
            </li>
            <li>
              <strong>Risk assessments:</strong> Calculated scores based on your
              check-ins
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Where Your Data is Stored
          </h3>
          <p className="text-base leading-relaxed">
            All your data is stored in a secure canister on the Internet
            Computer blockchain. This means:
          </p>

          <ul className="space-y-2 text-base">
            <li>Your data is encrypted and protected</li>
            <li>Only you can access your personal health information</li>
            <li>We don't use external databases or cloud services</li>
            <li>Your data is isolated from other users</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Authentication</h3>
          <p className="text-base leading-relaxed">
            We use Internet Identity for secure, anonymous authentication. This
            means:
          </p>

          <ul className="space-y-2 text-base">
            <li>No passwords to remember or manage</li>
            <li>No email address or personal information required</li>
            <li>Your identity is cryptographically secured</li>
            <li>You control access to your data</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            No Third-Party Services
          </h3>
          <p className="text-base leading-relaxed">FallCheck does not use:</p>

          <ul className="space-y-2 text-base">
            <li>Analytics or tracking services</li>
            <li>Advertising networks</li>
            <li>Social media integrations</li>
            <li>External APIs or data processors</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">UK Focus</h3>
          <p className="text-base leading-relaxed">
            FallCheck is designed specifically for UK users and references UK
            healthcare services (GP, NHS 111). All guidance and recommendations
            are tailored to the UK healthcare system.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Your Rights</h3>
          <p className="text-base leading-relaxed">
            You have full control over your data:
          </p>

          <ul className="space-y-2 text-base">
            <li>You can view all your stored data at any time</li>
            <li>You can stop using the service at any time</li>
            <li>Your data is tied to your Internet Identity</li>
          </ul>

          <p className="text-base leading-relaxed mt-4">
            If you have questions about privacy or data handling, please contact
            your healthcare provider for guidance on health data management.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
