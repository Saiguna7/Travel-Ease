'use client';

import { useEffect, useState, memo } from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Theme options with their display names and icons
const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'blue', label: 'Blue', icon: Palette },
  { value: 'rose', label: 'Rose', icon: Palette },
  { value: 'violet', label: 'Violet', icon: Palette },
  { value: 'system', label: 'System', icon: null },
];

const ThemeItem = memo(
  ({
    theme,
    currentTheme,
    onSelect,
  }: {
    theme: string;
    currentTheme: string | undefined;
    onSelect: () => void;
  }) => {
    const option = themeOptions.find(option => option.value === theme);
    const Icon = option?.icon;

    return (
      <DropdownMenuItem
        onClick={onSelect}
        className={
          currentTheme === theme ? 'bg-accent text-accent-foreground' : ''
        }
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {option?.label}
      </DropdownMenuItem>
    );
  },
);
ThemeItem.displayName = 'ThemeItem';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolveThemeIcon = () => {
    if (!mounted || !theme) return Sun;

    const option = themeOptions.find(opt => opt.value === theme);
    return option?.icon || Sun;
  };

  const ThemeIcon = resolveThemeIcon();

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className='custom-pointer'>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ThemeIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map(option => (
          <ThemeItem
            key={option.value}
            theme={option.value}
            currentTheme={theme}
            onSelect={() => setTheme(option.value)}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
