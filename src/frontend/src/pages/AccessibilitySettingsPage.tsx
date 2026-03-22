import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAccessibilitySettings } from "../hooks/useAccessibilitySettings";

export default function AccessibilitySettingsPage() {
  const { textSize, contrastMode, setTextSize, setContrastMode } =
    useAccessibilitySettings();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Accessibility Settings
      </h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Text Size</CardTitle>
            <CardDescription className="text-base">
              Choose a comfortable text size for reading
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setTextSize("normal")}
              variant={textSize === "normal" ? "default" : "outline"}
              className="w-full h-16 text-lg"
            >
              Normal Text
            </Button>
            <Button
              onClick={() => setTextSize("large")}
              variant={textSize === "large" ? "default" : "outline"}
              className="w-full h-16 text-xl"
            >
              Large Text
            </Button>
            <Button
              onClick={() => setTextSize("largest")}
              variant={textSize === "largest" ? "default" : "outline"}
              className="w-full h-16 text-2xl"
            >
              Largest Text
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">High Contrast Mode</CardTitle>
            <CardDescription className="text-base">
              Increase contrast for better visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Label htmlFor="contrast" className="text-lg cursor-pointer">
                Enable High Contrast
              </Label>
              <Switch
                id="contrast"
                checked={contrastMode === "high"}
                onCheckedChange={(checked) =>
                  setContrastMode(checked ? "high" : "normal")
                }
                className="data-[state=checked]:bg-emerald-600"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
