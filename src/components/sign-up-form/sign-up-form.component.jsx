import { useState} from "react";
import "./sign-up-form.styles.scss"
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
const defaultFormFields={
    displayname:"",
    email:"",
    password:"",
    confirmpassword:""
}
const SignUpForm=()=> {
    const [formFields, setFormFields ]= useState(defaultFormFields);
    const{displayname, email, password , confirmpassword}= formFields;
    
    // const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }


    // useEffect(()=>{
    //     console.log(formFields);
    // },[formFields]);
 
 const handleSubmit=async (event)=>{
     event.preventDefault();

     if(password != confirmpassword ){
         alert('passwords do not match');
         return;
     }

     try{
        const {user}= await createAuthUserWithEmailAndPassword(email, password);
     
        // setCurrentUser(user);

        await createUserDocumentFromAuth(user, {displayname});
        resetFormFields();

    }catch(error){
        if(error.code == "auth/email-already-in-use"){
            alert("cannot create user, email already in use");
        }
         console.log('user creation encountered an error', error)

     }
 }   

    const handlechange=(event)=> {
        const{name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };
    return(
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up With Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label= "Display Name"
                type="text" 
                required 
                onChange={handlechange} 
                name="displayname"
                value={displayname}/>

                <FormInput 
                label="Email"
                type="email" 
                required 
                onChange={handlechange} 
                name="email"
                value={email}/>

                <FormInput 
                label="Password"
                type="password" 
                required 
                onChange={handlechange} 
                name="password"
                value={password}/>

            
                <FormInput 
                label="Confirm Password"
                type="password" 
                required 
                onChange={handlechange} 
                name="confirmpassword"
                value={confirmpassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;