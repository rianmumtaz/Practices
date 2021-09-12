import { useState } from "react";
import axios from "axios";

const ContactMe = ({ setSent, setSucc }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = ({ name, email, message }) => {
    setLoading(true);
    if (name === "" || email === "" || message === "") {
      alert("Some input still empty");
      console.log({ name, email, message });
      setLoading(false);
    } else {
      axios
        .post("/contactme", { name, email, message })
        .then(function (response) {
          console.log(response.data);
          setLoading(false);
          setSent(true);
          setSucc(true);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
          setSent(true);
          setSucc(false);
        });
    }
  };

  return (
    <section className="p-5 bg-secondary text-light" id="askme">
      <div className="container">
        <h1>Contact Me</h1>
        <div className="row my-5">
          <div className="col-md-6 col">
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control opacity-75"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control opacity-75"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control opacity-75"
                  rows="10"
                  placeholder="What is your message..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className={loading ? "btn btn-success" : "btn btn-primary"}
                onClick={(e) => {
                  e.preventDefault();
                  submit({ name, email, message });
                }}
              >
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm me-3"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
