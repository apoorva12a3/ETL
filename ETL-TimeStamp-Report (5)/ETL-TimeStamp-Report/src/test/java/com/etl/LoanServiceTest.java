package com.etl;

import com.etl.model.Loan;
import com.etl.repository.LoanRepository;
import com.etl.service.ErrorEntityService;
import com.etl.service.LoanService;
import com.etl.validation.DataValidator;
import com.etl.validation.ValidationResultLoan;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.mockito.Mockito.*;

public class LoanServiceTest {

    @Mock
    private LoanRepository loanRepository;

    @Mock
    private DataValidator dataValidator;

    @Mock
    private ErrorEntityService errorEntityService;

    @InjectMocks
    private LoanService loanService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveLoan_ValidData_ShouldSave() {
        // Create sample list of Loan objects
        List<Loan> loans = new ArrayList<>();
        loans.add(new Loan(1L, 101L, 201L, 10000.0, "Personal", 5.0, "Short term", "Active"));
        loans.add(new Loan(2L, 102L, 202L, 20000.0, "Home", 6.0, "Long term", "Active"));
        // Create a sample ValidationResultLoan object
        ValidationResultLoan validationResultLoan = new ValidationResultLoan(loans, new HashMap<>());

        // Mock behavior of DataValidator and LoanRepository
        when(dataValidator.checkLoanValidation(loans)).thenReturn(validationResultLoan);

        // Call method to test
        loanService.saveLoan(loans);

        // Verify that saveAll method was called with valid loans
        verify(loanRepository, times(1)).saveAll(validationResultLoan.getValidLoans());
        verify(errorEntityService, times(1)).saveErrorneousLoansInDB(validationResultLoan.getErroneousLoans());
    }

    @Test
    public void testGetAllLoanRecords_ShouldReturnAllRecords() {
        // Create sample list of Loan objects
        List<Loan> loans = new ArrayList<>();
        loans.add(new Loan(1L, 101L, 201L, 10000.0, "Personal", 5.0, "Short term", "Active"));
        loans.add(new Loan(2L, 102L, 202L, 20000.0, "Home", 6.0, "Long term", "Active"));

        // Mock behavior of LoanRepository's findAll method
        when(loanRepository.findAll()).thenReturn(loans);

        // Call method to test
        List<Loan> retrievedLoans = loanService.getAllLoanRecords();

        // Verify that the findAll method was called
        verify(loanRepository, times(1)).findAll();

        // Validate the retrieved list of Loans
        Assertions.assertEquals(2, retrievedLoans.size());
    }

    @Test
    public void testGetLoanCount_ShouldReturnCount() {
        // Mock behavior of LoanRepository's count method
        when(loanRepository.count()).thenReturn(3L);

        // Call method to test
        long count = loanService.getLoanCount();

        // Verify that the count method was called
        verify(loanRepository, times(1)).count();

        // Validate the returned count
        Assertions.assertEquals(3L, count);
    }

    @Test
    public void testGetLoanCountForReport_ShouldGenerateReport() {
        // Create sample list of Loan objects
        List<Loan> loans = new ArrayList<>();
        loans.add(new Loan(1L, 101L, 201L, 10000.0, "Personal", 5.0, "Short term", "Active"));
        loans.add(new Loan(2L, 102L, 202L, 20000.0, "Home", 6.0, "Long term", "Active"));

        // Create sample ValidationResultLoan object
        ValidationResultLoan validationResultLoan = new ValidationResultLoan(loans, new HashMap<>());

        // Mock behavior of DataValidator's checkLoanValidation method
        when(dataValidator.checkLoanValidation(loans)).thenReturn(validationResultLoan);

        // Call method to test
        String report = loanService.getLoanCountForReport(loans);

        // Verify that the checkLoanValidation method was called
        verify(dataValidator, times(1)).checkLoanValidation(loans);

        // Validate the generated report
        Assertions.assertNotNull(report);
        System.out.println(report);
    }
}