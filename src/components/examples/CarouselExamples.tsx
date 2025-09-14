import React from 'react';
import HorizontalSnapCarousel from '../HorizontalSnapCarousel';
import { MediaCard } from '../blocks/MediaCard';

// Example 1: Using with MediaCard (same as HorizontalCardBlock)
interface MediaCardItem {
  badge?: string;
  title: string;
  description: string;
  tags?: Array<{
    id: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }>;
  body?: any;
  image?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: unknown;
  };
}

// Example 2: Using with custom content
interface CustomItem {
  id: number;
  title: string;
  content: string;
  color: string;
  size: 'small' | 'medium' | 'large';
}

// Example 3: Using with simple text items
interface TextItem {
  id: number;
  title: string;
  text: string;
  author?: string;
}

export const CarouselExamples: React.FC = () => {
  // Example data
  const mediaCardItems: MediaCardItem[] = [
    {
      id: 1,
      title: 'Sample Media Card',
      description: 'This is a sample media card',
      tags: [{ id: '1', name: 'Sample Tag' }],
      body: {
        root: {
          children: [
            { children: [{ text: 'Sample content' }], type: 'paragraph' },
          ],
          type: 'root',
        },
      },
      image: { url: '/api/media/file/.jpg-1.jpg', alt: 'Sample image' },
      link: {
        type: 'external',
        text: 'Learn More',
        url: 'https://example.com',
      },
    },
  ];

  const customItems: CustomItem[] = [
    {
      id: 1,
      title: 'Custom Item 1',
      content: 'Custom content 1',
      color: 'bg-red-500',
      size: 'large',
    },
    {
      id: 2,
      title: 'Custom Item 2',
      content: 'Custom content 2',
      color: 'bg-blue-500',
      size: 'medium',
    },
    {
      id: 3,
      title: 'Custom Item 3',
      content: 'Custom content 3',
      color: 'bg-green-500',
      size: 'small',
    },
  ];

  const textItems: TextItem[] = [
    {
      id: 1,
      title: 'Quote 1',
      text: 'This is a sample quote',
      author: 'Author 1',
    },
    {
      id: 2,
      title: 'Quote 2',
      text: 'Another sample quote',
      author: 'Author 2',
    },
    {
      id: 3,
      title: 'Quote 3',
      text: 'Yet another sample quote',
      author: 'Author 3',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Example 1: Media Cards */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Media Cards Example</h2>
        <HorizontalSnapCarousel
          showDevIndicator={true}
          getItemTitle={index =>
            mediaCardItems[index]?.title || `Card ${index + 1}`
          }
        >
          {mediaCardItems.map((item, index) => (
            <MediaCard key={index} {...item} buttonVariant="primary" />
          ))}
        </HorizontalSnapCarousel>
      </section>

      {/* Example 2: Custom Content */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Custom Content Example</h2>
        <HorizontalSnapCarousel
          showDevIndicator={true}
          getItemTitle={index =>
            customItems[index]?.title || `Item ${index + 1}`
          }
        >
          {customItems.map((item, index) => (
            <div
              key={index}
              className={`${item.color} p-8 rounded-lg text-white text-center`}
            >
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-lg mb-4">{item.content}</p>
              <div
                className={`inline-block px-4 py-2 bg-white text-gray-800 rounded ${
                  item.size === 'large'
                    ? 'text-lg'
                    : item.size === 'medium'
                      ? 'text-base'
                      : 'text-sm'
                }`}
              >
                {item.size.toUpperCase()}
              </div>
            </div>
          ))}
        </HorizontalSnapCarousel>
      </section>

      {/* Example 3: Simple Text Items */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Text Items Example</h2>
        <HorizontalSnapCarousel
          showDevIndicator={true}
          getItemTitle={index =>
            textItems[index]?.title || `Quote ${index + 1}`
          }
        >
          {textItems.map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg text-center">
              <blockquote className="text-xl italic mb-4">
                "{item.text}"
              </blockquote>
              {item.author && (
                <cite className="text-gray-600">— {item.author}</cite>
              )}
            </div>
          ))}
        </HorizontalSnapCarousel>
      </section>
    </div>
  );
};

export default CarouselExamples;
