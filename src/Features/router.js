import { createBrowserRouter } from 'react-router-dom';
import Documentation from '../Pages/Documentation';
import StartContract from '../Pages/StartContract';
import StartModel from '../Pages/StartModel';
import Home from '../Pages/Home';
import ContractDetails from '../Pages/ContractDetails';
import Helps from '../Pages/Helps';

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
    element: <StartModel />,
    children: [
      {
        path: 'details',
        element: <ContractDetails />,
      },
    ],
  },
  {
    path: '/helps',
    element: <Helps />,
  }
]);

export default router;