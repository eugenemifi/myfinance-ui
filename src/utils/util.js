class MockDataUtils {
    getUsers() {
        return [
            {
                "id": 1,
                "login": "ivan000",
                "firstName": "Иван",
                "lastName": "Иванов",
                "email": "ivanov@mail.ru",
                "role": "admin"
            },
            {
                "id": 2,
                "login": "petr777",
                "firstName": "Петр",
                "lastName": "Петров",
                "email": "petrov@mail.ru",
                "role": "user"
            },
            {
                "id": 3,
                "login": "SiDoR",
                "firstName": "Сидор",
                "lastName": "Сидоров",
                "email": "sidorov@mail.us",
                "role": "user"
            },
            {
                "id": 4,
                "login": "beautygirl",
                "firstName": "Анна",
                "lastName": "Семенова",
                "email": "chiky@gmail.com",
                "role": "user"
            },
            {
                "id": 5,
                "login": "zaur",
                "firstName": "Заур",
                "lastName": "Трегулов",
                "email": "bestuser@mail.world",
                "role": "user"
            }
        ];
    }

    getTransactions() {
        return [
            {
                "id": 1,
                "comment": "Оплата мобилки",
                "amount": 1000
            },
            {
                "id": 2,
                "comment": "Зарплата",
                "amount": 99888
            },
            {
                "id": 3,
                "comment": "Коммунальные услуги",
                "amount": 7800
            },
            {
                "id": 4,
                "comment": "Аванс",
                "amount": 35000
            },
            {
                "id": 5,
                "comment": "Покупка: Азбука вкуса",
                "amount": 13500
            }
        ]
    }
}

export default new MockDataUtils()