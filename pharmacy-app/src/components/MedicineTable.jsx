import { useEffect, useState } from 'react';
import { getMedicines, deleteMedicine } from '../api/medicines'; // Додано імпорт deleteMedicine
import PropTypes from 'prop-types';

const MedicineTable = ({ reload, onMedicineDeleted }) => {
    const [medicines, setMedicines] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const data = await getMedicines();
                setMedicines(data || []);
            } catch (err) {
                console.error('Error fetching medicines:', err);
                setError('Не вдалося завантажити дані про ліки.');
            }
        };

        fetchMedicines();
    }, [reload]);

    const handleDelete = async (id) => {
        if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
            try {
                await deleteMedicine(id);
                setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
                alert('Ліки успішно видалено!');
                if (onMedicineDeleted) {
                    onMedicineDeleted();
                }
            } catch (error) {
                console.error('Error deleting medicine:', error);
                alert('Помилка при видаленні ліків.');
            }
        }
    };

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <table className="table table-bordered table-hover mt-3">
            <thead className="table-dark">
                <tr>
                    <th>Назва</th>
                    <th>Кількість</th>
                    <th>Ціна</th>
                    <th>Дії</th> {/* Додано колонку для дій */}
                </tr>
            </thead>
            <tbody>
                {medicines.length > 0 ? (
                    medicines.map((medicine) => (
                        <tr key={medicine.id}>
                            <td>{medicine.name}</td>
                            <td>{medicine.quantity}</td>
                            <td>₴{medicine.price}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(medicine.id)}
                                >
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">
                            Дані відсутні
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

MedicineTable.propTypes = {
    reload: PropTypes.bool.isRequired,
    onMedicineDeleted: PropTypes.func, // Проп для обробки видалення
};

export default MedicineTable;
