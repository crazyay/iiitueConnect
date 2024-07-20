import { useState } from 'react';
import {useNavigate} from 'react-router-dom'; // Import BrowserRouter
function Dropdown(props) {
  const [selectedOption, setSelectedOption] = useState('');
 const Navigate=useNavigate();
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    // Navigate to the selected option
    Navigate(`${value}`)
   
  };
  return (
   <select style={{border:0, outline:0}} 
      value={selectedOption}
      onChange={handleChange}
      className=" bg-slate-600 text-white text-xl  mx-7 text-center font-bold font-serif "
    >

      <option className="text-white text-xl" disabled  value="">  {props.reg[0]} </option>

      {
        
          props.reg.map((item, index) => {
            if (index + 1 < props.reg.length) {
            return (
               <option className="text-white text-xl" value={`/${props.reg[0]}/${props.reg[index + 1]}`}  key={index + 1}>
                 {props.reg[index + 1]}
                </option>
            );
        }
    })}
     </select>
     
  );
}
export default Dropdown;

