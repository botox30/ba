import {useEffect, useState} from 'react';
import { Routes, Route, useLocation, useNavigate  } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navigation from './components/Navigation';
import AuthRedirect from './components/AuthRedirect';

import { getUser } from './utils/auth';

import IndexPage from './pages/IndexPage';
import HomePage from './pages/HomePage';
import DocumentsPage from './pages/DocumentsPage';
import DocumentsAddPage from './pages/DocumentsAddPage';
import ServicesPage from './pages/ServicesPage';
import QRCodePage from './pages/QRCodePage';
import MorePage from './pages/MorePage';
import NotificationsPage from './pages/NotificationsPage';

import ServicePage1 from './pages/ServicePage1';
import ServicePage2 from './pages/ServicePage2';
import ServicePage3 from './pages/ServicePage3';
import ServicePage4 from './pages/ServicePage4';
import ServicePage5 from './pages/ServicePage5';
import ServicePage6 from './pages/ServicePage6';
import ServicePage7 from './pages/ServicePage7';
import ServicePage8 from './pages/ServicePage8';

import MorePage1 from './pages/MorePage1';
import MorePage2 from './pages/MorePage2';
import MorePage3 from './pages/MorePage3';
import MorePage5 from './pages/MorePage5';

import QRCodeScan from './pages/QRCodeScan';
import QRCodeShow from './pages/QRCodeShow';

import Card from './pages/Card';
import CardDocument from './pages/CardDocument';
import ReversePesel from './pages/ReversePesel';
import Shortcuts from './pages/Shortcuts';

const NO_NAV_ROUTES = ['/', '/login', '/document/', '/notifications', '/settings'];

function App() {
    const location = useLocation();
    const [navDirection] = useState<'forward' | 'backward'>('forward');
    const [shouldAnimate] = useState(true);
    const navigate = useNavigate();

    const shouldShowNav = !NO_NAV_ROUTES.some(
        route => location.pathname === route || location.pathname.startsWith(route)
    );

    useEffect(() => {
        (async () => {
            const user = await getUser();
            console.log('Current user:', user);
            console.log('Current pathname:', location.pathname);
            if (location.pathname === '/') {
                if (user) {
                    console.log('User authenticated, redirecting to home');
                    navigate(`/${user.id}/home`);
                }
            }
        })();
    }, [location, navigate]);

    const RenderAllRoutes = () => (
        <Routes location={location}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/auth/redirect" element={<AuthRedirect />} />
            <Route path="/:id" element={<IndexPage />} />
            <Route path="/:id/" element={<IndexPage />} />
            <Route path="/:id/home" element={<HomePage />} />
            <Route path="/:id/documents" element={<DocumentsPage />} />
            <Route path="/:id/documentsAdd" element={<DocumentsAddPage />} />
            <Route path="/:id/services" element={<ServicesPage />} />
            <Route path="/:id/qrcode" element={<QRCodePage />} />
            <Route path="/:id/qrcode/scan" element={<QRCodeScan />} />
            <Route path="/:id/qrcode/show" element={<QRCodeShow />} />
            <Route path="/:id/more" element={<MorePage />} />
            <Route path="/:id/notifications" element={<NotificationsPage />} />
            <Route path="/:id/card" element={<Card />} />
            <Route path="/:id/cardDocument" element={<CardDocument />} />
            <Route path="/:id/reversepesel" element={<ReversePesel />} />
            <Route path="/:id/shortcuts" element={<Shortcuts />} />
            <Route path="/:id/service/1" element={<ServicePage1 />} />
            <Route path="/:id/service/2" element={<ServicePage2 />} />
            <Route path="/:id/service/3" element={<ServicePage3 />} />
            <Route path="/:id/service/4" element={<ServicePage4 />} />
            <Route path="/:id/service/5" element={<ServicePage5 />} />
            <Route path="/:id/service/6" element={<ServicePage6 />} />
            <Route path="/:id/service/7" element={<ServicePage7 />} />
            <Route path="/:id/service/8" element={<ServicePage8 />} />
            <Route path="/:id/more/1" element={<MorePage1 />} />
            <Route path="/:id/more/2" element={<MorePage2 />} />
            <Route path="/:id/more/3" element={<MorePage3 />} />
            <Route path="/:id/more/5" element={<MorePage5 />} />
        </Routes>
    );

    return (
        <div className="relative h-screen max-w-md mx-auto overflow-hidden bg-white">
            <TransitionGroup component={null}>
                {shouldAnimate ? (
                    <CSSTransition
                        key={location.pathname}
                        classNames={navDirection === 'forward' ? 'slide-forward' : 'slide-backward'}
                        timeout={300}
                    >
                        <div className="relative h-full pb-16 overflow-hidden">
                            <RenderAllRoutes />
                        </div>
                    </CSSTransition>
                ) : (
                    <div className="relative h-full pb-16 overflow-hidden">
                        <RenderAllRoutes />
                    </div>
                )}
            </TransitionGroup>
            {shouldShowNav && <Navigation />}
        </div>
    );
}

export default App;