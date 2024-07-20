import { Link } from "react-router-dom"
export default function Ece(){
    return( <div className="branchimg h-screen flex flex-wrap justify-evenly place-items-center p-8  items-center">
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/ECE/ece1"}><span className="text-white text-3xl">ECE I</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/ECE/ece2"}><span className="text-white text-3xl">ECE II</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/ECE/ece3"}><span className="text-white text-3xl">ECE III</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/ECE/ece4"}><span className="text-white text-3xl">ECE IV</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/ECE/ece5"}><span className="text-white text-3xl">ECE V</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/ECE/ece6"}><span className="text-white text-3xl">ECE VI </span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/ECE/ece7"}><span className="text-white text-3xl">ECE VII</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/ECE/ece8"}><span className="text-white text-3xl">ECE VIII</span> </Link>
     </div>

    )
}