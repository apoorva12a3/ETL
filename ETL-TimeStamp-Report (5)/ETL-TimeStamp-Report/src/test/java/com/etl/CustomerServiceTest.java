package com.etl;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import com.etl.model.Customer;
import com.etl.model.ErrorEntity;
import com.etl.repository.CustomerRepository;
import com.etl.repository.ErrorRepository;
import com.etl.service.CustomerService;
import com.etl.service.ErrorEntityService;
import com.etl.validation.DataValidator;
import com.etl.validation.ValidationResultBranch;
import com.etl.validation.ValidationResultCustomer;

import jakarta.validation.ConstraintViolation;

//@SpringBootTest(classes = SpringbootEtlCsvToDbExample2Application.class)
@SpringBootTest(classes = CustomerServiceTest.TestConfig.class)
public class CustomerServiceTest {

    @Mock
    CustomerRepository customerRepo;

    @Mock
    private ErrorRepository errorEntityRepo;

    @Mock
    private DataValidator dataValidator;

    @Mock
    private ErrorEntityService errorEntityService;

    @InjectMocks
    CustomerService service = new CustomerService();

    @Test
    public void testSaveCustomer() {
        Customer customer1 = new Customer(1,"Rahul","Roy","Shivajinagar, Pune, Maharashtra","+91 7896541236","rahul@gmail.com");
        Customer customer2 = new Customer(2,"Seema","Patil","Andheri, Mumbai, Maharashtra","+91 8965412362","seema@gmail.com");
        Customer customer3 = new Customer(3,"Prakash","Singh","Noida, Delhi","+91 9396541236","prakash@gmail.com");

        List<Customer> customers = new ArrayList<>();
        customers.add(customer1);
        customers.add(customer2);
        customers.add(customer3);


        // Mock the DataValidator's behavior
        ValidationResultCustomer validationResult = new ValidationResultCustomer(customers, new HashMap<>());
        Mockito.when(dataValidator.checkCustomerValidation(customers)).thenReturn(validationResult);

        // Mock the CustomerRepository's saveAll method
        Mockito.when(customerRepo.saveAll(customers)).thenReturn(customers);

        // Mock the ErrorEntityService's saveErrorneousCustomersInDB method
        Map<Customer, Set<ConstraintViolation<Customer>>> erroneousCustomers = new HashMap<>(); // Initialize with sample erroneous customers
        Mockito.doNothing().when(errorEntityService).saveErrorneousCustomersInDB(erroneousCustomers);

        // Call the method to be tested
        service.saveCustomer(customers);

        // Add assertions to verify the expected behavior
        Mockito.verify(dataValidator, Mockito.times(1)).checkCustomerValidation(customers);
        Mockito.verify(customerRepo, Mockito.times(1)).saveAll(customers);
        Mockito.verify(errorEntityService, Mockito.times(1)).saveErrorneousCustomersInDB(erroneousCustomers);
    };

    @Test
    public void testGetAllCustomerRecords() {
        Customer customer1 = new Customer(1,"Rahul","Roy","Shivajinagar, Pune, Maharashtra","+91 7896541236","rahul@gmail.com");
        Customer customer2 = new Customer(2,"Seema","Patil","Andheri, Mumbai, Maharashtra","+91 8965412362","seema@gmail.com");
        Customer customer3 = new Customer(3,"Prakash","Singh","Noida, Delhi","+91 9396541236","prakash@gmail.com");

        List<Customer> customers = new ArrayList<>();
        customers.add(customer1);
        customers.add(customer2);
        customers.add(customer3);

        when(customerRepo.findAll()).thenReturn(customers);
        List<Customer> result = service.getAllCustomerRecords();

        Assertions.assertNotEquals(null, result);
        Assertions.assertEquals("Rahul", result.get(0).getFirstName());

    }

    @Test
    public void testgetCustomerCount() {
        Customer customer1 = new Customer(1,"Rahul","Roy","Shivajinagar, Pune, Maharashtra","+91 7896541236","rahul@gmail.com");
        Customer customer2 = new Customer(2,"Seema","Patil","Andheri, Mumbai, Maharashtra","+91 8965412362","seema@gmail.com");
        Customer customer3 = new Customer(3,"Prakash","Singh","Noida, Delhi","+91 9396541236","prakash@gmail.com");

        List<Customer> customers = new ArrayList<>();
        customers.add(customer1);
        customers.add(customer2);
        customers.add(customer3);

        when(customerRepo.count()).thenReturn((long) 3);
        long result = service.getCustomerCount();

        Assertions.assertNotEquals(1, result);
        Assertions.assertEquals(3, result);

    }

    @Test
    public void testgetCustomerCountForReport() {
        Customer customer1 = new Customer(1,"Rahul","Roy","Shivajinagar, Pune, Maharashtra","+91 7896541236","rahul@gmail.com");
        Customer customer2 = new Customer(2,"Seema","Patil","Andheri, Mumbai, Maharashtra","+91 8965412362","seema@gmail.com");
        Customer customer3 = new Customer(3,"Prakash","Singh","Noida, Delhi","+91 9396541236","prakash@gmail.com");

        List<Customer> customers = new ArrayList<>();
        customers.add(customer1);
        customers.add(customer2);
        customers.add(customer3);

        // Mock the behavior of customerRepo to return a sample customer count
        long sampleDbCustomerCount = 100; // Sample customer count
        Mockito.when(customerRepo.count()).thenReturn(sampleDbCustomerCount);

        // Mock the DataValidator and its behavior
        ValidationResultCustomer validationResultCustomer = new ValidationResultCustomer(customers, new HashMap<>());
        when(dataValidator.checkCustomerValidation(customers)).thenReturn(validationResultCustomer);


        // Call the method to be tested
        String report = service.getCustomerCountForReport(customers);

        // Verify that the dataValidator.checkCustomerValidation method was called
        Mockito.verify(dataValidator, Mockito.times(1)).checkCustomerValidation(customers);

        // Verify that the customerRepo.count method was called
        Mockito.verify(customerRepo, Mockito.times(1)).count();

        // Add assertions to verify the content of the report
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String formattedDate = currentDate.format(formatter);
        String expectedReport = "Data values fetched successfully from Customer : 3" // Assuming no violations in this test
                + " | Total data provided :" + customers.size()
                + " | Violations : 0"
                + " | Date: " + formattedDate;
        // Check if the expected report matches the actual report returned by the method
        Assertions.assertEquals(expectedReport, report);

    }

    // Define a configuration class to exclude DataSource related configurations
    @SpringBootTest
    public static class TestConfig {
    }
}
