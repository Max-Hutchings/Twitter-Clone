


export default function PeepComment({}){

    return(
        <>
            <div role={"peep-comment"} className={"border rounded p-2"}>
                <div className="row">
                    <div className="col-6" >
                        <span className={"small"} style={{fontWeight: "bold"}}>
                            username
                        </span>

                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <span className="small">
                            Comment text content
                        </span>
                    </div>
                </div>
            </div>

        </>
    )
}