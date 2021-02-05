import React, {useEffect, useState} from "react";
import {doLogin, reqLoginError, reqLoggedIn} from "../../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {NavMenu} from "../../features/navmenu/navmenu";

export function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isNotValid, setIsNotValid] = useState(false);
    const [serverError, setServerError] = useState(false);
    const dispatch = useDispatch();
    const serverErrorSelector = useSelector(reqLoginError);
    const serverIsLoggedIn = useSelector(reqLoggedIn);
    let history = useHistory();

    const login = () => {
        const data = {
            email,
            password,
        };
        dispatch(doLogin(data));
    };

    useEffect(() => {
        setServerError(serverErrorSelector);
        setIsNotValid(!(email && password));

        if (serverIsLoggedIn) {
            console.log("Redirect ...");
            history.push("/game");
        }
    }, [email, password, serverErrorSelector, serverIsLoggedIn]);

    return (
        <>
            <NavMenu/>
            <form>
                <h3>Login</h3>

                {isNotValid && (
                    <div className="alert alert-danger">
                        Email and password are required
                    </div>
                )}

                {serverError && (
                    <div className="alert alert-danger">
                        Server Error: email or password is invalid
                    </div>
                )}

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email"
                           className="form-control"
                           placeholder="Enter email"
                           onChange={(event) => setEmail(event.target.value)}
                           value={email}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                           className="form-control"
                           placeholder="Enter password"
                           onChange={(event) => setPassword(event.target.value)}
                           value={password}
                    />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox"
                               className="custom-control-input"
                               id="customCheck1"
                        />
                        <label className="custom-control-label"
                               htmlFor="customCheck1"
                        >Remember me</label>
                    </div>
                </div>

                <button type="submit"
                        className="btn btn-primary btn-block"
                        disabled={isNotValid}
                        onClick={login}
                >Login
                </button>
                <p className="forgot-password text-right">
                    Don't have an account? Register <a href="/register">here</a>
                </p>
            </form>
        </>
    );
}