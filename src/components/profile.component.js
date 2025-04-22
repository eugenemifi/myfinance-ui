import AuthService from "../services/auth.service";

function Profile() {

    const user = AuthService.getCurrentUser();

    return (
        <>
            <h2> Profile </h2>
            <p><strong>Token</strong> : {user && user.token} </p>
        </>
    )
}

export default Profile;