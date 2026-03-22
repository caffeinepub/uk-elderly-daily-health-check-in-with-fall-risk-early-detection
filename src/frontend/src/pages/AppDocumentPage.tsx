import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bell,
  BookOpen,
  CheckCircle2,
  Eye,
  Heart,
  ListChecks,
  ShieldCheck,
  Stethoscope,
  TrendingDown,
} from "lucide-react";

const features = [
  "Daily check-in questionnaire with Yes/No button answers",
  "Fall risk assessment score calculated after each check-in",
  "Risk level display (Low / Moderate / High) with personalised advice",
  "Check-in history with trend view to identify patterns over time",
  "Onboarding guide for first-time users",
  "Accessibility settings including font size and contrast adjustments",
  "Dark mode support for comfortable use at any time of day",
  "Privacy-first design — data stored securely on the Internet Computer blockchain",
  "NHS-aligned guidance and disclaimers throughout",
  "Mobile-friendly, large-button interface designed for older adults",
  "Prompts to contact GP or NHS 111 when risk is elevated",
  "Empowers carers and family members with actionable insights",
];

const preventionCards = [
  {
    icon: Activity,
    title: "Daily Symptom Tracking",
    desc: "Catches subtle health deterioration — dizziness, fatigue, pain, medication changes — before they become dangerous.",
  },
  {
    icon: BarChart3,
    title: "Evidence-Based Risk Scoring",
    desc: "Each check-in generates a fall risk score based on clinically validated risk factors aligned with NICE guidelines.",
  },
  {
    icon: Eye,
    title: "Colour-Coded Risk Levels",
    desc: "Green (Low), Amber (Moderate), and Red (High) risk levels provide clear, immediate guidance without medical jargon.",
  },
  {
    icon: Stethoscope,
    title: "GP & NHS 24 Prompts",
    desc: "When risk is elevated, the app prompts users to speak to their GP or call NHS 24 — ensuring timely professional intervention.",
  },
  {
    icon: TrendingDown,
    title: "Trend Pattern Detection",
    desc: "Historical check-in data reveals patterns over days and weeks, allowing users and carers to identify recurring triggers.",
  },
  {
    icon: Bell,
    title: "Practical Safety Reminders",
    desc: "Reminds users about hydration, rest, appropriate footwear, and home hazard checks — simple steps that reduce fall risk.",
  },
];

export default function AppDocumentPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 print:px-0 print:py-4">
      <div className="print:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/" })}
          className="gap-2"
          data-ocid="document.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </Button>
      </div>

      <div className="text-center mb-10 print:mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mb-4 print:hidden">
          <BookOpen className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
          FallCheck — App Document
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Daily Health Check-In &amp; Fall Prevention for Adults 65+ in Scotland
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Version 2 &nbsp;·&nbsp;{" "}
          {new Date().toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: App Overview */}
        <Card className="border-emerald-200 dark:border-emerald-900 shadow-sm print:shadow-none print:border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-xl text-emerald-800 dark:text-emerald-300">
              <BookOpen className="w-6 h-6 shrink-0" />
              1. App Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              <strong>FallCheck</strong> is a daily health check-in application
              designed specifically for adults aged 65 and over living in
              Scotland. It serves as an early detection tool for fall risk,
              helping users monitor their health each day and identify warning
              signs before a fall occurs.
            </p>
            <p>
              Falls are the leading cause of injury-related hospital admissions
              in over-65s in Scotland. FallCheck addresses this public health
              challenge by bringing evidence-based risk assessment directly to
              the individual, in a simple and accessible digital format.
            </p>
            <p>
              The app is built with older adults in mind — large buttons, clear
              language, strong contrast options, and a guided daily
              questionnaire that takes only a few minutes to complete. It works
              on smartphones, tablets, and desktop computers.
            </p>
          </CardContent>
        </Card>

        {/* Section 2: Usefulness */}
        <Card className="border-blue-200 dark:border-blue-900 shadow-sm print:shadow-none print:border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-xl text-blue-800 dark:text-blue-300">
              <Heart className="w-6 h-6 shrink-0" />
              2. Why FallCheck Is Useful
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Scotland Fall Statistics (NHS Scotland / Public Health Scotland)
              </p>
              <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-300 text-sm">
                <li>
                  Falls are the leading cause of injury-related hospital
                  admissions in over-65s in Scotland
                </li>
                <li>
                  Approximately 1 in 3 adults aged over 65 fall each year in
                  Scotland
                </li>
                <li>
                  Around 26,000 people aged 65+ are admitted to Scottish
                  hospitals each year due to falls
                </li>
                <li>
                  Falls cost NHS Scotland an estimated £470 million per year
                </li>
                <li>
                  Many falls are preventable with early intervention and risk
                  awareness
                </li>
              </ul>
            </div>

            <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300 space-y-3">
              <p>
                <strong>Early detection saves lives.</strong> Many falls are
                preceded by subtle changes in health — slight dizziness,
                increased fatigue, mild joint pain, or a recent medication
                change. By checking in every day, FallCheck captures these
                changes before they escalate into a fall.
              </p>
              <p>
                <strong>Reduces NHS Scotland burden.</strong> Each fall-related
                hospital admission costs NHS Scotland significantly. By
                empowering individuals to self-monitor and seek timely GP
                advice, FallCheck supports preventative healthcare and helps
                reduce unnecessary emergency presentations.
              </p>
              <p>
                <strong>Empowers carers and families.</strong> Family members
                and carers gain a structured tool to support their loved ones.
                The app's risk scores and trend data provide clear,
                evidence-based information to share with healthcare
                professionals.
              </p>
              <p>
                <strong>Reduces fear of falling.</strong> Fear of falling is
                itself a risk factor — it leads to reduced activity, muscle
                weakness, and social isolation. FallCheck gives users a sense of
                agency and control over their health, replacing anxiety with
                informed action.
              </p>
              <p>
                <strong>Supports independent living.</strong> By helping older
                adults stay healthier for longer, FallCheck supports
                independence and quality of life — a key priority for NHS
                Scotland and the Scottish Government's ageing-well strategy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: How It Prevents Falls */}
        <Card className="border-amber-200 dark:border-amber-900 shadow-sm print:shadow-none print:border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-xl text-amber-800 dark:text-amber-300">
              <ShieldCheck className="w-6 h-6 shrink-0" />
              3. How FallCheck Prevents Falls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              FallCheck uses a structured, evidence-based approach to fall
              prevention:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {preventionCards.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900"
                >
                  <item.icon className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 dark:text-amber-200 text-sm mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Risk Level Guide:
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-300 dark:border-green-700 px-3 py-1">
                    Low Risk
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Continue normal activity. Maintain good habits.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-3 py-1">
                    Moderate Risk
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Take care. Consider contacting your GP.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border border-red-300 dark:border-red-700 px-3 py-1">
                    High Risk
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Seek medical advice. Contact GP or NHS 24.
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Features */}
        <Card className="border-purple-200 dark:border-purple-900 shadow-sm print:shadow-none print:border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-xl text-purple-800 dark:text-purple-300">
              <ListChecks className="w-6 h-6 shrink-0" />
              4. App Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {features.map((label) => (
                <li key={label} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Section 5: NHS Disclaimer */}
        <Card className="border-gray-200 dark:border-gray-700 shadow-sm print:shadow-none print:border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-xl text-gray-700 dark:text-gray-300">
              <AlertTriangle className="w-6 h-6 shrink-0 text-amber-500" />
              5. Important Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              FallCheck is an informational health monitoring tool and is{" "}
              <strong>not a medical device</strong>. It does not provide medical
              diagnoses and should not replace professional medical advice,
              examination, or treatment.
            </p>
            <p>
              If you are experiencing a medical emergency, call{" "}
              <strong>999</strong> immediately. For urgent medical advice that
              is not an emergency, call <strong>NHS 24 (111)</strong>. For
              non-urgent health concerns, contact your GP.
            </p>
            <p>
              The risk scores generated by FallCheck are based on self-reported
              data and general fall risk factors. They are intended to prompt
              awareness and conversation with healthcare professionals, not to
              serve as clinical assessments.
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8 print:my-6" />

      <div className="text-center text-sm text-gray-500 dark:text-gray-500 space-y-1 print:text-left">
        <p>
          © {new Date().getFullYear()} FallCheck &nbsp;·&nbsp; Built with{" "}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline print:hidden"
          >
            caffeine.ai
          </a>
          <span className="hidden print:inline">caffeine.ai</span>
        </p>
        <p>Designed for adults aged 65+ in Scotland</p>
      </div>

      <div className="print:hidden mt-8 text-center">
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/" })}
          className="gap-2"
          data-ocid="document.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </Button>
      </div>
    </div>
  );
}
