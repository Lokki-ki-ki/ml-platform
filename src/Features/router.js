import { createBrowserRouter } from 'react-router-dom';
import Documentation from '../Pages/Documentation';
import StartContract from '../Pages/StartContract';
import SubmitModel from '../Pages/SubmitModel';
import Home from '../Pages/Home';
import ContractDetails from '../Pages/ContractDetails';

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/documentation',
    element: <Documentation />,
  },
  {
    path: '/contracts',
    element: <StartContract />,
  },
  {
    path: '/contracts/:id',
    element: <SubmitModel />,
    children: [
      {
        path: 'details',
        element: <ContractDetails />,
      },
    ],
  }
]);

export default router;