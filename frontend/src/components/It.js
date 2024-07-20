import { Link } from "react-router-dom"
export default function It(){
    return( <div className="branchimg h-screen flex flex-wrap justify-evenly place-items-center p-8  items-center">
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/IT/it1"}><span className="text-white text-3xl">IT I</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/IT/it2"}><span className="text-white text-3xl">IT II</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/IT/it3"}><span className="text-white text-3xl">IT III</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/IT/it4"}><span className="text-white text-3xl">IT IV</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/IT/it5"}><span className="text-white text-3xl">IT V</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/IT/it6"}><span className="text-white text-3xl">IT VI </span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/IT/it7"}><span className="text-white text-3xl">IT VII</span> </Link>
    <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/IT/it8"}><span className="text-white text-3xl">IT VIII</span> </Link>
 


         
        </div>

    )
}