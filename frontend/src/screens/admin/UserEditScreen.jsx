import { useEffect,useState } from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {toast} from "react-toastify";
import {useUpdateUserMutation,useGetUserDetailsQuery} from "../../slices/usersApiSlice";
import { FormCheck } from "react-bootstrap";

const UserEditScreen = () => {
    const {id:userId}=useParams();
    const [name,setName]=useState('');
    const [email,setEmail]=useState(0);
    const [isAdmin,setIsAdmin]=useState(false);
    
    const{data:user,isLoading,refetch,error}=useGetUserDetailsQuery(userId);

    const [updateUser,{isLoading:loadingUpdate}]=useUpdateUserMutation();


    const navigate=useNavigate();

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);           
        }
    },[user]);

    const submitHandler=async(e)=>{
         e.preventDefault();
        try{
            await updateUser({userId,name,email,isAdmin});
            toast.success('User updated successfully');
            refetch();
            navigate('/admin/userlist');
        }catch(err){
            toast.error(err?.data?.message||err.error);
        }
        };

  return (
     <>
     <Link to='/admin/userlist' className="btn btn-light my-3">
        Go Back
     </Link>
     <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}

        {isLoading ? <Loader/>:error? <Message variant='danger'>
            {error}
        </Message>:(
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.label>Name</Form.label>
                    <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='my-2'>
                    <Form.label>Email</Form.label>
                    <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

              <Form.Group controlId='isAdmin' className='my-2'>    
                  <FormCheck
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e)=>setIsAdmin(e.target.checked)}
                  ></FormCheck>
              </Form.Group>
                  <Button type='submit' variant='primary' className='my-2'>
                    Update
                  </Button>
              </Form>
        )}
     </FormContainer>
     </>
  )
}

export default UserEditScreen;