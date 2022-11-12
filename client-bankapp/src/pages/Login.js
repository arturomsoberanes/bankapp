import CardComponent from '../components/CardComponent';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import FormLogin from '../components/FormLogin';
import { 
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider
} from 'firebase/auth';
import firebaseapp from '../firebaseapp';
import axios from 'axios';

function Login() {
  const [status, setStatus] = useState('');
  const [session, setSession] = useState(false);
  const auth = getAuth(firebaseapp)

  useEffect(() => {
    const auth = getAuth(firebaseapp)
    onAuthStateChanged(auth, usr => usr ? setSession(true) : setSession(false))
    getRedirectResult(auth)
      .then((result) => {
        //This gives you a Google Access Token. You can use it to access the Google API.
        //The signed-in user info.
        const user = result.user;
        axios.post(`/users/create/${user.displayName}/${user.email}/secret`)
          .catch( e => {
            console.log(e)
          })
      })
      .catch( error => console.log(error.message) )

  }, [])



  function validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more';
    }


    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      login(values)
    },
  });

  function clearStatus() {
    formik.values.email = '';
    formik.values.password = '';
    setTimeout(() => setStatus(''), 3000);
  }

  async function login(values) {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .catch(error => {
        if ( error.message === 'Firebase: Error (auth/user-not-found).' ){
          setStatus("The account doesn't exists")
          clearStatus()
        } else if ( error.message === 'Firebase: Error (auth/wrong-password).' ) {
          setStatus("The password is incorrect")
          clearStatus()
        } else {
          console.log(error.message)
          setStatus(error.message)
        } 
      })
  }

  async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider)
  }
  

  return (
    <div className="container-form container d-flex flex-column justify-content-center align-items-center mt-5">
      <CardComponent
        bgcolor="dark"
        txtcolor="white"
        header="Login"
        status={status}
        body={
          !session ? 
            (
              <>
                <FormLogin
                  onChange={formik.handleChange}
                  onSubmit={formik.handleSubmit}
                  values={formik.values}
                  errors={formik.errors}
                />
                <button 
                  className="w-100 m-2 btn btn-warning text-center"
                  onClick={loginGoogle}
                >Login with Google</button>
                <Link className='text-warning' to="/CreateAccount"> You don't have account? Sign in </Link>
              </>
            ):(
              <>
                <h5>Session Started</h5>
                <button 
                  className="btn btn-light"
                  onClick={() => auth.signOut()}
                >Sign Out</button>
              </>
            )
        }
      />
    </div>
  );
}
export default Login;
