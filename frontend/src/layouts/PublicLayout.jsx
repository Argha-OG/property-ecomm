
import { useLocation, Outlet } from 'react-router-dom';
import { useComparison } from '../context/ComparisonContext';
import ComparisonBar from '../components/ComparisonBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    // Removed isHome check for 'pt-20' as most pages handle their own padding now or we can standardise.
    // Based on previous edits, many pages added 'pt-24'. 
    // Navbar is fixed. 'main' should probably have top padding generally?
    // Let's keep the existing logic but maybe refine it if needed.
    // Actually, looking at previous step, PublicLayout line 12: <main className={isHome ? '' : 'pt-20'}>
    // But specific pages added 'pt-24'. Conflicting logic?
    // If I leave it as is, it might double pad or be fine. 
    // Let's just add ComparisonBar for now.

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 flex flex-col">
            <Navbar />
            <main className={`flex-grow ${isHome ? '' : 'pt-0'}`}>
                {/* Changed pt-20 to pt-0 because pages seem to handle it themselves now with pt-24 */}
                <Outlet />
            </main>
            <Footer />
            <ComparisonBar />
        </div>
    );
};

export default PublicLayout;
