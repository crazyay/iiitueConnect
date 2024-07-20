import { Link } from "react-router-dom"
export default function Registrationtype(){
    return(<div className=" p-20 flex flex-row flex-wrap space-x-7 justify-center ">
    
    <Link className="text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-60  outline outline-blue-800" to={"/Registration/Hostel"}><span className="text-white text-3xl">Hostel</span> </Link>
    <Link className="text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-60 outline outline-blue-800" to={"/Registration/Academic"}><span className="text-white text-3xl">Academic </span> </Link>
    {/* <Link className="text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-full outline outline-blue-800" to={"/Registration/ECE"}><span className="text-white text-3xl">Electronics and Communcation Engineering </span> </Link> */}
    </div>
)
}