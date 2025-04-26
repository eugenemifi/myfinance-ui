import AuthService from "../services/auth.service";
import {useEffect, useState} from "react";
import BanksService from "../services/banks.service";

function ListBanks() {

    const [currentUser] = useState(AuthService.getCurrentUser);

    const [banks, setBanks] = useState([])

    useEffect(() => {
        BanksService.getBanks()
            .then((response) => {
                const data = response.data;
                setBanks(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <div> List Banks Component</div>
            {currentUser && (
                <div>
                    <h2 className="text-center">Список банков</h2>
                    <br></br>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <td> ID</td>
                                <td> Имя банка</td>
                                <td> БИК код</td>
                            </tr>
                            </thead>
                            <tbody>
                            {banks.map(bank =>
                                <tr key={bank.bankId}>
                                    <td> {bank.bankId}</td>
                                    <td> {bank.bankName}</td>
                                    <td> {bank.bicCode}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {!currentUser && (
                <div>
                    <strong> Вы не авторизованы! </strong>
                </div>
            )}
        </>
    )
}

export default ListBanks