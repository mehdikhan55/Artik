// pages/api/generate/route.js

export async function GET(req, res) {
 
  try {
    // Validate the presence of the 'keyword' query parameter
    const searchParams = req.nextUrl.searchParams;
    const keyword = searchParams.get('keyword')
    
    if (!keyword || typeof keyword !== 'string') {
      throw new Error('missing/invalid');
    }

    // Generate the article content based on the keyword (placeholder example)
    const articleContent = {
      article: `Generated article goes here for keyword: ${keyword}`,
    };

    // Convert the JavaScript object to a JSON string
    const jsonResponse = JSON.stringify(articleContent);

    // Send a JSON response with the generated article content
    // console.log('Generated article:', articleContent);
    return new Response(jsonResponse);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.message);
    return new Response({ error: error.message });
  }
}





// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     console.log("hello")
//     try {
      
//       // Validate the presence of the 'keyword' query parameter
//       // const { keyword } = req.query;
//       // if (!keyword || typeof keyword !== 'string') {
//       //   throw new Error('Missing or invalid "keyword" parameter');
//       // }

//       // Sanitize the keyword (if needed)

//       // Generate the article content based on the keyword (placeholder example)
//       // const articleContent = `Generated article goes here for keyword: ${keyword}`;
//       const articleContent = `Generated article goes here for keyword: `;

//       // Send a JSON response with the generated article content
//       console.log('Generated article:', articleContent);
//       res.status(200).json({ articleContent });

//     } catch (error) {
//       // Handle errors
//       console.error('Error:', error.message);
//       res.status(400).json({ error: error.message });
//     }
//   }
// }


