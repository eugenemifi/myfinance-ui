import {useParams} from "react-router";

function User() {

    const { id } = useParams();

    return (
        <>
            <div> User with id = {id} </div>
        </>
    );
}

export default User