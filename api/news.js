export default async function handler(req, res) {
  const GNEWS_KEY = 'e506c9aec05f8e7d7dc2a64066b806d8';

  try {
    const url = `https://gnews.io/api/v4/search?q=India%20economy%20OR%20RBI%20OR%20banking%20OR%20SSC%20OR%20UPSC%20OR%20government%20policy&lang=en&country=in&max=15&sortby=publishedAt&apikey=${GNEWS_KEY}`;

    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });

    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate'); // cache 15 min on Vercel edge
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
