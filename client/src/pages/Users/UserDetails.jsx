import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function UserDetail(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [userWallets, setUserWallets] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/api/users/${id}`)
            .then(res => res.json())
            .then(user => setUser(user))

        fetch(`http://localhost:3000/api/users/${id}/wallets`)
            .then(res => res.json())
            .then(wallets => setUserWallets(wallets))
    }, [id]);
    const handleBack = () => {
        navigate("/users")
    }
    return(
        <>
            <h2>Użytkownik</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                    <tr key={user.ID}>
                        <td>{user.ID}</td>
                        <td>{user.Imie}</td>
                        <td>{user.Nazwisko}</td>
                        <td>{user.Email}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Portfele</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Waluta</th>
                    <th>Saldo</th>
                    <th>Data Otwarcia</th>
                </tr>
                </thead>
                <tbody>
                {userWallets.map((wallet) => (
                    <tr key={wallet.portfel_id}>
                        <td>{wallet.portfel_id}</td>
                        <td>{wallet.waluta}</td>
                        <td> {wallet.saldo}</td>
                        <td> {wallet.data_otwarcia}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <button type="button" onClick={handleBack}>Powrót</button>
            </div>
        </>
    );
}
export default UserDetail;