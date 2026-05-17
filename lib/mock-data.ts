
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
  image: string;
}

export interface Activity {
  id: string;
  type: 'shipment' | 'alert' | 'supplier' | 'order';
  message: string;
  timestamp: string;
  user: string;
}

export const inventoryData: Product[] = [
  {
    id: '1',
    name: 'Precision Gear Pro',
    sku: 'PGP-001',
    category: 'Mechanical',
    quantity: 145,
    supplier: 'TechCore Industries',
    status: 'In Stock',
    lastUpdated: '2024-05-16 14:30',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Wireless Flux Module',
    sku: 'WFM-420',
    category: 'Electronics',
    quantity: 8,
    supplier: 'Nexus Labs',
    status: 'Low Stock',
    lastUpdated: '2024-05-15 09:15',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Industrial Valve X',
    sku: 'IVX-98',
    category: 'Plumbing',
    quantity: 0,
    supplier: 'Flow Dynamics',
    status: 'Out of Stock',
    lastUpdated: '2024-05-14 11:20',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'Titanium Bolts Set',
    sku: 'TBS-200',
    category: 'Fasteners',
    quantity: 850,
    supplier: 'Alloy Metals',
    status: 'In Stock',
    lastUpdated: '2024-05-16 16:45',
    image: 'https://images.unsplash.com/photo-1530124560676-44b2bfe6031b?w=100&h=100&fit=crop',
  },
  {
    id: '5',
    name: 'Optical Sensor R5',
    sku: 'OSR-500',
    category: 'Electronics',
    quantity: 12,
    supplier: 'VisioTech',
    status: 'Low Stock',
    lastUpdated: '2024-05-16 10:00',
    image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=100&h=100&fit=crop',
  },
];

export const activityData: Activity[] = [
  {
    id: 'A1',
    type: 'shipment',
    message: 'New shipment of Titanium Bolts received (500 units)',
    timestamp: '2 hours ago',
    user: 'Sarah Miller',
  },
  {
    id: 'A2',
    type: 'alert',
    message: 'Stock alert: Wireless Flux Module reached minimum threshold',
    timestamp: '5 hours ago',
    user: 'System',
  },
  {
    id: 'A3',
    type: 'supplier',
    message: 'VisioTech updated pricing for Optical Sensor series',
    timestamp: '1 day ago',
    user: 'Nexus Labs',
  },
  {
    id: 'A4',
    type: 'order',
    message: 'Order #ORD-8829 completed and dispatched',
    timestamp: '1 day ago',
    user: 'James Chen',
  },
];

export const chartData = [
  { name: 'Mon', movement: 400, sales: 240, amt: 2400 },
  { name: 'Tue', movement: 300, sales: 139, amt: 2210 },
  { name: 'Wed', movement: 200, sales: 980, amt: 2290 },
  { name: 'Thu', movement: 278, sales: 390, amt: 2000 },
  { name: 'Fri', movement: 189, sales: 480, amt: 2181 },
  { name: 'Sat', movement: 239, sales: 380, amt: 2500 },
  { name: 'Sun', movement: 349, sales: 430, amt: 2100 },
];

export const categoryData = [
  { name: 'Mechanical', value: 400 },
  { name: 'Electronics', value: 300 },
  { name: 'Fasteners', value: 300 },
  { name: 'Plumbing', value: 200 },
];
