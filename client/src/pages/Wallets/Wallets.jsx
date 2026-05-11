import React, {useEffect, useState} from "react";
import '../../components/style.css'
import Actions from "../../components/Actions.jsx";
import {useNavigate} from "react-router-dom";
function Wallets(){
    const navigate = useNavigate();
    const [wallets, setWallets] = useState([])
    const token = localStorage.getItem("token")
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 5;
    const fetchWallets = () => {
        fetch(`http://localhost:3000/api/wallets/pagination?page=${page}&pageSize=${pageSize}`)
            .then(res => res.json())
            .then(data => {
                setWallets(data.wallets);
                setTotal(data.total);
            });
    };

    useEffect(() => {
        fetchWallets()
    }, [page]);

    const handleDeleteCurrency = async (id) => {
        const res = await fetch(`http://localhost:3000/api/wallets/${id}`, {
            method : "DELETE",
            headers: {"Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        if(res.ok){
            await fetchWallets();
        } else {
            console.error("Nie udało się usunąć portfela");
        }
    }

    const handleEditWallet = (id) => {
        navigate(`/wallets/${id}/edit`)
    }
    const handleDetailsWallet= (id) =>{
        navigate(`/wallets/${id}`)
    }
    const handleAddWallet = () => {
        navigate("/wallets/create");
    };
    const totalPages = Math.ceil(total / pageSize);
    const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    return(
        <>
            <h1>PORTFELE</h1>
            <button onClick={ ()=> handleAddWallet()}>Dodaj</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Właściciel</th>
                    <th>Waluta</th>
                    <th>Saldo</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {wallets.map((wallet) => (
                    <tr key={wallet.portfel_id}>
                        <td>{wallet.portfel_id}</td>
                        <td>{wallet.uzytkownik}</td>
                        <td>{wallet.waluta}</td>
                        <td> {wallet.saldo}</td>
                        <td>
                            <Actions
                                onEdit={()=> handleEditWallet(wallet.portfel_id)}
                                onDetails={()=>handleDetailsWallet(wallet.portfel_id)}
                                onDelete={()=> handleDeleteCurrency(wallet.portfel_id)}
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
export default Wallets;