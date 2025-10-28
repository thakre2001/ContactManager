import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactServices } from '../../../Services/ContactServices'

const EditContact = () => {
  let navigate = useNavigate()
  let { contactId } = useParams()
  let [state, setState] = useState({
    loading: true,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      title: '',
      company: "",
      groupId: ""
    },
    errorMessage: ""
  })

  useEffect(() => {
    let promise = new Promise((res, rej) => {
      setState({ ...state, loading: false })
      let response = ContactServices.getContact(contactId)
      res(response)
    })
    promise.then((res1) => {
      setState({ ...state, loading: false, contact: res1.data })
    }).catch(() => {
      setState({ ...state, loading: false, errorMessage: alert("Data Not Fetched") })
    })
  }, contactId)

  const UpdateHandle = (event) => {
    setState({
      ...state, contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    })
  }
  let { loading, contact, errorMessage } = state

  let submitHandle = (event) => {
    event.preventDefault()
    let promise = new Promise((res, rej) => {
      setState({ ...state, loading: false })
      let postData = ContactServices.updateContact(contact, contactId)
      res(postData)
    })
    promise.then((res1) => {
      if (res1) {
        setState({ ...state, loading: false })
        navigate("/contacts/list", { replace: true })
      } else {
        setState({ ...state, loading: false })
        navigate("/contacts/edit", { replace: false })
      }
    }).catch(() => {
      setState({ ...state, loading: false, errorMessage: alert("Data Not Posted...") })
    })
  }
  return (
    <>
      {/* <pre>{JSON.stringify(contact)}</pre> */}
      <section className='edit-contact'>
        <div className="container p-3">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">Edit Contact</p>
              <p className='fst-italic'>
                Update the details of an existing contact.
                You can modify personal information such as name, mobile, and email,
                as well as professional details like company, job title, and group.
                Once saved, the updated information will be reflected immediately in your contact list.
              </p>
            </div>
            <div className="row align-items-center">
              <div className="col-md-4">
                <form action="" onSubmit={submitHandle}>
                  <div className="mb-2">
                    <input type="text" name='name' value={contact.name} placeholder='NAME' onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="text" name='photo' value={contact.photo} placeholder='Photo Url' onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="number" name='mobile' value={contact.mobile} placeholder='Mobile' onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="email" name='email' value={contact.email} placeholder='Email' onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="text" name='company' value={contact.company} placeholder='Company' onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="text" name='title' value={contact.title} placeholder='Title' onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="text" name="groupId" value={contact.groupId} placeholder='Group Id' onChange={UpdateHandle} id="" className="form-control" />
                    {/* <select name="" id="" className='form-control'>
                      <option value="">Select A Group</option>
                    </select> */}
                  </div>

                  <div>
                    <input type="submit" value="Update" className="btn btn-primary" />
                    <Link to={'/Contacts/list'} className='btn btn-danger ms-2'>Cancel</Link>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <img src={contact.photo} alt="" className='contact-img' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditContact
