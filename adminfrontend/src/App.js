// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Nav from './components/Nav';
import apple from './components/Apple-Logo.png'
import netflix from './components/netflix.jpg'
import google from './components/google.webp'
import Placements from "./components/Placements"
import News from './components/News';
import Application from './components/Application';
import Gallery from './components/Gallery';
import Footer from './components/Footer'
import Home from './components/Home';
import Complaint from './components/Compalaints';
import AcademicRegistration from './components/AcademicRegistration';
import HostelReg from './components/HostelReg';
import Login from './components/Login';
import Private from './components/Private'
import ChangePassword from './components/ChangePassword';
function App() {
  const placements = [
    { name: 'Student A', company: 'Company A', package: '$100,000', logo:apple },
    { name: 'Student B', company: 'Company B', package: '$90,000', logo: netflix },
    { name: 'Student C', company: 'Company C', package: '$80,000', logo: google },
    { name: 'Student C', company: 'Company C', package: '$80,000', logo: google }


    // Add more placement data as needed
  ];
  return (
    <>
     <div>
            <ToastContainer />  {/* This component is needed to display the toast */}
        </div>
    <div>
  <BrowserRouter>
  <Nav />
  <Header />
  <Routes>
  <Route element={<Private />}>
  <Route path='/' element={<Home/>} />
   <Route path='/gallery' element={<Gallery/>} />
   <Route path='/Placements' element={<Placements placements={placements}/>} />
   <Route path='/News' element={<News/>} />
   <Route path='/application' element={<Application/>} />
   <Route path='/Complaint/:page' element={<Complaint   />} />
   <Route path="/Registration/Academic" element={<AcademicRegistration/>}/> 
   <Route path="/Registration/Hostel" element={<HostelReg/>}/> 
   <Route path="/changepassword" element={<ChangePassword/>}/>
   </Route>
   <Route path='Login' element= {<Login/>} />
  </Routes>
  <Footer />
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
