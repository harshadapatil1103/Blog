import { Button, TextInput, Alert, Modal } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from '../firebase';
import { updateStart,updateSuccess,updateFailure,deleteStart,deleteSuccess,deleteFailure } from '../redux/user/user.Slice.js';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProfile() {
  const { currentUser,error } = useSelector((state) => state.user);
  const [imageFile,setImageFile]=useState(null);
  const [imageFileUrl,setImageFileUrl]=useState(null);
  const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null);
  const [imageFileUploadError,setImageFileUploadError]=useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData,setFormData]=useState({});
  const [showModal,setShowModal]=useState(false);

const dispatch=useDispatch();

const filePickerRef=useRef();

  function handleImageChange(e){
    const file=e.target.files[0];
    if(file){
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
    }
   
  }


useEffect(()=>{
    if(imageFile){
      uploadImage();
    }
},[imageFile]);

  const uploadImage=async ()=>{
    setImageFileUploading(true);
  const storage=getStorage(app); //app imported from firebase.js
  const fileName=new Date().getTime()+imageFile.name;
  const storageRef=ref(storage,fileName);
  const uploadTask=uploadBytesResumable(storageRef,imageFile);
  uploadTask.on(
    'state_changed',
    (snapshot)=>{
     const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
     setImageFileUploadProgress(progress.toFixed(0));
    },
    (error)=>{
      setImageFileUploadError('could not upload image (file must be less tha 2 mb)')
      setImageFileUploadProgress(null);
      setImageFile(null);
      setImageFileUrl(null);
      setImageFileUploading(false);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setImageFileUrl(downloadURL);
      setFormData({...formData,profilePicture: downloadURL});
      setImageFileUploading(false);
      });
    }

  );
  }

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
   console.log(formData);
   

  };

const handleSubmit=async (e)=>{
e.preventDefault();
console.log(updateUserError);
if(Object.keys(formData).length===0){

  setUpdateUserError('No changes made');
  return;
}
if(imageFileUploading){
  setUpdateUserError('Please wait for image to upload');
  return;
}
try{
  dispatch(updateStart());
  const res=await fetch(`/api/user/update/${currentUser._id}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',

    },
    body:JSON.stringify(formData),
  });
  // const res = await fetch(`/api/user/update/${currentUser._id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(formData),
  // });
const data= await res.json();
console.log(data);
if(data.success===false){
  dispatch(updateFailure(data.message));
  setUpdateUserError(data.message);
}
else{
dispatch(updateSuccess(data));
console.log("successfully inserted data");
setUpdateUserSuccess("users profile updated successfully");
}
}

catch(error){

dispatch(updateFailure(error.message));
setUpdateUserError(error.message);
}
 }

 const handleDeleteUser=async (req,res,next)=>{
  setShowModal(false);
  try{
  dispatch(deleteStart);
  const res=await fetch(`/api/user/delete/${currentUser._id}`,{
    method:'DELETE'
  });

const data= await res.json();
console.log(data);
if(data.success===false){
  dispatch(deleteFailure(data.message));

}
else{
dispatch(deleteSuccess(data));
console.log("successfully deleted");
}

}
catch(error){
  dispatch(deleteFailure(error.message));


}

 }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          {
            imageFileUploadProgress && (<CircularProgressbar value={imageFileUploadProgress ||0} text={`${imageFileUploadProgress}%`}
            strokeWidth={5}
            styles={
              {
                root:{
                  width:`100%`,
                  height:`100%`,
                  position:'absolute',
                  top:0,
                  left:0,

                },
                path:{
                stroke: `rgba(62, 152, 199, ${
                  imageFileUploadProgress / 100
                })`
                },
              }
            }

            />)
          }
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
            onClick={()=>{
              filePickerRef.current.click()
            }
          
          }
          />
        </div>
        {
          imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>
        }
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput type='password' id='password' placeholder='password'  onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
     
      <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser} >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {
        updateUserSuccess && (<Alert color='success' className='mt-5' >
          {updateUserSuccess}
        </Alert>)
      }
      {
        updateUserError && (<Alert color='failure' className='mt-5' >
          {updateUserError}
        </Alert>
        )
      }
        {
        error && (<Alert color='failure' className='mt-5' >
          {error}
        </Alert>
        )
      }
      {/* <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='sm'>
          shown
        </Modal> */}

    </div>
  );
}