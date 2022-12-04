import Link from "next/link";

const Register = () => {
  return (
    <div className="col-md-4 col-md-offset-4" id="login">
      <section id="inner-wrapper" className="login">
        <article>
          <form>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-user"> </i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-envelope"> </i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-key"> </i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-key"> </i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </article>
      </section>
    </div>
  );
};

export default Register;
