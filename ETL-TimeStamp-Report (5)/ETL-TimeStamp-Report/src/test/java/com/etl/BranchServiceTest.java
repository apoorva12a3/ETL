package com.etl;

import com.etl.model.Branch;
import com.etl.repository.BranchRepository;
import com.etl.repository.ErrorRepository;
import com.etl.service.BranchService;
import com.etl.service.ErrorEntityService;
import com.etl.validation.DataValidator;
import com.etl.validation.ValidationResultBranch;
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

public class BranchServiceTest {
    @Mock
    private BranchRepository branchRepo;

    @Mock
    private ErrorRepository errorEntityRepo;

    @Mock
    private DataValidator dataValidator;

    @Mock
    private ErrorEntityService errorEntityService;

    @InjectMocks
    private BranchService service;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveBranch_ValidData_ShouldSave() {
        // Create sample list of Branch objects
        List<Branch> branches = new ArrayList<>();
        branches.add(new Branch(1L, "Location1", "AX12345", "Address1", "+91 1234567890"));
        branches.add(new Branch(2L, "Location2", "AX67890", "Address2", "+91 9876543210"));

        // Create a sample ValidationResultBranch object
        ValidationResultBranch validationResultBranch = new ValidationResultBranch(branches, new HashMap<>());

        // Mock behavior of DataValidator and BranchRepository
        when(dataValidator.checkBranchValidation(branches)).thenReturn(validationResultBranch);

        // Call method to test
        service.saveBranch(branches);

        // Verify that saveAll method was called with valid branches
        verify(branchRepo, times(1)).saveAll(validationResultBranch.getValidBranches());
        verify(errorEntityService, times(1)).saveErrorneousBranchesInDb(validationResultBranch.getErroneousBranches());
    }

    @Test
    public void testGetAllBranchRecords_ShouldReturnAllRecords() {
        // Create sample list of Branch objects
        List<Branch> branches = new ArrayList<>();
        branches.add(new Branch(1L, "Location1", "AX12345", "Address1", "+91 1234567890"));
        branches.add(new Branch(2L, "Location2", "AX67890", "Address2", "+91 9876543210"));

        // Mock behavior of BranchRepository's findAll method
        when(branchRepo.findAll()).thenReturn(branches);

        // Call method to test
        List<Branch> retrievedBranches = service.getAllBranchRecords();

        // Verify that the findAll method was called
        verify(branchRepo, times(1)).findAll();

        // Validate the retrieved list of Branches
        Assertions.assertEquals(2, retrievedBranches.size());
    }

    @Test
    public void testGetBranchCount_ShouldReturnCount() {
        // Mock behavior of BranchRepository's count method
        when(branchRepo.count()).thenReturn(3L);

        // Call method to test
        long count = service.getBranchCount();

        // Verify that the count method was called
        verify(branchRepo, times(1)).count();

        // Validate the returned count
        Assertions.assertEquals(3L, count);
    }

    @Test
    public void testGetBranchCountForReport_ShouldGenerateReport() {
        // Create sample list of Branch objects
        List<Branch> branchList = new ArrayList<>();
        branchList.add(new Branch(1L, "Location1", "AX12345", "Address1", "+91 1234567890"));
        branchList.add(new Branch(2L, "Location2", "AX67890", "Address2", "+91 9876543210"));

        // Create sample ValidationResultBranch object
        ValidationResultBranch validationResultBranch = new ValidationResultBranch(branchList, new HashMap<>());

        // Mock behavior of DataValidator's checkBranchValidation method
        when(dataValidator.checkBranchValidation(branchList)).thenReturn(validationResultBranch);

        // Call method to test
        String report = service.getBranchCountForReport(branchList);

        // Verify that the checkBranchValidation method was called
        verify(dataValidator, times(1)).checkBranchValidation(branchList);

        // Validate the generated report
        Assertions.assertNotNull(report);
        System.out.println(report);
    }
}