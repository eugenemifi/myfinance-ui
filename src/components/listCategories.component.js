import AuthService from "../services/auth.service";
import {useEffect, useState} from "react";
import CategoryService from "../services/category.service";

function ListCategories() {

    const [currentUser] = useState(AuthService.getCurrentUser);

    const [categories, setCategories] = useState([])

    useEffect(() => {
        CategoryService.getCategories()
            .then((response) => {
                const data = response.data;
                setCategories(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <div> List Categories Component</div>
            {currentUser && (
                <div>
                    <h2 className="text-center">Список категорий</h2>
                    <br></br>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <td> ID</td>
                                <td> Имя категории</td>
                                <td> Тип категории</td>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map(category =>
                                <tr key={category.id}>
                                    <td> {category.id}</td>
                                    <td> {category.categoryName}</td>
                                    <td> {category.categoryType}</td>
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

export default ListCategories