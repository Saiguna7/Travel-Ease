export interface PackingItem {
    id: string;
    name: string;
    category: 'clothing' | 'toiletries' | 'electronics' | 'documents' | 'miscellaneous';
    packed: boolean;
    essential: boolean;
  }