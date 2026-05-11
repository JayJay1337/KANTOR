import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function WalletDetails(){
    const {id} = useParams();
    const navigate = useNavigate()
    const [wallet, setWallet] = useState({})

    useEffect(() => {

        fetch(`http://localhost:3000/api/wallets/${id}`)
            .then(res => res.json())
            .then(data => setWallet(data))
    })
    const handleBack = () => {
        navigate("/wallets")
    }
    return(
    <>
        <h2>Portfel</h2>
        <table>
            <thead>
            <tr>
                <th>ID Portfela</th>
                <th>Właściciel</th>
                <th>Waluta</th>
                <th>Saldo</th>
                <th>Data Otwarcia</th>
            </tr>
            </thead>
            <tbody>
            <tr key={wallet.portfel_id}>
                <td>{wallet.portfel_id}</td>
                <td>{wallet.uzytkownik}</td>
                <td>{wallet.nazwa}</td>
                <td>{wallet.saldo}</td>
                <td>{wallet.data_otwarcia}</td>
            </tr>
            </tbody>
        </table>
        <h2>Waluta</h2>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Nazwa</th>
                <th>Symbol</th>
                <th>Kurs</th>
            </tr>
            </thead>
            <tbody>
            <tr key={wallet.Waluta_ID}>
                <td>{wallet.Waluta_ID}</td>
                <td>{wallet.nazwa}</td>
                <td>{wallet.symbol}</td>
                <td>{wallet.kurs}</td>
            </tr>
            </tbody>
        </table>
        <h2>Właściciel</h2>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Użytkownik</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            <tr key={wallet.Uzytkownik_ID}>
                <td>{wallet.Uzytkownik_ID}</td>
                <td>{wallet.uzytkownik}</td>
                <td>{wallet.email}</td>
            </tr>
            </tbody>
        </table>
        <div>
            <button type="button" onClick={handleBack}>Powrót</button>
        </div>
    </>
);
}
export default WalletDetails