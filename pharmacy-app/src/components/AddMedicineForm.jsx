import { useState } from 'react';
import { addMedicine } from '../api/medicines';
import PropTypes from 'prop-types';

const AddMedicineForm = ({ onMedicineAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMedicine({
                name: formData.name,
                quantity: parseInt(formData.quantity, 10),
                price: parseFloat(formData.price),
            });
            setFormData({ name: '', quantity: '', price: '' });
            onMedicineAdded();
        } catch (error) {
            console.error('Error adding medicine:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3">
            <h4 className="text-center mb-3">Додати ліки</h4>
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
            <button type="submit" className="btn btn-primary w-100">
                Додати
            </button>
        </form>
    );
};

AddMedicineForm.propTypes = {
    onMedicineAdded: PropTypes.func.isRequired,
};

export default AddMedicineForm;
