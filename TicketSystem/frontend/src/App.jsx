import { useState } from "react";
import axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const [tickets, setTickets] = useState([]);

  const [result, setResult] = useState("");

  /* REGISTER */
  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      setResult(JSON.stringify(res.data, null, 2));

    } catch (err) {
      setResult(JSON.stringify(err.response?.data || err.message, null, 2));
    }
  };

  /* LOGIN */
  const login = async () => {
    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const token =
        res.data?.data?.token ||
        res.data?.token ||
        null;

      if (token) {
        localStorage.setItem("token", token);
      }

      setResult(JSON.stringify(res.data, null, 2));

    } catch (err) {
      setResult(JSON.stringify(err.response?.data || err.message, null, 2));
    }
  };

  /* CREATE TICKET */
  const createTicket = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/tickets",
        {
          title,
          description,
          priority
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResult(JSON.stringify(res.data, null, 2));

    } catch (err) {
      setResult(JSON.stringify(err.response?.data || err.message, null, 2));
    }
  };

  /* LOAD TICKETS */
  const loadTickets = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tickets",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = res.data?.data || res.data;

      if (Array.isArray(data)) {
        setTickets(data);
      } else if (Array.isArray(data.tickets)) {
        setTickets(data.tickets);
      } else {
        setTickets([]);
      }

      setResult(JSON.stringify(res.data, null, 2));

    } catch (err) {
      setResult(JSON.stringify(err.response?.data || err.message, null, 2));
    }
  };

  return (
    <div style={{ padding: 40 }}>

      <h1>Support Desk Test</h1>

      <h2>Auth</h2>

      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={register}>Register</button>

      <button onClick={login} style={{ marginLeft: 10 }}>
        Login
      </button>

      <hr />

      <h2>Create Ticket</h2>

      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <br /><br />

      <button onClick={createTicket}>
        Create Ticket
      </button>

      <hr />

      <h2>Tickets</h2>

      <button onClick={loadTickets}>
        Load Tickets
      </button>

      <br /><br />

      {tickets.length === 0 ? (
        <p>No tickets yet</p>
      ) : (
        tickets.map((t) => (
          <div key={t._id}>
            <strong>{t.title}</strong> — {t.priority}
          </div>
        ))
      )}

      <hr />

      <pre>{result}</pre>

    </div>
  );
}

export default App;