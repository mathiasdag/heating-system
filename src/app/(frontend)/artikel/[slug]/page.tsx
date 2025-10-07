import { PayloadAPI } from '@/lib/api';
import ArticleHeader from '@/components/blocks/articles/ArticleHeader';
import { ArticleHeader as NewArticleHeader } from '@/components/headers';
import ArticleContent from '@/components/blocks/articles/ArticleContent';
import React from 'react';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // Use the dedicated findBySlug method which handles the query properly
  const article = await PayloadAPI.findBySlug('articles', slug, 10, false);

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

  return (
    <div data-content-type="article" className="min-h-screen grid gap-24 pb-36">
      {/* Article Header */}
      {article.header ? (
        <NewArticleHeader articleData={article} header={article.header} />
      ) : (
        <ArticleHeader article={article} />
      )}

      {/* Main Content */}
      <ArticleContent content={article.content} />

      {/* Footer */}
      <footer className="font-mono mx-auto w-full max-w-xl px-2 -mt-24">
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
