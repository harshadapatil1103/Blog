
import React from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link,useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon,FaSun} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { useSelector } from 'react-redux';
import { signoutStart,signoutSuccess,signoutFailure } from '../redux/user/user.Slice';

export default function Header() {

    const path=useLocation().pathname;
    const { currentUser } = useSelector((state) => state.user);
    const dispatch=useDispatch();
    const {theme}=useSelector((state)=>state.theme);
    function handleTheme(){
      dispatch(toggleTheme())   
    }

    
const handleSignout=async (req,res,next)=>{

  try{
    dispatch(signoutStart());
    const res=await fetch(`/api/user/signout/${currentUser.id}`,{
    method:'POST',
    })
    const data=res.json;
    if(!res.ok){
      dispatch(signoutFailure(data.message));
    }

    else{
      dispatch(signoutSuccess(data.message));
    }
  }
  catch(error){
    dispatch(signoutFailure(data.message));
  }
}


//
  return (
    <Navbar className='border-b-4'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded'>Harshada's</span>
             Blog
        </Link>

        <form>
            <TextInput 
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
                
            
        </form>
        <button className='w-12 h-10 lg:hidden' color='gray'>
        <AiOutlineSearch />
        </button>
        <div className='flex gap-2 md:order-2'>
            <button onClick={handleTheme}>
              {
               theme==='light' ? ( <FaSun className='w-6 h-8 sm:inline rounded-sm border-gray-500'/>) :( <FaMoon className='w-6 h-8 sm:inline rounded-sm border-gray-500'/>)
              }
               
            </button>
            {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/signin'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
            <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                <Navbar.Link  as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link  as={'div'}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
      

    </Navbar>
  )
}

