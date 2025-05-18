'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const THEMES = ['light', 'dark', 'blue', 'rose', 'violet', 'system'];

export function ThemeProvider({
  children,
  defaultTheme = 'blue',
  storageKey = 'theme',
  ...props
}: Omit<React.ComponentProps<typeof NextThemesProvider>, 'themes'> & {
  forcedTheme?: string;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      themes={THEMES}
      enableColorScheme
      storageKey={storageKey}
      forcedTheme={props.forcedTheme}
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
