import { useEffect, useState } from "react"
import type { User } from "./models"
import "bootstrap/dist/css/bootstrap.css"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [nev, setNev] = useState<string>("");
  const [osztaly, setOsztaly] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data: User[] = await response.json() as User[];
        setUsers(data);
      } catch (err) {
        console.error("Err: " + err);
      }
    }

    loadData();
  }, [])

  async function handleFelhasznaloFelvetel(e) {
    e.preventDefault();

    const ujFelhasznalo = {
      nev: nev,
      osztaly: osztaly
    }
    try {
      const response = await fetch("http://localhost:3000/users", {
        "method": "POST",
        headers: { "Content-type": "appplication/json" },
        body: JSON.stringify(ujFelhasznalo)
      });

      const felhasznalo: User = await response.json();
      setUsers((elozo) => [...elozo, felhasznalo]);
      setNev("");
      setOsztaly("");
    } catch (err) {
      console.error("Err: " + err.message)
    }
  }

  return (
    <>
      <h2>Felvétel</h2>
      <form onSubmit={handleFelhasznaloFelvetel}>
        <label htmlFor="input_nev">Név:</label>
        <input
          type="text"
          name="input_nev"
          value={nev}
          onChange={(e) => setNev(e.target.value)}
        />
        <br />
        <label htmlFor="input_osztaly">Osztály:</label>
        <input
          type="text"
          name="input_osztaly"
          value={osztaly}
          onChange={(e) => setOsztaly(e.target.value)}
        />

        <button type="submit">Felvétel</button>
      </form>

      <h2>Felhasználó lista</h2>
      <table className="table table-hover table-bordered">
        <thead>
          <th>Név</th>
          <th>Osztály</th>
        </thead>
        <tbody>
          {
            users.map(item => (
              <>
                <tr key={item.id}>
                  <td>{item.nev}</td>
                  <td>{item.osztaly}</td>
                </tr>
              </>
            ))
          }
        </tbody>
      </table >

    </>)
}

export default App
