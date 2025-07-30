import './App.css';
import {BrowserRouter,Routes,Route,useParams} from "react-router-dom"
import Nav from './components/Nav';
import Home from './components/Home'
// import Registration from './components/Registration';
import Fees from './components/Fees';
import Application from './components/Application';
import Login from './components/Login';
// import Cse from './components/Cse';
import Academicform from './components/Academicform';
// import Ece from './components/Ece';
// import It from './components/It';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import ComplaintForm from './components/Complaint';
import Registrationtype from './components/Registrationtype';
import HostelReg from './components/HostelReg';
import Placements from './components/Placements'
import apple from './components/Apple-Logo.png'
import netflix from './components/netflix.jpg'
import google from './components/google.webp'
import Footer from './components/Footer';
import Private from './components/Private';
import News from './components/News';
import Gallery from './components/Gallery';
import Success from './components/Success';
import Failure from  './components/Failure'

import Changepassword from './components/ChangePassword';
function App() {
  const placements = [
    { name: 'Student A', company: 'Company A', package: 'Rs.15,00,000', logo:apple },
    { name: 'Student B', company: 'Company B', package: 'Rs.45,00,000', logo: netflix },
    { name: 'Student C', company: 'Company C', package: 'Rs.80,00,000', logo: google },
    { name: 'Student C', company: 'Company C', package: 'Rs.20,00,000', logo: google }


    // Add more placement data as needed
  ];
 
  const params =useParams();
  const {name}= params;
  return (
    <>
     <div>
            {/* This container will catch all toast notifications */}
            <ToastContainer />
        </div>
  <div classname="overflow-y-hidden">

    <BrowserRouter>
    <Nav />
         <Routes>
          <Route element={<Private />}>
          <Route path='/' element={<Home />} /> 
          <Route path='/Registration' element= {<Registrationtype />} />
          <Route path='/Registration/academic' element= {<Academicform />} />
          <Route path='/Registration/hostel' element= {<HostelReg />} />
          <Route path='/Complaint' element= {<ComplaintForm />} />
          <Route path='/Placements' element= {<Placements placements={placements} />} />
          <Route path='/Fees' element= {<Fees />} />
          <Route path='/News' element= {<News />} />
          <Route path='/gallery' element= {<Gallery />} />
          <Route path='/success' element= {<Success />} />
          <Route path='/failure' element= {<Failure />} />
          <Route path='/changepassword' element= {<Changepassword />} />
           

          <Route path='/application' element= {<Application/>} />
          </Route>
          <Route path='/Login' element= {<Login/>} />
        
         </Routes>
    </BrowserRouter>
    <Footer/>
      </div>
      </>
  );
}

export default App;
