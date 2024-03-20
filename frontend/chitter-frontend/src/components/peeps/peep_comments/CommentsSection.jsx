import PeepComment from "./PeepComment.jsx";
import {useEffect, useState} from "react";
import callGetComments from "../../../services/apis/GetCommentsEndpoint.jsx";


export default function CommentsSection({peepId}){

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await callGetComments({ peepId }); // Using await to wait for the promise to resolve
                setComments(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [peepId]);

    return(
        <>
            {/*{!loading &&*/}
                {comments && comments.map((comment) => {
                    return(
                        <PeepComment key={comment._id} commentId={comment._id} commentUser={comment.accountId.username} commentText={comment.commentText}/>
                    )
                })}
            {/*}*/}

            {!comments &&
                <div>
                    No comments yet... be the first!
                </div>
            }

        </>
    )
}