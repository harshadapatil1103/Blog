import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure,signInSuccess } from '../redux/user/user.Slice';

export default function OAuth() {
     const dispatch=useDispatch();
     const navigate=useNavigate();

     //handle click
     const handleGoogleClick= async ()=>{
     const auth=getAuth(app)
     const provider= new GoogleAuthProvider();
     
    //alaways ask you to select account
     provider.setCustomParameters({prompt:'select_account'})

    try{
        const resultsFromGoogle=await signInWithPopup(auth,provider);
       
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL,
            }),
            })
            const data = await res.json()
            if(data.success===false){
             return dispatch(signInFailure(data.message))
            }
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }

    }
    catch(error){
        console.log(error)

    }

    }
  return (
 
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>

  )
}
