// components/features/currency/CurrencyConverter.tsx
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { mockCurrencies } from '@/data/mockCurrencies';

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(0);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  // Convert currency when inputs change
  useEffect(() => {
    const from = mockCurrencies.find(c => c.code === fromCurrency);
    const to = mockCurrencies.find(c => c.code === toCurrency);
    
    if (from && to) {
      const conversion = (amount * to.fakeExchangeRate) / from.fakeExchangeRate;
      setResult(conversion);
      
      // Animate result change
      if (resultRef.current) {
        gsap.fromTo(
          resultRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
    }
  }, [amount, fromCurrency, toCurrency]);
  
  const handleSwapCurrencies = () => {
    // Animate swap
    const tl = gsap.timeline();
    
    tl.to('.currency-select', {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
    }).then(() => {
      // Swap values
      const temp = fromCurrency;
      setFromCurrency(toCurrency);
      setToCurrency(temp);
      
      // Animate back
      gsap.to('.currency-select', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  };
  
  return (
    <div className="bg-white p-8 rounded-sm shadow-md">
      <h3 className="font-serif text-2xl mb-6">Currency Converter</h3>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-6">
        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-2" htmlFor="fromCurrency">
            From
          </label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="currency-select w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            {mockCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-center items-center">
          <button
            onClick={handleSwapCurrencies}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </button>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-2" htmlFor="toCurrency">
            To
          </label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="currency-select w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            {mockCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div 
        ref={resultRef}
        className="bg-gray-50 p-6 rounded-sm border-l-4 border-secondary text-center"
      >
        <div className="text-sm text-gray-600 mb-2">Converted Amount</div>
        <div className="font-serif text-3xl text-gray-900">
          {result.toFixed(2)} {toCurrency}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          1 {fromCurrency} = {(mockCurrencies.find(c => c.code === toCurrency)?.fakeExchangeRate || 0).toFixed(4)} {toCurrency}
        </div>
      </div>
      
      <div className="mt-6 text-xs text-gray-500 italic">
        * Exchange rates are for demonstration purposes only and may not reflect actual market rates.
      </div>
    </div>
  );
};