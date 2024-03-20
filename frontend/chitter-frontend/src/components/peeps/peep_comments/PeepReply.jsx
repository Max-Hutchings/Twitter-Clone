import {useState} from "react";


export default function PeepReply({peepId}){

    const [replyText, setReplyText] = useState("");

    return(
        <>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <div className="row w-100 m-2  rounded p-1">
                    <div className="col-11">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={replyText}
                            placeholder={"Reply..."}
                            onChange={(e) => {
                                setReplyText(e.target.value)
                            }}
                        />
                    </div>
                    <div className="col-1 d-flex justify-content-center">
                        <button className="btn btn-primary btn-sm text-light justify-content-center">
                            Reply
                        </button>
                    </div>
                </div>


            </form>
        </>
    )
}