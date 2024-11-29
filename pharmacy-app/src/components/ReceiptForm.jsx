import { useState, useEffect } from 'react';
import { getMedicines } from '../api/medicines';
import { createReceipt } from '../api/receipts';
import '../styles/ReceiptForm.css';
const ReceiptForm = () => {
    const [medicines, setMedicines] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchMedicines = async () => {
            const data = await getMedicines();
            setMedicines(data);
        };

        fetchMedicines();
    }, []);

    const handleAddItem = (id, quantity) => {
        const medicine = medicines.find((med) => med.id === id);
        if (medicine) {
            const item = { id: medicine.id, name: medicine.name, quantity, price: medicine.price };
            setSelectedItems([...selectedItems, item]);
            setTotal(total + medicine.price * quantity);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createReceipt({
                items: selectedItems,
                total,
            });
            setSelectedItems([]);
            setTotal(0);
            alert('Чек успішно створено!');
        } catch (error) {
            console.error('Error creating receipt:', error);
        }
    };

    return (
        <div>
            <h4>Створення чека</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ліки:</label>
                    <select id="medicine-select">
                        {medicines.map((medicine) => (
                            <option key={medicine.id} value={medicine.id}>
                                {medicine.name} (₴{medicine.price})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Кількість:</label>
                    <input
                        type="number"
                        id="quantity"
                        placeholder="Кількість"
                        min="1"
                        required
                    />
                </div>
                <button
                    type="button"
                    onClick={() =>
                        handleAddItem(
                            parseInt(document.getElementById('medicine-select').value, 10),
                            parseInt(document.getElementById('quantity').value, 10)
                        )
                    }
                >
                    Додати
                </button>
                <h5>Обрані ліки:</h5>
                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.quantity} шт. (₴{item.price * item.quantity})
                        </li>
                    ))}
                </ul>
                <h5>Загальна сума: ₴{total}</h5>
                <button type="submit">Створити чек</button>
            </form>
        </div>
    );
};

export default ReceiptForm;
