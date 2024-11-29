import { useState } from 'react';
import axios from 'axios';
import '../styles/ReportsView.css';
const ReportsView = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reports, setReports] = useState([]);

    const handleGenerateReport = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reports/sales', {
                params: { startDate, endDate },
            });
            setReports(response.data);
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    return (
        <div className="card p-4">
            <h4 className="text-center mb-4">Звіт про продажі</h4>
            <div className="mb-3">
                <label>Початкова дата:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Кінцева дата:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-control"
                />
            </div>
            <button onClick={handleGenerateReport} className="btn btn-primary w-100 mb-3">
                Згенерувати звіт
            </button>
            <h5>Результати:</h5>
            <ul className="list-group">
                {reports.map((report, index) => (
                    <li key={index} className="list-group-item">
                        Чек #{report.id} - ₴{report.total} (дата: {report.date})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportsView;
