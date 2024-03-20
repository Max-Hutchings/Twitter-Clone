import {Link} from "react-router-dom";
import {useState} from "react";
import PeepReply from "../peep_comments/PeepReply.jsx";
import CommentsSection from "../peep_comments/CommentsSection.jsx";


export default function Peep({username, textContent}){

    const [openReply, setOpenReply] = useState(false);
    const [openComments, setOpenComments] = useState(false);

    return(
        <>

                <div className="d-flex flex-column align-items-start justify-content-start p-3 m-2 rounded mb-3" style={{background: "white"}}>
                    <h6 role={"peep-username"}>
                        {username}
                    </h6>
                    <p role={"peep-content"}>{textContent}</p>
                    <div className="row justify-content-center w-100">
                        <div className="col-6 justify-content-center text-center">
                            <Link onClick={(e) => setOpenComments(!openComments)} to={"#"} role={"open-comments-btn"} className={"text-center text-decoration-none"}>Comments</Link>
                        </div>
                        <div className="col-6 justify-content-center text-center ">
                            <Link onClick={(e) => setOpenReply(!openReply)} to={"#"} role={"reply-btn"} className={"text-center text-decoration-none"}>Reply</Link>
                        </div>
                    </div>
                    {openReply &&
                        <div className="row w-100">
                            <div className="col-12">
                                <PeepReply />
                            </div>
                        </div>
                    }

                    {openComments &&
                        <div className="row w-100">
                            <div className="col-12">
                                <CommentsSection />
                            </div>
                        </div>
                    }
                </div>


        </>
    )
}