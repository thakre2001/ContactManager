package com.jspiders.springbootwithreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jspiders.springbootwithreact.contact.Contacts;

@Repository 
public interface ContactRepository extends JpaRepository<Contacts, Integer>{

}
