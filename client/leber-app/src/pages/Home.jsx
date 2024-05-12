import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

export default function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/home")
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <div>
            <h1>Home</h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>PatientenNummer</th>

                        <th>Alter</th>
                        <th>Diagnose</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.PatientenNummer}</td>

                            <td>{item.Alter}</td>
                            <td>{item.Diagnose}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
