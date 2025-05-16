import React, { useState } from 'react'
import { Link, replace, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../../Services/ContactServices'

const AddContact = () => {
  let navigate=useNavigate()
  let [state,setState]=useState({
    loading:true,
    contact:{
    name:"",
    photo:"",
    mobile:"",
    email:"",
    title:"",
    company:"",
    groupId:""
  },
  errorMessage:""
})

  const UpdateHandle=(event)=>{
    setState({...state,contact:{
      ...state.contact,
      [event.target.name]:event.target.value
    }})
  }
  let{loading,contact,errorMessage}=state

  let submitHandle=(event)=>{
    event.preventDefault()
    let promise=new Promise((res,rej)=>{
      setState({...state,loading:false})
      let postData=ContactServices.createContact(contact)
      res(postData)
    })
    promise.then((res1)=>{
      if (res1) {
        setState({...state,loading:false})
        navigate("/contacts/list",{replace:true})
      }else{
        setState({...state,loading:false})
        navigate("/contacts/add",{replace:false})
      }
    }).catch(()=>{
      setState({...state,loading:false,errorMessage:alert("Data Not Posted...")})
    })
  }
  return (
    <>
    {/* <pre>{JSON.stringify(contact)}</pre> */}
      <section className='add-contact'>
        <div className="container p-3">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Create Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In natus ipsum doloribus rerum aperiam est quibusdam? Quam unde eligendi delectus veritatis molestias officiis omnis illum, soluta at. Deserunt, aliquid harum.</p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <form action="" onSubmit={submitHandle}>
                  <div className="mb-2">
                    <input type="text" placeholder='NAME'name='name' value={contact.name} onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="text" placeholder='Photo Url' name='photo' value={contact.photo} onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="number" placeholder='Mobile' name='mobile' value={contact.mobile} onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="email" placeholder='Email' name='email' value={contact.email} onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="text" placeholder='Company' name='company' value={contact.company} onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="text" placeholder='Title' name='title' value={contact.title} onChange={UpdateHandle} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="text" placeholder='GroupId' value={contact.groupId} onChange={UpdateHandle} name="groupId" id="" className='form-control'/>
                    {/* <select name="groupId" onChange={UpdateHandle} id="" className='form-control'>
                      <option value="">Select A Group</option>
                      <option value="">Friend</option>
                      <option value="">Family</option>
                    </select> */}
                  </div>

                  <div>
                    <input type="submit" value="Create" className="btn btn-success"/>
                    <Link to={'/Contacts/list'} className='btn btn-danger ms-2'>Cancel</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddContact
