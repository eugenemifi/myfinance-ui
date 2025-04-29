import {useParams} from "react-router";
import CreateTransactions from "./createTransactional.component";
function Transaction() {

    const { id, action} = useParams();

    return (
        <>
            <div> Информация о транзакции</div>
            <div> Transaction with id = {id} </div>
            {action === "delete" && (
                <div> Транзакция удалена </div>
            )}
            {action === "edit" && (
                <>
                    <div> Редактирование транзакции </div>
                    <CreateTransactions id={id}/>
                </>
            )}
        </>
    );
}

export default Transaction