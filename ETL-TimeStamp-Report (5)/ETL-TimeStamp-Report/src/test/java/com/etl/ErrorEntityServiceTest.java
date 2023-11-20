package com.etl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import com.etl.model.Account;
import com.etl.model.Branch;
import com.etl.model.Customer;
import com.etl.model.ErrorEntity;
import com.etl.model.Loan;
import com.etl.model.Transaction;
import com.etl.repository.ErrorRepository;
import com.etl.service.ErrorEntityService;

import jakarta.validation.ConstraintViolation;

@SpringBootTest(classes = ErrorEntityServiceTest.TestConfig.class)
public class ErrorEntityServiceTest {

    @InjectMocks
    private ErrorEntityService errorEntityService;

    @Mock
    private ErrorRepository errorEntityRepo;

    @Test
    public void testSaveErrorneousCustomersInDB() {
        // Create a sample erroneous customer and violations for testing
        Customer erroneousCustomer = new Customer(1,"Rahul","Roy","Shivajinagar, Pune, Maharashtra","+91 7896541236","rahul.com");

        erroneousCustomer.setCustomerID(123L); // Sample customer ID
        Set<ConstraintViolation<Customer>> violations = new HashSet<>(); // Sample violations
        ConstraintViolation<Customer> violation = Mockito.mock(ConstraintViolation.class);
        Mockito.when(violation.getMessage()).thenReturn("Sample violation message");
        violations.add(violation);

        // Create a sample erroneous customers map
        Map<Customer, Set<ConstraintViolation<Customer>>> erroneousCustomers = new HashMap<>();
        erroneousCustomers.put(erroneousCustomer, violations);

        // Call the method to be tested
        errorEntityService.saveErrorneousCustomersInDB(erroneousCustomers);

        // Verify that errorEntityRepo.save was called for each violation
        Mockito.verify(errorEntityRepo, Mockito.times(violations.size())).save(Mockito.any(ErrorEntity.class));
    }

    @Test
    public void testSaveErrorneousBranchesInDb() {
        // Create a sample erroneous customer and violations for testing
        //Customer erroneousCustomer = new Customer(1,"Rahul","Roy","Shivajinagar, Pune, Maharashtra","+91 7896541236","rahul.com");

        Branch erroneousBranch = new Branch();

        erroneousBranch.setBranchID(123L); // Sample customer ID
        Set<ConstraintViolation<Branch>> violations = new HashSet<>(); // Sample violations
        ConstraintViolation<Branch> violation = Mockito.mock(ConstraintViolation.class);
        Mockito.when(violation.getMessage()).thenReturn("Sample violation message");
        violations.add(violation);

        // Create a sample erroneous customers map
        Map<Branch, Set<ConstraintViolation<Branch>>> erroneousBranches = new HashMap<>();
        erroneousBranches.put(erroneousBranch, violations);

        // Call the method to be tested
        errorEntityService.saveErrorneousBranchesInDb(erroneousBranches);

        // Verify that errorEntityRepo.save was called for each violation
        Mockito.verify(errorEntityRepo, Mockito.times(violations.size())).save(Mockito.any(ErrorEntity.class));
    }

    @Test
    public void testSaveErrorneousAccountsInDB() {
        // Create a sample erroneous customer and violations for testing
        //Customer erroneousCustomer = new Customer(1,"Rahul","Roy","Shivajinagar, Pune, Maharashtra","+91 7896541236","rahul.com");

        Account erroneousAccount = new Account();

        erroneousAccount.setAccountID(123L); // Sample Account ID
        Set<ConstraintViolation<Account>> violations = new HashSet<>(); // Sample violations
        ConstraintViolation<Account> violation = Mockito.mock(ConstraintViolation.class);
        Mockito.when(violation.getMessage()).thenReturn("Sample violation message");
        violations.add(violation);

        // Create a sample erroneous customers map
        Map<Account, Set<ConstraintViolation<Account>>> erroneousAccounts = new HashMap<>();
        erroneousAccounts.put(erroneousAccount, violations);

        // Call the method to be tested
        errorEntityService.saveErrorneousAccountsInDB(erroneousAccounts);

        // Verify that errorEntityRepo.save was called for each violation
        Mockito.verify(errorEntityRepo, Mockito.times(violations.size())).save(Mockito.any(ErrorEntity.class));
    }

    @Test
    public void testSaveErrorneousLoansInDB() {
        // Create a sample erroneous customer and violations for testing
        //Customer erroneousCustomer = new Customer(1,"Rahul","Roy","Shivajinagar, Pune, Maharashtra","+91 7896541236","rahul.com");

        Loan erroneousLoan = new Loan();

        erroneousLoan.setLoanID(123L); // Sample Loan ID
        Set<ConstraintViolation<Loan>> violations = new HashSet<>(); // Sample violations
        ConstraintViolation<Loan> violation = Mockito.mock(ConstraintViolation.class);
        Mockito.when(violation.getMessage()).thenReturn("Sample violation message");
        violations.add(violation);

        // Create a sample erroneous customers map
        Map<Loan, Set<ConstraintViolation<Loan>>> erroneousLoans = new HashMap<>();
        erroneousLoans.put(erroneousLoan, violations);

        // Call the method to be tested
        errorEntityService.saveErrorneousLoansInDB(erroneousLoans);

        // Verify that errorEntityRepo.save was called for each violation
        Mockito.verify(errorEntityRepo, Mockito.times(violations.size())).save(Mockito.any(ErrorEntity.class));
    }

    @Test
    public void testSaveErrorneousTransactionsInDB() {
        // Create a sample erroneous customer and violations for testing
        //Customer erroneousCustomer = new Customer(1,"Rahul","Roy","Shivajinagar, Pune, Maharashtra","+91 7896541236","rahul.com");

        Transaction erroneousTransaction = new Transaction();

        erroneousTransaction.setTransactionID(123L); // Sample Transaction ID
        Set<ConstraintViolation<Transaction>> violations = new HashSet<>(); // Sample violations
        ConstraintViolation<Transaction> violation = Mockito.mock(ConstraintViolation.class);
        Mockito.when(violation.getMessage()).thenReturn("Sample violation message");
        violations.add(violation);

        // Create a sample erroneous customers map
        Map<Transaction, Set<ConstraintViolation<Transaction>>> erroneousTransactions = new HashMap<>();
        erroneousTransactions.put(erroneousTransaction, violations);

        // Call the method to be tested
        errorEntityService.saveErrorneousTransactionsInDB(erroneousTransactions);

        // Verify that errorEntityRepo.save was called for each violation
        Mockito.verify(errorEntityRepo, Mockito.times(violations.size())).save(Mockito.any(ErrorEntity.class));
    }

    @SpringBootTest
    public static class TestConfig {
    }
}