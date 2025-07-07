import Image from 'next/image';

interface FeatureBlockProps {
  image?: { url: string; alt?: string };
  headline: string;
  description: string;
  link?: {
    text?: string;
    url?: string;
  };
}

export default function FeatureBlock({ image, description, link }: FeatureBlockProps) {
    console.log(image)
  return (
    <div className="grid grid-cols-16 p-4 gap-4">
      {image?.url && (
        <div className="col-start-1 col-end-12 md:col-end-9">
          <Image
            src={image.url}
            alt={image.alt || ""}
            width={image.width}
            height={image.height}
            className=""
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
        </div>
      )}
      <div className="col-start-1 md:col-start-9 col-end-16">
        <div className="mb-4 whitespace-pre-line font-mono">{description}</div>
        {link?.url && (
          <a href={link.url} className="font-bold underline mt-2 inline-block">
            {link.text || 'Läs intervjun'} &rarr;
          </a>
        )}
      </div>
    </div>
  );
} 