import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App.js'
import Readout from './components/Readout'
import Instructions from './components/Instructions.js'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/* readout here gets param, goes to Outlet */}
    <Route path="/" element={<Instructions />} />
    <Route path="/:category/:id" element={<Readout />} />
  </Route>
)

export const router = createBrowserRouter(routes)
