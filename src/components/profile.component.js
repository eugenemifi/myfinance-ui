function Profile() {

    const user = JSON.stringify(localStorage.getItem("user"));

    return (
        <>
            <h2> Profile </h2>
            <div> username : {user.username}</div>
            <div> password : {user.password}</div>
            <div> email : {user.email}</div>
        </>
    )
}

export default Profile;