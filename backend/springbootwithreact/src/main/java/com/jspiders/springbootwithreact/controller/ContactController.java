package com.jspiders.springbootwithreact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jspiders.springbootwithreact.contact.Contacts;
import com.jspiders.springbootwithreact.service.ContactService;

@RestController
@CrossOrigin(origins = "*")
public class ContactController {
	
	@Autowired
	private ContactService contactService;
	
	@PostMapping(value = "/contacts")
	protected Contacts addContact(@RequestBody Contacts contacts) {
		return contactService.addContact(contacts);
		
		
	}
	
	@GetMapping("/contacts")
	protected List<Contacts> findAllContacts() {
		return contactService.findAllContacts();
	}
	
	@GetMapping("/contacts/{contactId}")
	protected Contacts findContactByID(@PathVariable(name = "contactId") int id) {
		return contactService.findContactById(id);
	}
	
	@PutMapping("/contacts/{contactId}")
	protected void updateContact(@RequestBody Contacts contacts) {
		contactService.updateContact(contacts);
	}
	
	@DeleteMapping("/contacts/{contactId}")
	protected void deleteContact(@PathVariable(name = "contactId") int id) {
		contactService.deleteContact(id);
	}
}
