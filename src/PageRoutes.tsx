import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // assuming Main is your login page component

function PageRoutes() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
		</Routes>
	</BrowserRouter>
  );
}

export default PageRoutes;
