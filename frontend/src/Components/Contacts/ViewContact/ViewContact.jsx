import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactServices } from '../../../Services/ContactServices';
import Spinner from '../../../Assest/Spinner';

const ViewContact = () => {
  let { contactId } = useParams();
  let [state, setState] = useState({
    loading: true,
    contact: {},
    errorMessage: ''
  })
  useEffect(() => {
    let promise = new Promise((res, rej) => {
      setState({ ...state, loading: true, contact: {} });
      let response = ContactServices.getContact(contactId);
      res(response)
    })
    promise.then((res1) => {
      setState({ ...state, loading: false, contact: res1.data })
    }).catch(() => {
      setState({ ...state, loading: false, errorMessage: alert("Data not found") })
    })
  }, [contactId])
  console.log(state.contact);

  let { loading, contact, errorMessage } = state
  return (
    <>
      <section className='view-contact'>
        <div className="container p-3">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary fw-bold">View Contact</p>
              <p className='fst-italic'>
                This page displays the complete details of the selected contact,
                including personal and professional information.
                You can review their profile, verify details, and navigate back
                to the contact list for quick management.
              </p>
            </div>
          </div>
        </div>
      </section>
      {
        loading ? <Spinner /> : <React.Fragment>
          {
            Object.keys(contact).length > 0 && (
              <section className='view-contact-list'>
                <div className="container">
                  <div className="row justify-content-center mt-2">
                    <div className="col-md-6">
                      <img src={contact.photo} alt="" className='contact-img' />
                    </div>
                  </div>
                  <div className="row mt-2 justify-content-center">
                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-action">Name : <span className='fw-bold'>{contact.name}</span></li>
                        <li className="list-group-item list-group-item-action">Email : <span className='fw-bold'>{contact.email}</span></li>
                        <li className="list-group-item list-group-item-action">Mobile : <span className='fw-bold'>{contact.mobile}</span></li>
                        <li className="list-group-item list-group-item-action">Company : <span className='fw-bold'>{contact.company}</span></li>
                        <li className="list-group-item list-group-item-action">Title : <span className='fw-bold'>{contact.title}</span></li>
                        <li className="list-group-item list-group-item-action">Group : <span className='fw-bold'>{contact.groupId}</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="row mt-2 d-flex justify-content-center my-2">
                    <div className="col-md-6">
                      <Link to={'/'} className='btn btn-warning btn-action'>Back</Link>
                    </div>
                  </div>
                </div>
              </section>)
          }
        </React.Fragment>
      }

    </>
  )
}

export default ViewContact
