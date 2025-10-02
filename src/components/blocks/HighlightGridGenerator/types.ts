export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  featuredImage?: {
    id: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  assets?: any[];
  year?: number;
  publishedDate?: string;
  createdAt?: string;
  excerpt?: string;
  introduction?: any;
  content?: any;
  _contentType: 'article' | 'showcase';
}

export interface CardProps {
  item: ContentItem;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}
