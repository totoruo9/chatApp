import { dbService } from 'fbase';
import React, { useState } from 'react';

const Home = () => {
    const [nweet, setNweet] = useState("");
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
        </div>
    )
};

export default Home;