import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

const SEOHead = ({ 
  title = "Aqqario - Plateforme Immobilière de Référence",
  description = "Découvrez Aqqario, la plateforme immobilière qui révolutionne l'achat, la vente et la location de biens immobiliers.",
  keywords = "immobilier, achat maison, vente appartement, location, agence immobilière",
  canonical,
  ogImage = "https://aqqario.com/og-image.jpg",
  ogType = "website",
  structuredData
}: SEOHeadProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);
    
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) ogImageMeta.setAttribute('content', ogImage);
    
    const ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (ogTypeMeta) ogTypeMeta.setAttribute('content', ogType);
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', description);
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', ogImage);
    
    // Add structured data if provided
    if (structuredData) {
      const existingStructuredData = document.querySelector('script[type="application/ld+json"]#dynamic-structured-data');
      if (existingStructuredData) {
        existingStructuredData.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'dynamic-structured-data';
      script.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
    
    // Cleanup function to remove dynamic structured data
    return () => {
      const dynamicStructuredData = document.querySelector('script[type="application/ld+json"]#dynamic-structured-data');
      if (dynamicStructuredData) {
        dynamicStructuredData.remove();
      }
    };
  }, [title, description, keywords, canonical, ogImage, ogType, structuredData]);

  return null;
};

export default SEOHead;