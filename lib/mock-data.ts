export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  supplier: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
  image: string;
  gridImage: string;
}

export interface Activity {
  id: string;
  type: "shipment" | "alert" | "supplier" | "order";
  message: string;
  timestamp: string;
  user: string;
}

export type ReportType =
  | "Inventory"
  | "Supplier"
  | "Orders"
  | "Financial"
  | "Activity";

export type ReportStatus = "Ready" | "Generating" | "Scheduled" | "Failed";

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  status: ReportStatus;
  createdBy: string;
  createdAt: string;
  lastRun: string;
  nextRun?: string;
  fileSize?: string;
  format: "PDF" | "CSV" | "XLSX";
  description: string;
  rowCount?: number;
}

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type OrderPriority = "Low" | "Medium" | "High" | "Urgent";

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}
export interface Order {
  id: string;
  orderNumber: string;
  supplier: string;
  supplierId: string;
  status: OrderStatus;
  priority: OrderPriority;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  shippingAddress: string;
  trackingNumber?: string;
  notes: string;
  createdBy: string;
}

export type SupplierStatus = "Active" | "Under Review" | "Inactive";

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  country: string;
  city: string;
  categories: string[];
  status: SupplierStatus;
  rating: number; // 1–5
  leadTimeDays: number; // average lead time
  totalOrders: number;
  onTimeRate: number; // percentage 0–100
  joinedDate: string;
  lastOrderDate: string;
  notes: string;
}

export const inventoryData: Product[] = [
  {
    id: "1",
    name: "Precision Gear Pro",
    sku: "PGP-001",
    category: "Mechanical",
    quantity: 145,
    supplier: "TechCore Industries",
    status: "In Stock",
    lastUpdated: "2024-05-16 14:30",

    // Small image for table/avatar
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop",

    // Large image for product grid/cards
    gridImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
  },

  {
    id: "2",
    name: "Wireless Flux Module",
    sku: "WFM-420",
    category: "Electronics",
    quantity: 8,
    supplier: "Nexus Labs",
    status: "Low Stock",
    lastUpdated: "2024-05-15 09:15",

    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100&h=100&fit=crop",

    gridImage:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=800&fit=crop",
  },

  {
    id: "3",
    name: "Industrial Valve X",
    sku: "IVX-98",
    category: "Plumbing",
    quantity: 0,
    supplier: "Flow Dynamics",
    status: "Out of Stock",
    lastUpdated: "2024-05-14 11:20",

    image:
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=100&h=100&fit=crop",

    gridImage:
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=800&fit=crop",
  },

  {
    id: "4",
    name: "Titanium Bolts Set",
    sku: "TBS-200",
    category: "Fasteners",
    quantity: 850,
    supplier: "Alloy Metals",
    status: "In Stock",
    lastUpdated: "2024-05-16 16:45",

    image:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=100&h=100&fit=crop",

    gridImage:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&h=800&fit=crop&q=80",
  },

  {
    id: "5",
    name: "Optical Sensor R5",
    sku: "OSR-500",
    category: "Electronics",
    quantity: 12,
    supplier: "VisioTech",
    status: "Low Stock",
    lastUpdated: "2024-05-16 10:00",

    image:
      "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=100&h=100&fit=crop",

    gridImage:
      "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&h=800&fit=crop",
  },
];

export const activityData: Activity[] = [
  {
    id: "A1",
    type: "shipment",
    message: "New shipment of Titanium Bolts received (500 units)",
    timestamp: "2 hours ago",
    user: "Sarah Miller",
  },
  {
    id: "A2",
    type: "alert",
    message: "Stock alert: Wireless Flux Module reached minimum threshold",
    timestamp: "5 hours ago",
    user: "System",
  },
  {
    id: "A3",
    type: "supplier",
    message: "VisioTech updated pricing for Optical Sensor series",
    timestamp: "1 day ago",
    user: "Nexus Labs",
  },
  {
    id: "A4",
    type: "order",
    message: "Order #ORD-8829 completed and dispatched",
    timestamp: "1 day ago",
    user: "James Chen",
  },
];

export const chartData = [
  { name: "Mon", movement: 400, sales: 240, amt: 2400 },
  { name: "Tue", movement: 300, sales: 139, amt: 2210 },
  { name: "Wed", movement: 200, sales: 980, amt: 2290 },
  { name: "Thu", movement: 278, sales: 390, amt: 2000 },
  { name: "Fri", movement: 189, sales: 480, amt: 2181 },
  { name: "Sat", movement: 239, sales: 380, amt: 2500 },
  { name: "Sun", movement: 349, sales: 430, amt: 2100 },
];

export const categoryData = [
  { name: "Mechanical", value: 400 },
  { name: "Electronics", value: 300 },
  { name: "Fasteners", value: 300 },
  { name: "Plumbing", value: 200 },
];

export const suppliersData: Supplier[] = [
  {
    id: "S1",
    name: "TechCore Industries",
    contactName: "Marcus Webb",
    contactEmail: "marcus.webb@techcore.io",
    contactPhone: "+1 (415) 882-3301",
    country: "United States",
    city: "San Francisco, CA",
    categories: ["Mechanical", "Fasteners"],
    status: "Active",
    rating: 5,
    leadTimeDays: 7,
    totalOrders: 142,
    onTimeRate: 97,
    joinedDate: "2021-03-12",
    lastOrderDate: "2024-05-16",
    notes:
      "Primary supplier for mechanical components. Preferred partner with negotiated volume pricing.",
  },
  {
    id: "S2",
    name: "Nexus Labs",
    contactName: "Priya Kapoor",
    contactEmail: "priya.kapoor@nexuslabs.com",
    contactPhone: "+44 20 7946 0821",
    country: "United Kingdom",
    city: "London",
    categories: ["Electronics"],
    status: "Active",
    rating: 4,
    leadTimeDays: 14,
    totalOrders: 89,
    onTimeRate: 91,
    joinedDate: "2022-01-08",
    lastOrderDate: "2024-05-15",
    notes:
      "Specialist in wireless and flux modules. Lead times can extend during peak quarters.",
  },
  {
    id: "S3",
    name: "Flow Dynamics",
    contactName: "Carlos Reyes",
    contactEmail: "c.reyes@flowdynamics.mx",
    contactPhone: "+52 55 4444 7890",
    country: "Mexico",
    city: "Monterrey",
    categories: ["Plumbing"],
    status: "Under Review",
    rating: 3,
    leadTimeDays: 21,
    totalOrders: 34,
    onTimeRate: 74,
    joinedDate: "2023-06-20",
    lastOrderDate: "2024-05-14",
    notes:
      "On-time delivery has declined over the last two quarters. Under review for contract renewal.",
  },
  {
    id: "S4",
    name: "Alloy Metals",
    contactName: "Sarah Miller",
    contactEmail: "sarah.miller@alloymetals.de",
    contactPhone: "+49 89 2102 5540",
    country: "Germany",
    city: "Munich",
    categories: ["Fasteners", "Mechanical"],
    status: "Active",
    rating: 5,
    leadTimeDays: 10,
    totalOrders: 218,
    onTimeRate: 99,
    joinedDate: "2020-11-03",
    lastOrderDate: "2024-05-16",
    notes:
      "Longest-standing supplier. Exceptional reliability and premium-grade alloys at competitive rates.",
  },
  {
    id: "S5",
    name: "VisioTech",
    contactName: "James Chen",
    contactEmail: "james.chen@visiotech.sg",
    contactPhone: "+65 6321 8800",
    country: "Singapore",
    city: "Singapore",
    categories: ["Electronics"],
    status: "Active",
    rating: 4,
    leadTimeDays: 18,
    totalOrders: 67,
    onTimeRate: 88,
    joinedDate: "2022-09-15",
    lastOrderDate: "2024-05-16",
    notes:
      "Recently updated pricing on the Optical Sensor R-series. Good technical support team.",
  },
];

export const ordersData: Order[] = [
  {
    id: "O1",
    orderNumber: "ORD-9201",
    supplier: "TechCore Industries",
    supplierId: "S1",
    status: "Delivered",
    priority: "High",
    items: [
      {
        productId: "1",
        productName: "Precision Gear Pro",
        sku: "PGP-001",
        quantity: 50,
        unitPrice: 84.99,
      },
      {
        productId: "4",
        productName: "Titanium Bolts Set",
        sku: "TBS-200",
        quantity: 200,
        unitPrice: 12.5,
      },
    ],
    totalAmount: 6749.5,
    currency: "USD",
    orderDate: "2024-05-01",
    expectedDelivery: "2024-05-10",
    actualDelivery: "2024-05-09",
    shippingAddress: "123 Warehouse Blvd, Austin, TX 78701",
    trackingNumber: "TC-88201-USP",
    notes: "Early delivery. All units passed QC inspection.",
    createdBy: "Sarah Miller",
  },
  {
    id: "O2",
    orderNumber: "ORD-9202",
    supplier: "Nexus Labs",
    supplierId: "S2",
    status: "Shipped",
    priority: "Urgent",
    items: [
      {
        productId: "2",
        productName: "Wireless Flux Module",
        sku: "WFM-420",
        quantity: 30,
        unitPrice: 219.0,
      },
    ],
    totalAmount: 6570.0,
    currency: "USD",
    orderDate: "2024-05-10",
    expectedDelivery: "2024-05-24",
    shippingAddress: "123 Warehouse Blvd, Austin, TX 78701",
    trackingNumber: "NX-00421-INT",
    notes: "Urgent restock due to low stock alert. Express shipping applied.",
    createdBy: "James Chen",
  },
  {
    id: "O3",
    orderNumber: "ORD-9203",
    supplier: "Flow Dynamics",
    supplierId: "S3",
    status: "Processing",
    priority: "Medium",
    items: [
      {
        productId: "3",
        productName: "Industrial Valve X",
        sku: "IVX-98",
        quantity: 15,
        unitPrice: 349.0,
      },
    ],
    totalAmount: 5235.0,
    currency: "USD",
    orderDate: "2024-05-12",
    expectedDelivery: "2024-06-02",
    shippingAddress: "123 Warehouse Blvd, Austin, TX 78701",
    notes: "Delayed confirmation from supplier. Under monitoring.",
    createdBy: "Marcus Webb",
  },
  {
    id: "O4",
    orderNumber: "ORD-9204",
    supplier: "Alloy Metals",
    supplierId: "S4",
    status: "Delivered",
    priority: "Low",
    items: [
      {
        productId: "4",
        productName: "Titanium Bolts Set",
        sku: "TBS-200",
        quantity: 500,
        unitPrice: 11.75,
      },
    ],
    totalAmount: 5875.0,
    currency: "USD",
    orderDate: "2024-04-28",
    expectedDelivery: "2024-05-08",
    actualDelivery: "2024-05-07",
    shippingAddress: "123 Warehouse Blvd, Austin, TX 78701",
    trackingNumber: "AM-33019-DHL",
    notes: "Bulk order. Volume discount applied at checkout.",
    createdBy: "Sarah Miller",
  },
  {
    id: "O5",
    orderNumber: "ORD-9205",
    supplier: "VisioTech",
    supplierId: "S5",
    status: "Pending",
    priority: "High",
    items: [
      {
        productId: "5",
        productName: "Optical Sensor R5",
        sku: "OSR-500",
        quantity: 20,
        unitPrice: 445.0,
      },
    ],
    totalAmount: 8900.0,
    currency: "USD",
    orderDate: "2024-05-16",
    expectedDelivery: "2024-06-03",
    shippingAddress: "123 Warehouse Blvd, Austin, TX 78701",
    notes: "Awaiting supplier confirmation after pricing update.",
    createdBy: "Priya Kapoor",
  },
  {
    id: "O6",
    orderNumber: "ORD-9200",
    supplier: "TechCore Industries",
    supplierId: "S1",
    status: "Cancelled",
    priority: "Medium",
    items: [
      {
        productId: "1",
        productName: "Precision Gear Pro",
        sku: "PGP-001",
        quantity: 10,
        unitPrice: 84.99,
      },
    ],
    totalAmount: 849.9,
    currency: "USD",
    orderDate: "2024-04-20",
    expectedDelivery: "2024-04-30",
    shippingAddress: "456 Distribution Ave, Dallas, TX 75201",
    notes: "Cancelled due to incorrect shipping address on original PO.",
    createdBy: "James Chen",
  },
];

export const orderTimelineData = [
  { month: "Dec", orders: 18, value: 42000 },
  { month: "Jan", orders: 24, value: 58000 },
  { month: "Feb", orders: 19, value: 47500 },
  { month: "Mar", orders: 31, value: 76200 },
  { month: "Apr", orders: 27, value: 63800 },
  { month: "May", orders: 22, value: 55400 },
];

export const reportsData: Report[] = [
  {
    id: "R1",
    name: "Monthly Inventory Summary",
    type: "Inventory",
    status: "Ready",
    createdBy: "Sarah Miller",
    createdAt: "2024-04-01",
    lastRun: "2024-05-01",
    nextRun: "2024-06-01",
    fileSize: "1.2 MB",
    format: "PDF",
    description:
      "Full snapshot of stock levels, reorder points, and valuation across all categories.",
    rowCount: 248,
  },
  {
    id: "R2",
    name: "Supplier Performance Report",
    type: "Supplier",
    status: "Ready",
    createdBy: "James Chen",
    createdAt: "2024-03-15",
    lastRun: "2024-05-10",
    nextRun: "2024-06-10",
    fileSize: "840 KB",
    format: "XLSX",
    description:
      "On-time rates, lead time analysis, and rating trends per supplier.",
    rowCount: 5,
  },
  {
    id: "R3",
    name: "Q2 Order Activity",
    type: "Orders",
    status: "Ready",
    createdBy: "Priya Kapoor",
    createdAt: "2024-05-01",
    lastRun: "2024-05-16",
    fileSize: "560 KB",
    format: "CSV",
    description:
      "All purchase orders placed in Q2, including status, amounts, and delivery outcomes.",
    rowCount: 89,
  },
  {
    id: "R4",
    name: "Low Stock Alert Digest",
    type: "Inventory",
    status: "Scheduled",
    createdBy: "System",
    createdAt: "2024-01-01",
    lastRun: "2024-05-15",
    nextRun: "2024-05-22",
    format: "PDF",
    description:
      "Daily digest of products at or below their minimum stock threshold.",
    rowCount: 12,
  },
  {
    id: "R5",
    name: "Financial Spend Analysis",
    type: "Financial",
    status: "Generating",
    createdBy: "Marcus Webb",
    createdAt: "2024-05-16",
    lastRun: "2024-05-16",
    format: "XLSX",
    description:
      "Breakdown of procurement spend by supplier, category, and time period.",
  },
  {
    id: "R6",
    name: "Activity Log Export",
    type: "Activity",
    status: "Ready",
    createdBy: "James Chen",
    createdAt: "2024-05-12",
    lastRun: "2024-05-12",
    fileSize: "2.1 MB",
    format: "CSV",
    description:
      "Full audit trail of user actions, shipments, and system events.",
    rowCount: 1042,
  },
  {
    id: "R7",
    name: "Supplier Contract Review",
    type: "Supplier",
    status: "Failed",
    createdBy: "Sarah Miller",
    createdAt: "2024-05-14",
    lastRun: "2024-05-14",
    format: "PDF",
    description:
      "Automated review of contract expiry dates and renewal requirements.",
  },
];

// KPI trend data for the overview charts
export const kpiTrendData = [
  {
    month: "Dec",
    inventoryValue: 184000,
    ordersPlaced: 18,
    onTimeRate: 91,
    stockouts: 3,
  },
  {
    month: "Jan",
    inventoryValue: 197000,
    ordersPlaced: 24,
    onTimeRate: 88,
    stockouts: 5,
  },
  {
    month: "Feb",
    inventoryValue: 210000,
    ordersPlaced: 19,
    onTimeRate: 93,
    stockouts: 2,
  },
  {
    month: "Mar",
    inventoryValue: 228000,
    ordersPlaced: 31,
    onTimeRate: 95,
    stockouts: 1,
  },
  {
    month: "Apr",
    inventoryValue: 215000,
    ordersPlaced: 27,
    onTimeRate: 92,
    stockouts: 2,
  },
  {
    month: "May",
    inventoryValue: 231000,
    ordersPlaced: 22,
    onTimeRate: 94,
    stockouts: 1,
  },
];

export const categoryStockData = [
  { category: "Mechanical", inStock: 145, lowStock: 0, outOfStock: 0 },
  { category: "Electronics", inStock: 8, lowStock: 12, outOfStock: 0 },
  { category: "Fasteners", inStock: 850, lowStock: 0, outOfStock: 0 },
  { category: "Plumbing", inStock: 0, lowStock: 0, outOfStock: 15 },
];
