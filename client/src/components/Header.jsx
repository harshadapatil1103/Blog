import { Navbar, NavbarCollapse, TextInput } from 'flowbite-react'
import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {

    const path=useLocation().pathname;
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
            <button>
                <FaMoon className='w-6 h-8 sm:inline rounded-sm border-gray-500'/>
            </button>
            <Link to='/signin'>
             <button className='px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded text-white'>Sign in</button>
            </Link>
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

