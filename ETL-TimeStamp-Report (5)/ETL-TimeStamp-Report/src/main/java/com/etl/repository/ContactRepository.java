package com.etl.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etl.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}