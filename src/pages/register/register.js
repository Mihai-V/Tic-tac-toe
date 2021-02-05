import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    doRegister,
    reqRegisterData,
    clearRegisterData,
} from "../../slices/userSlice";
import {useHistory} from "react-router-dom";
import {NavMenu} from "../../features/navmenu/navmenu";

export function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm_password, setConfirmPassword] = useState();
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const registerResponse = useSelector(reqRegisterData);

    useEffect(() => {
        if (registerResponse && registerResponse._id) {
            history.push("/login");
            dispatch(clearRegisterData());
        }
        setIsValid(!(name && email && password && confirm_password));
    }, [registerResponse, name, email, password, confirm_password]);

    const register = () => {
        const data = {
            name,
            email,
            passwords: {
                password,
                confirm_password,
            },
        };

        console.log(data);
        if (!isValid) dispatch(doRegister(data));
    };

    return (
        <>
            <NavMenu/>
            <form>
                <h3>Register</h3>

                {isValid ? (
                    <div className="alert alert-danger">Formul este invalid</div>
                ) : (
                    <div className="alert alert-success">Formul este valid</div>
                )}


                <div className="form-group">
                    <label>Full name</label>
                    <input type="text"
                           className="form-control"
                           placeholder="First name"
                           onChange={(event) => setName(event.target.value)}
                           value={name}
                    />
                </div>

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
                           placeholder="Password"
                           onChange={(event) => setPassword(event.target.value)}
                           value={password}
                    />
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password"
                           className="form-control"
                           placeholder="Confirm Password"
                           onChange={(event) => setConfirmPassword(event.target.value)}
                           value={confirm_password}
                    />
                </div>

                <button type="submit"
                        className="btn btn-success btn-primary btn-block"
                        disabled={isValid}
                        onClick={register}
                >Register
                </button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">log in</a>
                </p>
            </form>
        </>
    );
}
