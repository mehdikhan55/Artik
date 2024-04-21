"use client"
import React,{useEffect, useRef, useState} from 'react';
import OpenAI from 'openai';
import {load} from "../app/assets/index.jsx";



const MainContent = () => {
    const [keyword,setKeyword] = useState(''); 
    const [wordCount,setWordCount] = useState(1500);
    const [generatedArticle,setGeneratedArticle]=useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit...")
    const [loading,setLoading]=useState(false);
    const [wCount,setWCount]=useState(0);

    
    // Create a ref to store the ongoing request object
  const requestRef = useRef(null);

  // Track cancellation state with a separate ref
  const isCancelling = useRef(false);

  useEffect(() => {
    // Clean up any previous cancellation attempts when the component unmounts
    return () => {
      if (requestRef.current) {
        requestRef.current.cancel('Component unmounted');
      }
    };
  }, []); // Empty dependency array for cleanup on unmount


  useEffect(() => {
    const countWords = (text) => {
        // Remove leading and trailing whitespaces and split by whitespace
        const words = text.trim().split(/\s+/);
        // Filter out empty strings (caused by multiple spaces)
        const nonEmptyWords = words.filter(word => word.length > 0);
        return nonEmptyWords.length;
    };

    setWCount(countWords(generatedArticle));
}, [generatedArticle]);
``

    
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

          
   
      
    const generateArticle = async (e) => {
        e.preventDefault();
        setLoading(true); 
    
        try {
          setGeneratedArticle(''); 
          const prompt=`write an article on ${keyword} with word count ${wordCount}`;

          const response = await openai.chat.completions.create({
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: `${prompt}` },
            ],
            model: 'gpt-3.5-turbo',
            stream: true,
          });
    
          // Store the request object for cancellation
          requestRef.current = response;
    



          for await (const chunk of response) {
            if (chunk.choices[0].delta.content) {
              setGeneratedArticle((prev) => prev + chunk.choices[0].delta.content);
            }
    
            // Check if the stop generating button is pressed
            if (isCancelling.current) {
              // Cancel the ongoing request if needed
              try {
                await requestRef.current.cancel('User stopped generation');
              } catch (error) {
                // Handle potential cancellation errors gracefully
                console.warn('Cancellation error:', error);
              } finally {
                // Ensure requestRef is cleared even if cancellation fails
                requestRef.current = null;
                isCancelling.current=false;
              }
              break;
            }
          }
        } catch (error) {
          console.error('There was a problem with the request:', error);
        } finally {
          setLoading(false); // Reset loading state
          requestRef.current = null; // Clear request ref after completion or error
          isCancelling.current = false; // Reset cancellation flag
        }

      };





    const handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(generatedArticle);
    }

    const handleClear = (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Are you sure you want to clear the generated article?");
        if (confirmed) {
            setGeneratedArticle("");
        }
    }
    
    const handleStopGenerating = (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Are you sure you want to clear the generated article?");
        // Set cancellation flag
        if(confirmed){
            isCancelling.current = true;
        }
      };




    return (
        <div className="main-content">
            <form id="article-form" onSubmit={generateArticle}> {/* Add onSubmit handler */}
                <label htmlFor="word-count">Select Word Count:</label>
                <select onChange={(e)=>setWordCount(e.target.value)} value={wordCount} id="word-count" name="word-count">
                    <option value={1500}>1500</option>
                    <option value={2500}>2500</option>
                    <option value={5000}>5000</option>
                </select>
                <label htmlFor="keyword">Enter Keyword:</label>
                <input onChange={(e)=>setKeyword(e.target.value)} type="text" id="keyword" name="keyword" placeholder="e.g., Technology, Health, Travel" />
                <button type="submit">Generate Article</button>
            </form>

            <div className="display-box" id="article-display">
                <div className='generated-art'>
                    <div>
                    <h2 style={{display:"inline",marginRight:"6px"}}>Generated Article</h2>
                    {loading &&  <span className='loading-text'>(Generating...)</span>}
                    </div> 
                    <div>
                    <button style={{marginRight:"4px"}} onClick={(e) => handleStopGenerating(e)}>Stop Geenrating</button>
                    <button style={{marginRight:"4px"}} onClick={(e) => handleClear(e)}>Clear</button>
                    <button onClick={(e) => handleCopy(e)}>Copy</button>
                    </div>
                </div>
                <div className="word-count">
                    <span>Word Count: {wCount}</span>
                </div>
                <textarea readOnly  value={`${generatedArticle}`} id="generated-article-text"></textarea>
            </div>
        </div>
    );
};

export default MainContent;


 // const generateArticle = async (e) => {
    //     // setLoading(true);
    //     e.preventDefault(); 
        
    //     setGeneratedArticle("");
    //     const response = await openai.chat.completions.create({
    //         messages: [
    //           {role: "system", content: "You are a helpful assistant."},
    //           { role: "user", content: keyword }
    //         ],
    //         model:"gpt-3.5-turbo",
    //         stream:true,
    //       });
          
    //       for await (const chunk of response) {
    //         if(chunk.choices[0].delta.content){
    //         setGeneratedArticle(prev=>prev+chunk.choices[0].delta.content)
    //         }
    //       }
    //     console.log("Generated article:", generatedArticle)
    // };



// try {
        //     // const keyword = e.target.elements.keyword.value; // Get the keyword from the form input
            
        //     const response = await fetch(`/api/generate?keyword=${keyword}`); // Fetch the generated article

        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     const data = await response.json();
        //     console.log('Response:', data);
        //     setGeneratedArticle(data.article)
        //     console.log(generatedArticle)

        // } catch (error) {
        //     console.error('There was a problem with the request:', error);
        // }
        // setLoading(false);