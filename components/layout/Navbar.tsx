'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin, Calendar, Home } from 'lucide-react';
import gsap from 'gsap';
import { ModeToggle } from '@/components/theme/Theme-button';
import Image from 'next/image';
import Logo from '@/public/logo.png'
import {useTransitionRouter} from 'next-view-transitions'
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShowNavbar, setShouldShowNavbar] = useState(true);
  const router=useTransitionRouter()
  function slideInOut(){
document.documentElement.animate([
  {
    opacity:1,
    transform:"translateY(0)"
  },
  {
    opacity:0.2,
    transform:"translateY(-35%)"
  }
],{
  duration: 800,
    easing: "cubic-bezier(0.65, 0, 0.35, 1)", 
    fill: "forwards",
    pseudoElement: "::view-transition-old(root)"
})
document.documentElement.animate([
  {
   clipPath:"polygon(0% 100%, 100% 100%, 100% 100%,0% 100%)"
  },
  {
    clipPath:"polygon(0% 100%, 100% 100%,100% 0%,0% 0%)",
  }
],{
  duration:800,
  easing:"cubic-bezier(0.87,0,0.13,1)",
  fill:"forwards",
  pseudoElement:"::view-transition-new(root)"
})
  }
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.nav-link',
        { 
          y: -20, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: 'power3.out' 
        }
      );
      
      // Animate logo
      gsap.fromTo(
        '.nav-logo',
        { 
          x: -30, 
          opacity: 0 
        },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'back.out(1.7)' 
        }
      );
    }, navbarRef);
    
    return () => ctx.revert();
  }, []);
  
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { 
        if (shouldShowNavbar) {
          gsap.to(navbarRef.current, {
            y: -100, 
            duration: 0.3,
            ease: 'power2.inOut',
            onComplete: () => setShouldShowNavbar(false)
          });
        }
      } else { 
        if (!shouldShowNavbar) {
          setShouldShowNavbar(true);
          gsap.to(navbarRef.current, {
            y: 0, 
            duration: 0.3,
            ease: 'power2.inOut'
          });
        }
      }
      
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, shouldShowNavbar]);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/destinations', label: 'Destinations', icon: MapPin },
    { href: '/planner', label: 'Trip Planner', icon: Calendar },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      gsap.fromTo(
        '.mobile-nav-link',
        { 
          x: -30, 
          opacity: 0 
        },
        { 
          x: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.4, 
          ease: 'power2.out' 
        }
      );
    }
  };



  return (
    <div 
      ref={navbarRef} 
      className="fixed top-0 left-0 right-0 z-50 transition-all"
    >
      <nav className="bg-card/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="nav-logo flex items-center">
              <Link onClick={(e)=>{
                e.preventDefault()
                router.push("/",{
                  onTransitionReady:slideInOut,
                })
              }} href="/" className="custom-pointer text-xl font-serif font-bold flex items-center gap-2">
              <Image
                src={Logo}
                alt="TravelEase Logo"
                width={50}
                height={50}
                className="mr-2"
              />
                <span className="text-primary">Travel</span>
                <span className="neon:glow-text">Ease</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                  onClick={(e)=>{
                    e.preventDefault()
                    router.push(`${link.href}`,{
                      onTransitionReady:slideInOut,
                    })
                  }}
                    key={link.href}
                    href={link.href}
                    className={` custom-pointer nav-link flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'text-primary font-medium neon:glow-text' 
                        : 'hover:text-primary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="nav-link">
                <ModeToggle />
              </div>
            </div>
            <div className="flex items-center md:hidden space-x-4">
              <div className="nav-link">
                <ModeToggle />
              </div>
              <button
                onClick={toggleMenu}
                className="text-foreground neon:glow-text"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-md mt-1 shadow-lg">
            <div className="container mx-auto py-3">
              <ul className="space-y-2 p-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;

                  return (
                    <li key={link.href}>
                      <Link 
                      onClick={(e)=>{
                        e.preventDefault()
                        router.push(`${link.href}`,{
                          onTransitionReady:slideInOut,
                        })
                      }}
                        href={link.href}
                        className={`custom-pointer mobile-nav-link flex items-center space-x-2 p-3 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-primary/20 text-primary font-medium' 
                            : 'hover:bg-primary/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}