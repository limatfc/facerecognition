import { useState } from "react";

export default function SignIn({ onRouteChange, loadUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const user = await getData();
    if (user.email !== undefined) {
      loadUser(user);
      onRouteChange("home");
    } else {
      setError(
        "Oops, looks like this email and password combination is not working. Please try again."
      );
    }
  };

  const getData = async () => {
    const response = await fetch("http://localhost:4000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={onSubmitHandler}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              {error !== "" && <p>{error}</p>}
              <label className="db fw6 lh-copy f6">
                Email
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">
                Password
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
            </div>
          </fieldset>
          <div className="">
            <button
              className="center b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
            >
              Sign in
            </button>
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim black db center pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
}
