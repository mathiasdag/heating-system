import { PayloadAPI } from '@/lib/api';
import { ArticleHeader } from '@/components/headers';
import ArticleContent from '@/components/blocks/articles/ArticleContent';
import React from 'react';
import { notFound } from 'next/navigation';

// Define proper types for article data
interface ArticleData {
  id: string;
  title: string;
  slug: string;
  status?: string;
  publishedDate?: string;
  lastModifiedDate?: string;
  author: {
    firstName?: string;
    lastName?: string;
    email: string;
    bylineDescription?: string;
  };
  header?: {
    text?: string;
    assets?: Array<{
      type: string;
      image?: {
        url: string;
        alt?: string;
        width?: number;
        height?: number;
      };
    }>;
  };
  content?: Array<{
    blockType: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // Use the dedicated findBySlug method which handles the query properly
  const article = (await PayloadAPI.findBySlug(
    'articles',
    slug,
    10,
    false
  )) as ArticleData | null;

  // In production, check if article is published
  if (
    process.env.NODE_ENV === 'production' &&
    article &&
    article.status !== 'published'
  ) {
    notFound();
  }

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  console.log(article);

  return (
    <div data-content-type="article" className="min-h-screen grid gap-24 pb-36">
      {/* Article Header */}
      <ArticleHeader
        articleData={article}
        header={
          article.header as {
            text?: string;
            assets?: Array<{
              type: 'image' | 'mux';
              placement: 'before' | 'after';
              image?: {
                url: string;
                alt?: string;
                width?: number;
                height?: number;
              };
              mux?: string;
            }>;
          }
        }
      />

      {/* Main Content */}
      <ArticleContent
        content={
          article.content as unknown as {
            root: {
              children: Array<{
                type: string;
                children?: Array<{
                  text?: string;
                  type?: string;
                }>;
              }>;
            };
          }
        }
      />

      {/* Footer */}
      <footer className="font-mono mx-auto w-full max-w-2xl px-4 -mt-24">
        ———
        <div>
          Ord: &nbsp;
          {article.author.firstName && article.author.lastName
            ? `${article.author.firstName} ${article.author.lastName}`
            : article.author.email}
        </div>
        <div>
          {article.lastModifiedDate
            ? `Senast uppdaterad: ${formatDate(article.lastModifiedDate)}`
            : `Publicerad: ${formatDate(article.publishedDate || '')}`}
        </div>
        {article.author?.bylineDescription && (
          <div className="mt-4">{article.author.bylineDescription}</div>
        )}
      </footer>
    </div>
  );
}

export default ArticlePage;
