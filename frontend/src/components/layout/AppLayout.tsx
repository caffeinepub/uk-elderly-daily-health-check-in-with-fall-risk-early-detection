import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import LoginButton from '../auth/LoginButton';
import BrandHeader from '../branding/BrandHeader';
import DisclaimerBanner from '../shared/DisclaimerBanner';
import { Menu, Home, History, Settings, Info, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { SiCaffeine } from 'react-icons/si';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const navItems = [
    { label: 'Daily Check-In', path: '/', icon: Home },
    { label: 'History', path: '/history', icon: History },
    { label: 'Accessibility', path: '/accessibility', icon: Settings },
  ];

  const infoItems = [
    { label: 'About', path: '/about', icon: Info },
    { label: 'How It Works', path: '/how-it-works', icon: FileText },
    { label: 'Privacy', path: '/privacy', icon: Shield },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-emerald-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BrandHeader />
            
            <div className="flex items-center gap-4">
              {isAuthenticated && (
                <nav className="hidden md:flex items-center gap-2">
                  {navItems.map((item) => (
                    <Button
                      key={item.path}
                      variant="ghost"
                      onClick={() => navigate({ to: item.path })}
                      className="text-base"
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              )}
              
              <LoginButton />
              
              {isAuthenticated && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <nav className="flex flex-col gap-4 mt-8">
                      {navItems.map((item) => (
                        <Button
                          key={item.path}
                          variant="ghost"
                          onClick={() => navigate({ to: item.path })}
                          className="justify-start text-lg h-12"
                        >
                          <item.icon className="w-6 h-6 mr-3" />
                          {item.label}
                        </Button>
                      ))}
                      <Separator className="my-2" />
                      {infoItems.map((item) => (
                        <Button
                          key={item.path}
                          variant="ghost"
                          onClick={() => navigate({ to: item.path })}
                          className="justify-start text-lg h-12"
                        >
                          <item.icon className="w-6 h-6 mr-3" />
                          {item.label}
                        </Button>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-t border-emerald-200 dark:border-gray-700 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <DisclaimerBanner compact />
          
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
            <nav className="flex flex-wrap gap-4">
              {infoItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate({ to: item.path })}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} FallCheck</span>
              <span>•</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Built with <SiCaffeine className="w-4 h-4 text-emerald-600" /> caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
