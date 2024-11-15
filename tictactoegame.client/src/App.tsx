import Navbar from './components/Navbar';
import '../src/css/bootstrap.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from '../src/components/About';
import NotFound from '../src/components/NotFound';
import DashBoard from '../src/components/Dashboard';



function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<DashBoard />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;