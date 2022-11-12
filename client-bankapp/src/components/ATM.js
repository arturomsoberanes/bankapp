import { useState, useEffect } from 'react'
import ATMForm from './ATMForm';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { getAuth } from 'firebase/auth';
import firebaseapp from '../firebaseapp';
import axios from 'axios';


function ATM({ isDeposit, atmMode }){
  const auth = getAuth(firebaseapp)
  const email = auth.currentUser.email
  const [status, setStatus] = useState('Loading...');
  const [totalState, setTotalState] = useState(0) 


  

  useEffect(() => {
    const auth = getAuth(firebaseapp)
    const user = auth.currentUser;
    user.getIdToken()
      .then( idToken => {
        axios.get(`/users/${user.email}`, {
          headers: { 'Authorization' : idToken }
        }).then( res => {
          if (res.data.length > 0) {
            setTotalState(res.data[0].balance);
            setStatus('')
          } else {
            setStatus('Can´t find user');
          }
        })
      })
      .catch( e => console.error(e) )

  },[])

  const validate = values => {
    const errors = {};
    if (!values.deposit) {
      errors.deposit = 'Required';
    } else if (values.deposit <= 0) {
      errors.deposit = 'Number invalid';
    } else if (atmMode === 'Cash Back' && values.deposit > totalState) {
      errors.deposit = "You don't have enough money";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      deposit: '',
    },
    validate,
    onSubmit: values => {
      ActionATM(values);
    },
  });

  function ActionATM(values) {

    const date = Date.now();
    const dateTransaction = new Date(date);
    const dateString = dateTransaction.toDateString()

    let newTotal = isDeposit ? totalState + values.deposit : totalState - values.deposit;
    auth.currentUser.getIdToken()
      .then( idToken => {
        axios.put(`/users/updateBalance/${email}/${newTotal}/${atmMode}/${dateString}`, {}, {
          headers: { 'Authorization': idToken }
        })
          .then( res => {
            if ( res.data.user.modifiedCount ) {
              setTotalState(newTotal)
              setStatus('Success')
              setTimeout(() => setStatus(''), 3000)
              clear()
            } else {
              setStatus(res.data)
              setTimeout(() => setStatus(''), 3000)
            }
          })
          .catch(e => {
            setStatus('Error: ' + e)
          })
      })
      .catch(e => console.error(e))
  };

  function clear() {
    formik.values.deposit = '';
  }
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <p className="fw-bold m-1">Balance:</p>
        <p className="m-1">{totalState}</p>
        <ATMForm
          isDeposit={isDeposit} 
          onChange={formik.handleChange}
          values={formik.values}
          errors={formik.errors}
        />
        <Form.Label className="fw-bold">{status}</Form.Label>
      </Form>
    </>
  );
};

export default ATM;

