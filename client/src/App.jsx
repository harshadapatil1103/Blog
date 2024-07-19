
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import FooterCom from './components/Footer'
import PrivateRouting from './components/PrivateRouting'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'


function App() {


  return (
    <>
    <Header />
   
     <Routes>
         <Route path='/' element={<Home />}></Route>
         <Route path='/about ' element={<About />}></Route>
         <Route path='/projects' element={<Projects />}></Route>
         <Route path='/signIn' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route element={<PrivateRouting />}>
         <Route path='/dashboard' element={<Dashboard />}></Route>
         </Route>
         <Route element={<OnlyAdminPrivateRoute />}>
         <Route path='/create-post' element={<CreatePost/>}></Route>
         <Route path='/update-post/:postId' element={<UpdatePost/>}></Route>
         </Route>
     </Routes>
     <FooterCom/>
   
    </>
   

  )
}

export default App
