import {useEffect, useState} from "react";
import DataFromMock from "../utils/util"
function ListUsers() {

    const [users, setUsers] = useState(DataFromMock.getUsers);
    useEffect(() => {
        //UserService.getUsers().then((response) => setUsers(response)).catch((error) => {console.log(error)})
    });

    return (
        <>
            <div> List Users Component</div>
            <div> Data from Mock</div>
            <div>
                <h1 className = "text-center"> Users List</h1>
                <table className = "table table-striped">
                    <thead>
                    <tr>

                        <td> User Id</td>
                        <td> User Login</td>
                        <td> User First Name</td>
                        <td> User Last Name</td>
                        <td> User Email Id</td>
                        <td> User Role</td>
                    </tr>

                    </thead>
                    <tbody>

                    {users.map(user =>
                                <tr key = {user.id}>
                                    <td> {user.id}</td>
                                    <td> {user.login}</td>
                                    <td> {user.firstName}</td>
                                    <td> {user.lastName}</td>
                                    <td> {user.email}</td>
                                    <td> {user.role}</td>
                                </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListUsers