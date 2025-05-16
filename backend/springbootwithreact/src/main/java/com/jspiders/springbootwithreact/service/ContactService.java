package com.jspiders.springbootwithreact.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jspiders.springbootwithreact.contact.Contacts;
import com.jspiders.springbootwithreact.repository.ContactRepository;

@Service
public class ContactService {

	@Autowired
	private ContactRepository contactRepository;

	public Contacts addContact(Contacts contacts) {
		return contactRepository.save(contacts);

	}

	public List<Contacts> findAllContacts() {
		return contactRepository.findAll();

	}

	public Contacts findContactById(int contactId) {
		Optional<Contacts> contact = contactRepository.findById(contactId);
		if (contact != null) {
			return contact.get();
		} else {
			return null;
		}

	}

	public void updateContact(Contacts contacts) {
		contactRepository.save(contacts);

	}

	public Contacts deleteContact(int id) {
		Contacts contact = contactRepository.findById(id).get();
		contactRepository.delete(contact);
		return contact;

	}

}
