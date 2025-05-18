import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-serif font-bold">
              <span className="text-primary">Travel</span>
              <span className="neon:glow-text">Ease</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Your ultimate travel planning companion for creating unforgettable journeys.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors custom-pointer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors custom-pointer">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors custom-pointer">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations" className="custom-pointer text-muted-foreground hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/planner" className="custom-pointer text-muted-foreground hover:text-primary transition-colors">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link href="#" className="custom-pointer text-muted-foreground hover:text-primary transition-colors">
                  Travel Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="custom-pointer text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="custom-pointer text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="custom-pointer text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="custom-pointer text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="custom-pointer text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="custom-pointer text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}