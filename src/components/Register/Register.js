export default function Register({ onRouteChange }) {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    onRouteChange("home");
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={onSubmitHandler}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">
                Name
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                />
              </label>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">
                Name
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                />
              </label>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">
                Password
                <input
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
