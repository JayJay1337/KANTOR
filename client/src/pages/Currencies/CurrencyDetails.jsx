import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Actions from "../../components/Actions.jsx";

function CurrencyDetails(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [currencyWallets, setCurrencyWallets] = useState([])
    const [currency, setCurrency] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/api/currencies/${id}`)
            .then(res => res.json())
            .then(currency => setCurrency(currency))

        fetch(`http://localhost:3000/api/currencies/${id}/wallets`)
            .then(res => res.json())
            .then(wallets => setCurrencyWallets(wallets))
    }, [id]);
    const handleBack = () => {
        navigate("/currencies")
    }

    return(
        <>
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
                <tr key={currency.ID}>
                        <td>{currency.ID}</td>
                        <td>{currency.Nazwa}</td>
                        <td>{currency.Symbol}</td>
                        <td> {currency.Kurs}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Portfele</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Właściciel</th>
                    <th>Saldo</th>
                    <th>Data Otwarcia</th>
                </tr>
                </thead>
                <tbody>
                {currencyWallets.map((wallet) => (
                    <tr key={wallet.portfel_id}>
                        <td>{wallet.portfel_id}</td>
                        <td>{wallet.uzytkownik}</td>
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
export default CurrencyDetails