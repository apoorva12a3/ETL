package com.etl.controller;

import com.etl.model.Contact;
import com.etl.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/submitContactForm")
    public String submitContactForm(@RequestBody Contact formData) {
        try {
            contactService.sendEmail(formData); 
            return "Contact form submitted successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error submitting contact form. Please try again later.";
        }
    }
}