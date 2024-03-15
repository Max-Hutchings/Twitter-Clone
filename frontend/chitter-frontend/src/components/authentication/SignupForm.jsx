import {useState} from "react";


export default function SignupForm(){

    const [signup, setSignup] = useState(
        {
            "fName": "",
            "lName": "",
            "username": "",
            "email": "",
            "password": ""
        }
    );


    return(
        <>
            <form>
                {/*<div className="d-flex flex-column justify-content-center align-items-center">*/}
                    <div className="row">
                        <div className="col-6">
                            <input
                                className={"form-control w-100"}
                                type="text"
                                value={signup.fName}
                                placeholder={"First Name"}
                                onChange={(e) => setSignup({...signup, fName: e.target.value})}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                className={"form-control w-100"}
                                type="text"
                                value={signup.lName}
                                placeholder={"Last Name"}
                                onChange={(e) => {
                                    setSignup({...signup, lName: e.target.value})
                                }}
                            />
                        </div>

                    </div>


                    <input
                        className={"form-control"}
                        type="text"
                        value={signup.username}
                        placeholder={"Username"}
                        onChange={(e) => {setSignup({...signup, username: e.target.value})}}
                    />

                    <input
                        className={"form-control"}
                        type="email"
                        value={signup.email}
                        placeholder={"Email"}
                        onChange={(e) => setSignup({...signup, email: e.target.value})}
                    />

                    <input
                        className={"form-control"}
                        type="password"
                        value={signup.password}
                        placeholder={"Password"}
                        onChange={(e) => setSignup({...signup, password: e.target.value})}
                    />

                    <button className="btn btn-primary text-light w-100">
                        Sign Up
                    </button>

                {/*</div>*/}
            </form>
        </>
    )
}