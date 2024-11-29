import { useEffect, useState } from 'react';
import { getMedicines } from '../api/medicines';
import PropTypes from 'prop-types';

const MedicineTable = ({ reload }) => {
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
                </tr>
            </thead>
            <tbody>
                {medicines.length > 0 ? (
                    medicines.map((medicine) => (
                        <tr key={medicine.id}>
                            <td>{medicine.name}</td>
                            <td>{medicine.quantity}</td>
                            <td>₴{medicine.price}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center">
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
};

export default MedicineTable;
