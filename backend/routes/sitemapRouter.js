const express = require('express');
const router = express.Router();

// Import your models
const Service = require('../models/Service');
const Location = require('../models/Location');

// Slugify function - matches your frontend
function slugify(text) {
  if (typeof text !== "string") {
    text = String(text || "");
  }
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://instantcarpetcleaningservices.com.au';
    const today = new Date().toISOString().split('T')[0];

    // Fetch services and locations from DB
    const services = await Service.find({}, 'name').lean();
    const locations = await Location.find({}, 'name').lean();

    // Generate XML sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Homepage
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    // About page
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/aboutus</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;

    // Service pages
    services.forEach(service => {
      const slug = slugify(service.name);
      if (slug && slug.length > 0) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/services/${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.9</priority>\n`;
        xml += `  </url>\n`;
      }
    });

    // Location pages
    locations.forEach(location => {
      const slug = slugify(location.name);
      if (slug && slug.length > 0) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/locations/${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      }
    });

    xml += `</urlset>`;

    // Set proper headers
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600');
    res.send(xml);

    console.log(`✅ Sitemap generated: ${services.length} services, ${locations.length} locations`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;