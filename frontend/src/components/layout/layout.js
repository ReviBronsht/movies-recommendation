import './layout.css';
import { Outlet } from "react-router-dom";
import Navbar from '../navbar/navbar';

export default function Layout() {
  return (
    <div className='main'>
      <div className='navbar'>
      <Navbar/>
      </div>
      <div className='stripe'></div>
      <div className='content'>
        <h3 className='title'>Recommend Netflix</h3>
      <Outlet/>
      </div>
    </div>
  )
}
