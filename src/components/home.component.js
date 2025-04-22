import TestService from "../services/test.service";


function Home() {
    return (
        <>
            <div>Home component</div>
            <div>Тест запроса к REST API</div>
            <TestService />
        </>
    );
}
export default Home;
