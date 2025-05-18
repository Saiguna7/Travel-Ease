import { useState } from 'react';
import { gsap } from 'gsap';
import { PackingItem } from '@/types/packing';

interface PackingCategoryProps {
  items: PackingItem[];
  category: string;
}

export const PackingCategory: React.FC<PackingCategoryProps> = ({
  items,
}) => {
  const [packingItems, setPackingItems] = useState<PackingItem[]>(items);
  
  // Toggle item packed status
  const toggleItemPacked = (id: string) => {
    const itemIndex = packingItems.findIndex(item => item.id === id);
    
    if (itemIndex === -1) return;
    
    const updatedItems = [...packingItems];
    const item = { ...updatedItems[itemIndex] };
    item.packed = !item.packed;
    updatedItems[itemIndex] = item;
    
    // Animate the item
    const itemElement = document.getElementById(id);
    if (itemElement) {
      if (item.packed) {
        gsap.to(itemElement, {
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: '#10B981',
          duration: 0.3,
        });
        
        gsap.to(itemElement.querySelector('.checkmark'), {
          scale: 1,
          opacity: 1,
          duration: 0.3,
        });
      } else {
        gsap.to(itemElement, {
          backgroundColor: 'white',
          borderColor: '#E5E7EB',
          duration: 0.3,
        });
        
        gsap.to(itemElement.querySelector('.checkmark'), {
          scale: 0.5,
          opacity: 0,
          duration: 0.3,
        });
      }
    }
    
    setPackingItems(updatedItems);
  };
  
  // Group items by essential status
  const essentialItems = packingItems.filter(item => item.essential);
  const nonEssentialItems = packingItems.filter(item => !item.essential);
  
  return (
    <div className="space-y-8">
      {/* Essential items */}
      <div>
        <h3 className="text-xl font-serif mb-4">Essential Items</h3>
        <div className="space-y-2">
          {essentialItems.map(item => (
            <div
              id={item.id}
              key={item.id}
              className={`flex items-center p-4 border rounded-sm transition-colors ${
                item.packed 
                  ? 'bg-green-50 border-green-500' 
                  : 'bg-white border-gray-200'
              }`}
              onClick={() => toggleItemPacked(item.id)}
            >
              <div 
                className={`w-6 h-6 flex items-center justify-center rounded-full border mr-4 ${
                  item.packed 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-300'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`checkmark h-4 w-4 text-white transition-transform ${
                    item.packed ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              <div className="flex-grow">
                <span className={`${item.packed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {item.name}
                </span>
              </div>
              
              <div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Non-essential items */}
      {nonEssentialItems.length > 0 && (
        <div>
          <h3 className="text-xl font-serif mb-4">Optional Items</h3>
          <div className="space-y-2">
            {nonEssentialItems.map(item => (
              <div
                id={item.id}
                key={item.id}
                className={`flex items-center p-4 border rounded-sm transition-colors ${
                  item.packed 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-white border-gray-200'
                }`}
                onClick={() => toggleItemPacked(item.id)}
              >
                <div 
                  className={`w-6 h-6 flex items-center justify-center rounded-full border mr-4 ${
                    item.packed 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`checkmark h-4 w-4 text-white transition-transform ${
                      item.packed ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                
                <div className="flex-grow">
                  <span className={`${item.packed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.name}
                  </span>
                </div>
                
                <div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-sm border-l-4 border-primary">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Total items:</span>
          <span>{packingItems.length}</span>
        </div>
        
        <div className="flex justify-between mb-2">
          <span className="font-medium">Items packed:</span>
          <span>{packingItems.filter(item => item.packed).length}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Progress:</span>
          <span>
            {Math.round((packingItems.filter(item => item.packed).length / packingItems.length) * 100)}%
          </span>
        </div>
        
        <div className="mt-4 bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500" 
            style={{ 
              width: `${(packingItems.filter(item => item.packed).length / packingItems.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};