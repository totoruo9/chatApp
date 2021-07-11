import React from "react";

const Nweet = ({nweetObj, isOwner}) => (
    <div>
        <h4>{nweetObj.text}</h4>
        {isOwner && (
            <>
                <button>Delet Nweet</button>
                <button>Add Nweet</button>
            </>
        )}
    </div>
);

export default Nweet;