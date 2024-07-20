import { Link } from "react-router-dom"

export default function Cse(){

    return(<>
   

    <div className="branchimg h-screen flex flex-wrap justify-evenly place-items-center p-8  items-center">
     <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/CSE/cse1"}><span className="text-white text-3xl">CSE I</span> </Link>
     <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/CSE/cse2"}><span className="text-white text-3xl">CSE II</span> </Link>
     <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/CSE/cse3"}><span className="text-white text-3xl">CSE III</span> </Link>
     <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/CSE/cse4"}><span className="text-white text-3xl">CSE IV</span> </Link>
     <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/CSE/cse5"}><span className="text-white text-3xl">CSE V</span> </Link>
     <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/CSE/cse6"}><span className="text-white text-3xl">CSE VI </span> </Link>
     <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/CSE/cse7"}><span className="text-white text-3xl">CSE VII</span> </Link>
     <Link className="mx-7 text-center font-bold font-serif rounded-xl bg-blue-950  p-6 h-32 w-56 outline outline-blue-800" to={"/Registration/CSE/cse8"}><span className="text-white text-3xl">CSE VIII</span> </Link>
  


          
         </div>
         </>

    )
}