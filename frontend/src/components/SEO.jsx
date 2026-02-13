import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = 'Demo JK Properties';
    const siteUrl = window.location.origin;
    const defaultImage = `${siteUrl}/og-image.jpg`; // Ensure you have this image in public folder

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${siteTitle} | ${title}` : siteTitle}</title>
            <meta name="description" content={description || "Find your dream home with Demo JK Properties. We offer the best luxury properties in Malaysia."} />
            <meta name="keywords" content={keywords || "real estate, property, malaysia, kuala lumpur, buy house, rent house, luxury property"} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || window.location.href} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || "Find your dream home with Demo JK Properties."} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url || window.location.href} />
            <meta property="twitter:title" content={title || siteTitle} />
            <meta property="twitter:description" content={description || "Find your dream home with Demo JK Properties."} />
            <meta property="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
