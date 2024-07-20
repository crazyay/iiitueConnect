import { Link } from "react-router-dom"
import "./home.css"
export default function Home(){
    return(
        
        <div className="img">
     {/* <div className=" h-96 flex flex-wrap justify-evenly   items-center">
       <Link className=" mx-7 text-center font-bold font-serif rounded-xl backdrop-blur-sm  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration"}><span className="text-blue-800  text-3xl">Registration</span> </Link>
       <Link className=" mx-7 text-center font-bold font-serif rounded-xl backdrop-blur-sm  p-6 h-32 w-56  outline outline-blue-800" to={"/Fees"}> <span className="text-blue-800 text-3xl">Fees </span></Link>
       <Link className=" mx-7 text-center font-bold font-serif rounded-xl backdrop-blur-sm  p-6 h-32 w-56  outline outline-blue-800" to={"/application"}><span className="text-blue-800 text-3xl"> Application</span> </Link>
       <Link className=" mx-7 text-center font-bold font-serif rounded-xl backdrop-blur-sm p-6 h-32 w-56  outline outline-blue-800" to={"/Complaint"}><span className="text-blue-800 text-3xl"> Complaint</span> </Link>
       <Link className=" mx-7 text-center font-bold font-serif rounded-xl backdrop-blur-sm  p-6 h-32 w-56  outline outline-blue-800" to={"/Placements"}><span className="text-blue-800 text-3xl"> Placements</span> </Link>
       <Link className=" mx-7 text-center font-bold font-serif rounded-xl backdrop-blur-sm  p-6 h-32 w-56  outline outline-blue-800" to={"/News"}><span className="text-blue-800 text-3xl"> News</span> </Link>
       <Link className=" mx-7 text-center font-bold font-serif rounded-xl backdrop-blur-sm  p-6 h-32 w-56  outline outline-blue-800" to={"/gallery"}><span className="text-blue-800 text-3xl"> Gallery</span> </Link>
       
       </div> */}
       <div className="flex justify-center items-center  img">
        <h1 className="text-5xl text-blue-950 font-bold tracking-wider " style={{textShadow: "2px 2px 4px #000000"}} >WELCOME TO IIITU</h1>
       </div>
       </div>
    )
}