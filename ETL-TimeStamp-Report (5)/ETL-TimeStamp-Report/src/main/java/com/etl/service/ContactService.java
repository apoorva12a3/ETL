package com.etl.service;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.stereotype.Service;

import com.etl.model.Contact;

import java.util.Collections;

@Service
public class ContactService {

    // Fixed email address where you want to send the emails
    private static final String FIXED_EMAIL_ADDRESS = "yamsaniapoorva5@gmail.com";

    public void sendEmail(Contact formData) throws EmailException {
        try {
            // Build the email message
            HtmlEmail email = new HtmlEmail();
            email.setHostName("smtp.gmail.com"); // Set your SMTP server here
            email.setSmtpPort(587); // Set the SMTP port (587 for TLS)
            email.setAuthenticator(new DefaultAuthenticator("kshitijaphatangare27@gmail.com", "skpzhjkaaxtbrvzz")); // Set your Gmail email and password
            email.setStartTLSEnabled(true);

            // Set the sender's email as the provided email in the Contact object
            email.setFrom(formData.getEmail());

            email.setSubject(formData.getSubject());

            // Build the email body
            StringBuilder emailBody = new StringBuilder();
            emailBody.append("Name: ").append(formData.getName()).append("\n");
            emailBody.append("Email: ").append(formData.getEmail()).append("\n");
            emailBody.append("Message: ").append(formData.getMessage());
            email.setMsg(emailBody.toString());

            // Set the recipient's fixed email address
            email.addTo(FIXED_EMAIL_ADDRESS);

            // Send the email
            email.send();
        } catch (EmailException e) {
            throw new EmailException("Error sending email", e);
        }
    }
}