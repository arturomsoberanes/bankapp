import { useState, useEffect } from 'react';
import CardComponent from '../components/CardComponent';
import { getAuth } from 'firebase/auth'
import firebaseapp from '../firebaseapp';
import axios from 'axios'

function Balance() {
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const auth = getAuth(firebaseapp)
    const user = auth.currentUser;
    user.getIdToken()
      .then( idToken => {
        axios.get(`/users/${user.email}`, {
          headers: { 'Authorization' : idToken }
        }).then( res => {
          if (res.data.length > 0) {
            setData(res.data);
            setStatus('')
          } else {
            setStatus('Can´t find user');
          }
        })
      })
      .catch( e => console.error(e) )

  },[])


  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <CardComponent
        bgcolor="dark"
        txtcolor="white"
        header="Balance"
        status={status}
        body={
          <>
            {data.map( (user, i) => { 
              return (
                <div key={i}>
                  <p className="fw-bold m-0">Name:</p>
                  <p className="m-0">{user.name}</p>
                  <p className="fw-bold m-0">Email:</p>
                  <p className="m-0">{user.email}</p>
                  <p className="fw-bold m-0">Balance:</p>
                  <p className="m-0">{user.balance}</p>
                </div>
              )
            })}
          </>
        }
      />
    </div>
  );
}

export default Balance;
