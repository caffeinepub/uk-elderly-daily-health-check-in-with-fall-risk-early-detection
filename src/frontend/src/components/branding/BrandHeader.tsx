import { useNavigate } from "@tanstack/react-router";

export default function BrandHeader() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate({ to: "/" })}
      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
    >
      <img
        src="/assets/generated/uk-fallcheck-logo.dim_512x512.png"
        alt="FallCheck Logo"
        className="w-12 h-12"
      />
      <div className="text-left">
        <h1 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
          FallCheck
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Daily Health Companion
        </p>
      </div>
    </button>
  );
}
