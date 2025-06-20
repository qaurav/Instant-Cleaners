const express = require('express');
const router = express.Router();

// Import your models or DB query functions
const Service = require('../models/Service');
const Location = require('../models/Location');

// Simple slugify function (you can use a library like slugify if you prefer)
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://instantcarpetcleaningservices.com.au'; // Replace with your actual domain

    // Static pages
    const staticPages = ['/', '/aboutus'];

    // Fetch raw service and location names from DB
    const services = await Service.find({}, 'name').lean(); // Assuming 'name' field
    const locations = await Location.find({}, 'name').lean();

    // Build URLs array
    let urls = [];

    // Add static pages
    staticPages.forEach(page => urls.push(`${baseUrl}${page}`));

    // Add service pages with slugified names
    services.forEach(service => {
      const slug = slugify(service.name);
      urls.push(`${baseUrl}/services/${slug}`);
    });

    // Add location pages with slugified names
    locations.forEach(location => {
      const slug = slugify(location.name);
      urls.push(`${baseUrl}/locations/${slug}`);
    });

    // Generate XML sitemap string
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    urls.forEach(url => {
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>1.0</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
