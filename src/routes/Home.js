import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async() => {
        const dbNweet = await dbService.collection("nweet").get();
        dbNweet.forEach(document => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            }
            setNweets(prev => [nweetObject, ...prev]);
        });
    }
    console.log(nweets);
    useEffect(()=>{
        getNweets();
    }, [])
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("nweet").add({
            nweet,
            createAt: Date.now(),
        });
        setNweet("");
    };
    const onChange = (e) => {
        const {target:{value}} = e;
        setNweet(value);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="enter" />
            </form>
            <div>
                {nweets.map(nweet => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Home;