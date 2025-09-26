import { getPayload } from 'payload';
import config from '@/payload.config';
import ArticleHeader from '@/components/blocks/articles/ArticleHeader';
import ArticleContent from '@/components/blocks/articles/ArticleContent';
import React from 'react';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function ArticlePage({ params }: ArticlePageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { slug } = await params;

  // Build where clause based on environment
  const whereClause: any = {
    slug: { equals: slug },
  };

  // In production, only show published articles
  // In development/preview, show all articles
  if (process.env.NODE_ENV === 'production') {
    whereClause.status = { equals: 'published' };
  }

  // Fetch the article with REST API
  const { docs: [article] = [] } = await payload.find({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: 'articles' as any,
    where: whereClause,
    depth: 10,
  });

  console.log(article);
  // If article doesn't exist, return 404
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

  return (
    <div data-content-type="article" className="min-h-screen">
      {/* Article Header */}
      <ArticleHeader article={article} />

      {/* Main Content */}
      <ArticleContent content={article.content} />

      {/* Footer */}
      <footer className="font-mono mx-auto max-w-xl px-4 pb-36">
        ———
        <div>
          Ord: &nbsp;
          {article.author?.firstName &&
            article.author?.lastName &&
            `${article.author.firstName} ${article.author.lastName}`}
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
