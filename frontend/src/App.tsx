import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import AppLayout from './components/layout/AppLayout';
import OnboardingPage from './pages/OnboardingPage';
import DailyCheckInPage from './pages/DailyCheckInPage';
import CheckInConfirmationPage from './pages/CheckInConfirmationPage';
import CheckInDetailPage from './pages/CheckInDetailPage';
import RiskResultsPage from './pages/RiskResultsPage';
import HistoryPage from './pages/HistoryPage';
import HistoryDetailPage from './pages/HistoryDetailPage';
import AccessibilitySettingsPage from './pages/AccessibilitySettingsPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PrivacyPage from './pages/PrivacyPage';
import LoadingState from './components/shared/LoadingState';
import { AccessibilityProvider } from './hooks/useAccessibilitySettings';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function RootLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { identity, loginStatus } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const isInitializing = loginStatus === 'initializing';

  if (isInitializing || (isAuthenticated && profileLoading)) {
    return <LoadingState message="Loading your profile..." />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-2xl w-full text-center space-y-6">
          <img 
            src="/assets/generated/uk-fallcheck-logo.dim_512x512.png" 
            alt="UK FallCheck Logo" 
            className="w-32 h-32 mx-auto"
          />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to FallCheck</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Your daily health companion for fall prevention
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Please sign in to continue
          </p>
        </div>
      </div>
    );
  }

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (showProfileSetup) {
    return <OnboardingPage />;
  }

  return <>{children}</>;
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <AuthGate>
      <DailyCheckInPage />
    </AuthGate>
  ),
});

const checkInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/check-in',
  component: () => (
    <AuthGate>
      <DailyCheckInPage />
    </AuthGate>
  ),
});

const confirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/confirmation',
  component: () => (
    <AuthGate>
      <CheckInConfirmationPage />
    </AuthGate>
  ),
});

const checkInDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/check-in/$date',
  component: () => (
    <AuthGate>
      <CheckInDetailPage />
    </AuthGate>
  ),
});

const riskResultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/risk-results',
  component: () => (
    <AuthGate>
      <RiskResultsPage />
    </AuthGate>
  ),
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: () => (
    <AuthGate>
      <HistoryPage />
    </AuthGate>
  ),
});

const historyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history/$date',
  component: () => (
    <AuthGate>
      <HistoryDetailPage />
    </AuthGate>
  ),
});

const accessibilityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/accessibility',
  component: () => (
    <AuthGate>
      <AccessibilitySettingsPage />
    </AuthGate>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/how-it-works',
  component: HowItWorksPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  checkInRoute,
  confirmationRoute,
  checkInDetailRoute,
  riskResultsRoute,
  historyRoute,
  historyDetailRoute,
  accessibilityRoute,
  aboutRoute,
  howItWorksRoute,
  privacyRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AccessibilityProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AccessibilityProvider>
    </ThemeProvider>
  );
}
