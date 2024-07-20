
import { Link } from "react-router-dom"
import Dropdown from "./Dropdown"
// import "./home.css"
export default function Header(){
    return(
       <div className=" p-2 bg-slate-600  max-h-fit flex flex-wrap flex-row justify-center items-center  ">
       <Dropdown reg={["Registration","Academic","Hostel"]} />
       {/* <Link className=" mx-7 text-center font-bold font-serif " to={"/Fees"}> <span className="text-white text-xl">Fees </span></Link> */}
       <Link className=" mx-7 text-center font-bold font-serif " to={"/application"}><span className="text-white text-xl"> Application</span> </Link>
       <Dropdown reg={["Complaint","Civil","Electrical","Wifi"]} />
       {/* <Link className=" mx-7 text-center font-bold font-serif" to={"/Complaint"}><span className="text-white text-xl"> Complaint</span> </Link> */}
       <Link className=" mx-7 text-center font-bold font-serif " to={"/Placements"}><span className="text-white text-xl"> Placements</span> </Link>
       <Link className=" mx-7 text-center font-bold font-serif " to={"/News"}><span className="text-white text-xl"> News</span> </Link> 
       <Link className=" mx-7 text-center font-bold font-serif " to={"/gallery"}><span className="text-white text-xl"> Gallery</span> </Link> 
       </div>
      
    )
}