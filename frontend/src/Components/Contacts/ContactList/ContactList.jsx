import React, { useEffect, useState } from 'react'
import { json, Link } from 'react-router-dom'
import { ContactServices } from '../../../Services/ContactServices'
import Spinner from '../../../Assest/Spinner'
const ContactList = () => {
  let[query,setQuery]=useState({
    text:""
  })
  let[state,setState]=useState({
    loading:true,
    contacts:[],
    filterContacts:[],
    errorMessage:""
  })
  useEffect(()=>{
    let promise=new Promise((res,rej)=>{
      setState({...state,loading:true,contacts:[]});
      let response=ContactServices.getAllContacts()
      res(response)
    })
    promise.then((res1)=>{
      setState({...state,loading:false,contacts:res1.data,filterContacts:res1.data})
    }).catch(()=>{
      setState({...state,loading:false,errorMessage:alert("data not found")})
    })
  },[])

  let deleteCont=(contactId)=>{
    let promise=new Promise((res,rej)=>{
      let deleteContact=ContactServices.deleteContact(contactId)
      res(deleteContact)
    })
    promise.then((res1)=>{
      if(res1){
        let promise=new Promise((res,rej)=>{
          setState({...state,loading:true,contacts:[],filterContacts:res1.data});
          let response=ContactServices.getAllContacts()
          res(response)
        })
        promise.then((res1)=>{
          setState({...state,loading:false,contacts:res1.data,filterContacts:res1.data})
        }).catch(()=>{
          setState({...state,loading:false,errorMessage:alert("data not found")})
        })
      }
    })
  }

  let searchContacts=(event)=>{
    setQuery({...query,text:event.target.value})

    let theContacts=state.contacts.filter((contact)=>{
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
    })
    setState({...state,filterContacts:theContacts})
  }
  let{loading,contacts,errorMessage,filterContacts}=state
  return (
    
    <div>
      {/* <pre>{JSON.stringify(query.text)}</pre> */}
      <section className='contact-search'>
        <div className="container mt-4">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">Contact Manager <Link to={'/Contacts/add'} className='btn btn-primary me-4'><i className='fa fa-plus-circle me-2' />Add</Link></p>
                <p className='fst-italic'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit dolorem quas labore obcaecati aspernatur, reprehenderit ratione unde distinctio aliquam accusantium nisi architecto earum eligendi dolorum necessitatibus dicta, vel iure minima.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form action="" className="row">
                <div className="col">
                  <div className="mb-2">
                    <input type="text" name='text' onChange={searchContacts} value={query.text} placeholder='Search Names' className='form-control' />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-2">
                    {/* <input type="submit" value="Search" className='btn btn-outline-dark' /> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        </section>
        {
          loading?<Spinner/>:<React.Fragment>
            <section className="contact-list">
          <div className="container">
            <div className="row">
              {
                filterContacts.length && filterContacts.map((contact)=>{
                  return(
                    <div className="col-md-6 mt-4 ">
                <div className="card d-flex justify-content-around flex-wrap">
                  <div className="card-body">
                    <div className="row align-items-md-center">
                    <div className="col-md-4 d-flex justify-content-sm-center">
                      <img src={contact.photo} alt="" className='contact-img'/>
                    </div>
                    <div className="col-md-7">
                      <ul className="list-group">
                        <li className="list-group-item">NAME : <span className='fw-bold'>{contact.name}</span></li>
                        <li className="list-group-item">MOBILE : <span className='fw-bold'>{contact.mobile}</span></li>
                        <li className="list-group-item">EMAIL : <span className='fw-bold'>{contact.email}</span></li>
                      </ul>
                    </div>
                    <div className="col-md-1 d-flex flex-md-column align-items-center justify-content-sm-around">
                      <Link to={`/Contacts/view/${contact.contactId}`} className='btn btn-warning my-1'><i className='fa fa-eye'/></Link>
                      <Link to={`/Contacts/edit/${contact.contactId}`} className='btn btn-primary my-1'><i className='fa fa-pen'/></Link>
                      <button className='btn btn-danger my-1' onClick={()=>{deleteCont(contact.contactId)}}><i className='fa fa-trash'/></button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
                  )
                })
              }
            </div>
          </div>
        </section>
          </React.Fragment>
        }
        
    </div>
  )
}

export default ContactList
