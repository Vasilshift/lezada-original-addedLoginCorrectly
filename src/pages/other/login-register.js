import { useRef, useState, useEffect } from "react";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import axios from '../../api/axios';
import {Col, Row, Container} from "react-bootstrap";

const USER_REGEX =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'http://localhost:8081/api/auth/signup';

const LoginRegister = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    //setValidMatch(pwd === matchPwd);
  }, [password])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL,
          JSON.stringify({ username, password }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: false
          }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUsername('');
      setPassword('');
      //setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }
  }

  return (
      <LayoutTwo>
        <BreadcrumbOne
            pageTitle="Customer Login"
            backgroundImage="/assets/images/backgrounds/breadcrumb-bg-2.jpg"
        >
        </BreadcrumbOne>

        <div className="login-area space-mt--r130 space-mb--r130">
          <Container>
            <Row>
              <Col lg={6} className="space-mb-mobile-only--50">
                <div className="lezada-form login-form">

                  <>
                    {success ? (
                        <section>
                          <h1>Success!</h1>
                          <p>
                            <a href="#">Sign In</a>
                          </p>
                        </section>
                    ) : (
                        <section>
                          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                          <h1>Register</h1>
                          <form onSubmit={handleSubmit}>
                            <label htmlFor="username">
                              Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                              enter your valid email<br />
                            </p>

                            <label htmlFor="password">
                              Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                              8 to 24 characters.<br />
                              Must include uppercase and lowercase letters, a number and a special character.<br />
                              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                            <button disabled={!validName || !validPassword ? true : false}>Sign Up</button>
                          </form>


                        </section>
                    )}

                  </>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutTwo>
  )
}

export default LoginRegister
