package com.jspiders.springbootwithreact.contact;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "contacts")
@Data
public class Contacts {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int contactId;
	@Column(nullable = false,unique = false)
	private String name;
	@Column(nullable = false,unique = true)
	private String photo;
	@Column(nullable = false,unique = true)
	private long mobile;
	@Column(nullable = false,unique = true)
	private String email;
	@Column(nullable = false,unique = false)
	private String title;
	@Column(nullable = false,unique = false)
	private String company;
	@Column(nullable = false,unique = false)
	private int groupId;
}

