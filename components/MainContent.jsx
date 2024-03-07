"use client"
import React,{useState} from 'react';

const MainContent = () => {
    const [keyword,setKeyword] = useState(''); 
    const [generatedArticle,setGeneratedArticle]=useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit...")
    const [loading,setLoading]=useState(false);
    
    const generateArticle = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            // const keyword = e.target.elements.keyword.value; // Get the keyword from the form input
            
            const response = await fetch(`/api/generate?keyword=${keyword}`); // Fetch the generated article

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Response:', data);
            setGeneratedArticle(data.article)
            console.log(generatedArticle)

        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
        setLoading(false);
    };

    return (
        <div className="main-content">
            <form id="article-form" onSubmit={generateArticle}> {/* Add onSubmit handler */}
                <label htmlFor="word-count">Select Word Count:</label>
                <select id="word-count" name="word-count">
                    <option value="1500">1500</option>
                    <option value="2500">2500</option>
                    <option value="5000">5000</option>
                </select>
                <label htmlFor="keyword">Enter Keyword:</label>
                <input onChange={(e)=>setKeyword(e.target.value)} type="text" id="keyword" name="keyword" placeholder="e.g., Technology, Health, Travel" />
                <button type="submit">Generate Article</button>
            </form>

            <div className="display-box" id="article-display">
                <div className='generated-art'>
                    <h2>Generated Article</h2>
                    <button onClick={(e) => generateArticle(e)}>Copy</button>
                </div>
                <p id="generated-article-text">{loading? "Generating...":`${generatedArticle}`}</p>
            </div>
        </div>
    );
};

export default MainContent;
