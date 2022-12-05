import { useState, useEffect } from 'react';
import CardComponent from '../components/CardComponent';
import Pagination from '../components/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';

// Firebase SDK
import { 
  getAuth,
  deleteUser
} from 'firebase/auth'
// Firebase Configuration
import firebaseapp from '../firebaseapp'

import axios from 'axios';

function AllData() {
  const auth = getAuth(firebaseapp)
  const user = auth.currentUser
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const [ data, setData ] = useState(null)
  const [ status, setStatus ] = useState('Loading...')

  const handlePageChange = e => {
    setCurrentPage(Number(e.target.textContent))
  }

  function paginate(items, pagenumber, pagesize) {
    const start = (pagenumber - 1) * pagesize;
    let page = items.slice(start, start + pagesize);
    return page;
  }

  let page = data
  if (page !== null && page.length >= 1) {
    page = paginate(page, currentPage, pageSize)
  }


  useEffect(() => {
    const auth = getAuth(firebaseapp)

    const user = auth.currentUser
    async function getData(idToken) {
      let response = await axios.get(`/movements/${user.email}`, {
        headers: { 'Authorization': idToken }
      })
      return response;
    }
    user.getIdToken()
      .then( idToken => {
        getData(idToken)
          .then( res => res.data.length > 0 ? setData(res.data) : setStatus('No Data Avaliable'))
          .catch( e => console.error(e))
      })
      .catch( e => console.error(e) )
  }, [])

  // This function only delete user of database but not 
  // of firebase
  function delUser() {
    const auth = getAuth(firebaseapp)
    const user = auth.currentUser
    
    user.getIdToken()
      .then( idToken => {
        const url = `/users/delete/${user.email}`
        axios.delete(url, { headers: {'Authorization': idToken}})
          .then(() => {
            deleteUser(user)
              .then(() => {
                auth.signOut()
                window.location.href = "/"
              })
              .catch( e => console.error(e) )

          })
          .catch( e => console.error(e) )
      })
  }


  return (
    <div className="container d-flex justify-content-center align-items-center flex-wrap mt-5">
      <CardComponent
        bgcolor="dark"
        txtcolor="white"
        header='All Data'
        title={user.name}
        body={
          <>
            <p>Email: {user.email} </p>
            <button
              className='btn btn-danger mb-2'
              onClick={() => delUser(user.email)}
            >Delete User</button>
            <p>Movements:</p>
            {
              data ? 
                (
                  <>
                    <ListGroup className="mt-2">
                      {
                        page.map((mv,i) => {
                          return (
                            <ListGroup.Item key={i}>
                              <p>Type: {mv.type}</p>
                              <p>Date: {mv.date}</p>
                              <p>Balance: {mv.balance}</p>
                            </ListGroup.Item>
                          )
                        })
                      }
                    </ListGroup>
                    <Pagination
                      items={data}
                      pageSize={pageSize}
                      onPageChange={handlePageChange}
                      currentPage={currentPage}
                    ></Pagination>
                  </>
                ):( 
                  <p>{status}</p>
                )
            }
          </>
        }
      />
    </div>
  );
}

export default AllData;

