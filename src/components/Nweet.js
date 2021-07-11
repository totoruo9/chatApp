import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delet this nweet?");
        if(ok){
            //delete nweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async(e) => {
        e.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        });
        setEditing(false);
    }
    const onChange = (e) => {
        const {target:{value}} = e;
        setNewNweet(value);
    }
    return (
        <div>
            {
                editing
                    ?
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="Edit your nweet" value={newNweet} required onChange={onChange} />
                        </form>
                        <input type="submit" value="update Nweet" onClick={onSubmit} />
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                    : <>
                        <h4>{nweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delet Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        )}
                    </>
            }
        </div>
    )
};

export default Nweet;