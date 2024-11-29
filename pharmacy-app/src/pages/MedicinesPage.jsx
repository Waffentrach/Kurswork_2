import { useState } from 'react';
import MedicineTable from '../components/MedicineTable';
import AddMedicineForm from '../components/AddMedicineForm';

const MedicinesPage = () => {
    const [reload, setReload] = useState(false);

    const handleMedicineAdded = () => {
        setReload(!reload); 
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">База даних ліків</h1>
            <div className="row">
                <div className="col-md-4">
                    <AddMedicineForm onMedicineAdded={handleMedicineAdded} />
                </div>
                <div className="col-md-8">
                    <MedicineTable reload={reload} />
                </div>
            </div>
        </div>
    );
};

export default MedicinesPage;
