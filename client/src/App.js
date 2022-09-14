import AOS from 'aos';
import './Sass/main.css';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import ProjectPage from './Components/Pages/Projects';
import LandingPage from './Components/Pages/LandingPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ViewSingleProjectPage from './Components/Pages/ViewSingleProject';
import { InternalErrorPage, NotFoundErrorPage, ForbiddenErrorPage } from './Components/Error/Error';
import LoginPageCompile from './Components/Pages/LoginPage';
import Admin from './Components/Pages/Admin';
import AdminRouteProtect from './Components/Routes Protection/AdminRouteProtect';

function App() {
	useEffect(() => {
		AOS.init({
			offset: 200,
			duration: 600,
			easing: 'ease-in-out',
		});
	}, []);

	return (
		<Router>
			{/* <Navigate exact from='/projects/' to='/projects/all' />
			 */}

			<Routes>
				<Route exact path='/' element={<LandingPage />} />

				<Route exact path='/projects' element={<Navigate exact from='/projects/' to='/projects/all' />} />
				<Route exact path='/projects/:technologyFilter' element={<ProjectPage />} />

				<Route exact path='/view-project/' element={<Navigate exact from='/view-project/' to='/projects/all' />} />
				<Route exact path='/view-project/:projectId' element={<ViewSingleProjectPage />} />

				<Route exact path='/login' element={<LoginPageCompile />} />

				<Route exact path='/admin' element={<AdminRouteProtect component={Admin} />} />

				{/* PROTECTED ROUTES */}

				{/* Errors */}
				<Route exact path='/500' element={<InternalErrorPage />} />
				<Route exact path='/404' element={<NotFoundErrorPage />} />
				<Route exact path='/403' element={<ForbiddenErrorPage />} />
				<Route exact path='*' element={<NotFoundErrorPage />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
