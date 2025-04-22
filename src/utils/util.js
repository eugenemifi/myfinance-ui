class MockDataUtils {
    getUsers() {
        return [
            {
                "id": "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
                "login": "ivan000",
                "firstName": "Иван",
                "lastName": "Иванов",
                "email": "ivanov@mail.ru",
                "userRole": "admin",
                "createdAt": "2025-04-15 18:00",
                "updatedAt": "2025-04-16 02:30"
            },
            {
                "id": "b4e8c6eb-f6ff-4aed-b1c6-cdb014b3a64f",
                "login": "petr777",
                "firstName": "Петр",
                "lastName": "Петров",
                "email": "petrov@mail.ru",
                "userRole": "user",
                "createdAt": "2025-04-15 18:30",
                "updatedAt": "2025-04-16 06:45"
            },
            {
                "id": "45558fbd-d415-4836-be75-e0a348128a78",
                "login": "SiDoR",
                "firstName": "Сидор",
                "lastName": "Сидоров",
                "email": "sidorov@mail.us",
                "userRole": "user",
                "createdAt": "2025-04-15 21:00",
                "updatedAt": "2025-04-17 12:30"
            },
            {
                "id": "1994b4fd-1c62-4537-abdf-ce2445b64011",
                "login": "beautygirl",
                "firstName": "Анна",
                "lastName": "Семенова",
                "email": "chiky@gmail.com",
                "userRole": "user",
                "createdAt": "2025-04-18 22:00",
                "updatedAt": "2025-04-16 21:28"
            },
            {
                "id": "341901aa-7991-4444-80f2-112032eae296",
                "login": "zaur",
                "firstName": "Заур",
                "lastName": "Трегулов",
                "email": "bestuser@mail.world",
                "userRole": "user",
                "createdAt": "2025-04-19 13:00",
                "updatedAt": "2025-04-19 13:13"
            }
        ];
    }

    getTransactions() {
        return [
            {
                "id": "165978cb-2585-4aee-8983-d5c0fe8921c5",
                "amount": 725.0,
                "date": "2025-04-18 12:35",
                "category": "Расходы",
                "description": "Оплата мобильной связи"
            },
            {
                "id": "f4b3d6af-c1ab-41dc-b4ff-f0bc3a627dcd",
                "amount": 99888.88,
                "date": "2025-04-15 10:00",
                "category": "Доход",
                "description": "Зарплата"
            },
            {
                "id": "2b428282-ea57-4b83-aeb1-06a4243e51dd",
                "amount": 7800.0,
                "date": "2025-04-20 15:45",
                "category": "Расходы",
                "description": "Коммунальные услуги"
            },
            {
                "id": "412850db-6032-46c4-be54-cefa213a4aec",
                "amount": 35000.35,
                "date": "2025-04-10 11:15",
                "category": "Доход",
                "description": "Аванс"
            },
            {
                "id": "e7466656-25c2-46a7-8051-4589288665ca",
                "amount": 13500.99,
                "date": "2025-04-22 18:30",
                "category": "Расходы",
                "description": "Покупка: Азбука вкуса"
            }
        ]
    }
}

export default new MockDataUtils()