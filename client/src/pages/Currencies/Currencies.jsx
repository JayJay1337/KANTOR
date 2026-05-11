import React, {useEffect, useState} from "react";
import '../../components/style.css'
import Actions from "../../components/Actions.jsx";
import {useNavigate} from "react-router-dom";
function Currencies(){
    const navigate = useNavigate();
    const [currencies, setCurrencies ] = useState([])
    const token = localStorage.getItem("token")
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 5;
    const fetchCurrencies = () => {
        fetch(`http://localhost:3000/api/currencies/pagination?page=${page}&pageSize=${pageSize}`)
            .then(res => res.json())
            .then(data => {
                setCurrencies(data.currencies);
                setTotal(data.total);
            });
    };
    useEffect(()=>{
        fetchCurrencies()
    }, [page])


    const handleEditCurrency = (id) => {
        navigate(`/currencies/${id}/edit`)
    }
    const handleDetailsCurrency= (id) =>{
        navigate(`/currencies/${id}`)
    }
    const handleAddCurrency = () => {
        navigate("/currencies/create");
    };
    const handleDeleteCurrency = async (id) => {
        await fetch(`http://localhost:3000/api/currencies/${id}`,{
            method : "DELETE",
            headers: {"Content-Type": "application/json",
                        "Authorization" : `Bearer ${token}`
            }
        });
        fetchCurrencies()
    };
    const totalPages = Math.ceil(total / pageSize);
    const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    return(
        <>
            <h1>WALUTY</h1>
            <button onClick={() => handleAddCurrency()}>Dodaj</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nazwa</th>
                    <th>Symbol</th>
                    <th>Kurs</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {currencies.map((currency) => (
                    <tr key={currency.ID}>
                        <td>{currency.ID}</td>
                        <td>{currency.Nazwa}</td>
                        <td>{currency.Symbol}</td>
                        <td> {currency.Kurs}</td>
                        <td>
                            <Actions
                                onEdit={() => handleEditCurrency(currency.ID)}
                                onDetails={() => handleDetailsCurrency(currency.ID)}
                                onDelete={() => handleDeleteCurrency(currency.ID)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                {pagesArray.map(p => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </>
    );
}
export default Currencies;