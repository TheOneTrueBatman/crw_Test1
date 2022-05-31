import { useState,  } from "react";
import "./sign-in-form.styles.scss"
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
const defaultFormFields={
    email:"",
    password:"",
}



const SignInForm=()=> {
    const [formFields, setFormFields ]= useState(defaultFormFields);
    const{ email, password }= formFields;
    
    // const{ setCurrentUser }= useContext(UserContext);

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }



    const signInWithGoogle = async ()=>{
       await signInWithGooglePopup();
       
    };

 const handleSubmit=async (event)=>{
     event.preventDefault();


     try{
        await signInAuthUserWithEmailAndPassword(
            email,
            password
        );
        // setCurrentUser(user);
       resetFormFields();

    }catch(error){

        if(error.code== "auth/wrong-password" ){
            alert("incorrect Password");
        }
        else if(error.code== "auth/user-not-found"){
            alert ("email not found")
        }
        else
        console.log(error);
    }
 }   

    const handlechange=(event)=> {
        const{name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };
    return(
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in With Email and Password</span>
            <form onSubmit={handleSubmit}>

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

                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type= "button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                    Google Sign In
                </Button>
                </div>
             </form>
        </div>
    )
}

export default SignInForm;