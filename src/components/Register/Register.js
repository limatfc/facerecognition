import { useState } from "react";

export default function Register({ onRouteChange, loadUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const user = await getData();
    if (user.id !== undefined) {
      loadUser(user);
      onRouteChange("home");
    } else {
      setError(
        "Oops, looks like we were unable to create a new user. Please try again later."
      );
    }
  };

  const getData = async () => {
    const response = await fetch(
      "https://dry-anchorage-23432.herokuapp.com/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      }
    );
    const data = await response.json();
    return data;
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={onSubmitHandler}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              {error !== "" && <p>{error}</p>}
              <label className="db fw6 lh-copy f6">
                Name
                <input
                  onChange={(event) => setName(event.target.value)}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                />
              </label>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">
                Email
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                />
              </label>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">
                Password
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                />
              </label>
            </div>
          </fieldset>
          <div className="">
            <button
              className="center b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </main>
    </article>
  );
}
