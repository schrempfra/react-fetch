import React, { useEffect, useState } from 'react'

export default function Reddit() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetch('https://www.reddit.com/r/Bitcoin.json')
            .then(response => response.json())
            .then(results => {
                //console.log(results)

                setIsLoading(false);
                setPosts(results.data.children);
            }).catch(error => {
                setIsLoading(false);
                setErrorMessage("There is an error");
            });
    }, []);

    return (
        <div className="max-w-3xl mx-auto pt-14 pb-24">
            <h2 className="text-5xl font-bold mb-10">Reddit Bitcoin</h2>
            
            {isLoading &&
                <div>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            }
            
            {posts && (
                <ul>
                    {posts.map(post =>(
                    <li key={post.data.id}
                        className="text-lg font-semibold hover:underline mb-2"
                        >
                        <a href={`https://reddit.com${post.data.permalink}`}>{post.data.title}</a>
                    </li>   
                    ))}
                </ul>
            )}

            {errorMessage && <div>{errorMessage}</div>}
        </div>
    )
}
