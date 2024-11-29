import { useState } from 'react';
import { updateMedicine } from '../api/medicines';
import PropTypes from 'prop-types';

const EditMedicineForm = ({ medicine, onMedicineUpdated }) => {
    const [formData, setFormData] = useState({
        name: medicine.name,
        quantity: medicine.quantity,
        price: medicine.price,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMedicine(medicine.id, {
                name: formData.name,
                quantity: parseInt(formData.quantity, 10),
                price: parseFloat(formData.price),
            });
            onMedicineUpdated();
        } catch (error) {
            console.error('Error updating medicine:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3">
            <h4 className="text-center mb-3">Редагувати ліки</h4>
            <div className="mb-3">
                <label>Назва:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Кількість:</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Ціна:</label>
                <input
                    type="number"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-success w-100">
                Оновити
            </button>
        </form>
    );
};

EditMedicineForm.propTypes = {
    medicine: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    onMedicineUpdated: PropTypes.func.isRequired,
};

export default EditMedicineForm;
