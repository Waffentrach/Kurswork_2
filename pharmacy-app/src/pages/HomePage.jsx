import ReceiptForm from '../components/ReceiptForm';
import ReceiptView from '../components/ReportsView';
import '../styles/HomePage.css';
const HomePage = () => (
    <div className="container ">
        <h1 className="text-center mb-4">Форма продажу</h1>
        <div className="row justify-content-center">
            <div className="col-md-6 mb-3">
                <ReceiptForm />
            </div>
            <div className="col-md-6 mb-3">
                <ReceiptView />
            </div>
        </div>
    </div>
);

export default HomePage;
