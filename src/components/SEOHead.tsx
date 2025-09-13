import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  price?: number;
  currency?: string;
  availability?: string;
  condition?: string;
  category?: string;
  location?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'CityMarket - Local Marketplace',
  description = 'Buy and sell items locally on CityMarket. Find great deals on electronics, furniture, clothing, and more.',
  image = '/marketplace-og.jpg',
  url = window.location.href,
  type = 'website',
  price,
  currency = 'USD',
  availability = 'in_stock',
  condition,
  category,
  location = 'Local Area'
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'product' ? 'Product' : 'WebSite',
    ...(type === 'product' ? {
      name: title,
      description,
      image,
      offers: {
        "@type": "Offer",
        price: price?.toString(),
        priceCurrency: currency,
        availability: `https://schema.org/${availability}`,
        itemCondition: condition ? `https://schema.org/${condition}Condition` : undefined,
        areaServed: location
      },
      category,
      url
    } : {
      name: title,
      description,
      url,
      potentialAction: {
        "@type": "SearchAction",
        target: `${window.location.origin}/?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    })
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="marketplace, buy, sell, local, electronics, furniture, clothing, deals" />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="CityMarket" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Product-specific meta tags */}
      {type === 'product' && price && (
        <>
          <meta property="product:price:amount" content={price.toString()} />
          <meta property="product:price:currency" content={currency} />
          <meta property="product:availability" content={availability} />
          {condition && <meta property="product:condition" content={condition} />}
          {category && <meta property="product:category" content={category} />}
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
    </Helmet>
  );
};