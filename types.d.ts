export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

interface ProdProps {
  categories: string[] | undefined;
  brand: string[] | undefined;
  title: string;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  sort: string | null;
}

type ProdFilters = {
  categories?: string[] | undefined;
  brand?: string[] | undefined;
  title?: string;
  sortField?: string;
  sortOrder?: string;
  rating?: number | null;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
};
