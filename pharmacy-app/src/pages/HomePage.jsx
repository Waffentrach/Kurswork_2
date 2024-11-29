import ReceiptForm from '../components/ReceiptForm';
import ReceiptView from '../components/ReportsView';
import './';
const HomePage = () => (
    <div className="container mt-5">
        <h1 className="text-center mb-4">Форма продажу</h1>
        <div className="row">
            <div className="col-md-6">
                <ReceiptForm />
            </div>
            <div className="col-md-6">
                <ReceiptView />
            </div>
        </div>
    </div>
);

export default HomePage;
