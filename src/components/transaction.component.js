import {useParams} from "react-router";

function Transaction() {

    const { id } = useParams();

    return (
        <>
            <div> Заготовочка Просмотр инфы о транзакции</div>
            <div> Transaction with id = {id} </div>
        </>
    );
}

export default Transaction