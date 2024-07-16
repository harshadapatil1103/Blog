import { useSelector } from "react-redux";


export default function ThemeProvider({children}) {
    const {theme}=useSelector((state)=>state.theme);
  return (
    <div className={theme}>
    <div className=' text-gray-200 bg-[rgb(16,23,42)] '>
      {children}
    </div>
  </div>
  )
}
//bg-white text-gray-700