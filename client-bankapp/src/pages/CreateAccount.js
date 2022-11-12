import { useState, useEffect } from 'react';
import CardComponent from '../components/CardComponent';
import FormCreateAccount from '../components/FormCreateAccount';
import { useFormik } from 'formik';
import { 
  Link, 
  Navigate
} from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import firebaseapp from '../firebaseapp'
import axios from 'axios';

function CreateAccount() {
  const [session, setSession] = useState(false)
  const [status, setStatus] = useState('')

  const auth = getAuth(firebaseapp)

  useEffect(() => {
    const auth = getAuth(firebaseapp)
    onAuthStateChanged(auth, usr => usr ? setSession(true) : setSession(false))
  },[])


  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }

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

    if (!values.repassword) {
      errors.repassword = 'Required';
    } else if (values.repassword !== values.password ) {
      errors.repassword = 'Passwords must match';
    }


    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repassword: '',

    },
    validate,
    onSubmit: values => {
      CreateAcc(values);
    },
  });

  const CreateAcc = (values) => {
    let {name, email, password} = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then( () => {
        axios.post(`http://localhost:4000/users/create/${name}/${email}/${password}`)
          .catch( e => {
            console.log(e)
            setStatus(e)
            setTimeout(()=>{setStatus('')}, 3000);
          })
      })
      .catch( e => {
        switch (e.message) {
          case 'Firebase: Error (auth/email-already-in-use).':
            setStatus('The account already exists')
            setTimeout(()=>{setStatus('')}, 3000);
            break;
          default:
            console.log(e.message)
            return
        }
      })
  }

  return (
    <div className="container-form container d-flex justify-content-center align-items-center mt-5">
      {
        session ? <Navigate to='/'/> :
          (
            <CardComponent
              bgcolor="dark"
              txtcolor="white"
              header="Create Account"
              status={status}
              body={
                <>
                  <FormCreateAccount
                    onChange={formik.handleChange}
                    onSubmit={formik.handleSubmit}
                    values={formik.values}
                    errors={formik.errors}
                  />
                  <Link className='text-warning d-block mt-3' to="/login"> 
                    You already have account? Login
                  </Link>
                </>
              }
            />
          )
      }
    </div>
  );
}

export default CreateAccount;
