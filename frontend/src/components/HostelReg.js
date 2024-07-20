import { Link } from "react-router-dom"
import Hostelform from './Hostelform'
export default function HostelReg(){
    return(<div className=" p-7 flex flex-col flex-wrap space-y-7">
    <Hostelform/>
    {/* <Link className="text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-full outline outline-blue-800" to={"/Registration/Hostel"}><span className="text-white text-3xl">hostel registration</span> </Link> */}
    {/* <Link className="text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-full outline outline-blue-800" to={"/Registration/Academic"}><span className="text-white text-3xl">Academic </span> </Link> */}
    {/* <Link className="text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-full outline outline-blue-800" to={"/Registration/ECE"}><span className="text-white text-3xl">Electronics and Communcation Engineering </span> </Link> */}
    



       

    </div>
     
    )
}