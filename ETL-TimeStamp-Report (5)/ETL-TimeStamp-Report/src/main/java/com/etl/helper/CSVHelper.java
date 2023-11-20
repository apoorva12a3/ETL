package com.etl.helper;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import com.etl.model.Account;
import com.etl.model.Branch;
import com.etl.model.Customer;
import com.etl.model.Loan;
import com.etl.model.Transaction;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class CSVHelper {
    public static String TYPE = "text/csv";
    //static String[] HEADERs = { "Id", "Title", "Description", "Published" };

    public static boolean hasCSVFormat(MultipartFile file) {

        if (!TYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }

    public static List<Customer> fetchCustomerDataFromCSV(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Customer> customers = new ArrayList<Customer>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();
//extraction
            for (CSVRecord customerRecord : csvRecords) {
            	Customer customerObj = new Customer(
                        Long.parseLong(customerRecord.get("customerID")),
                        customerRecord.get("firstName"),
                        customerRecord.get("lastName"),
                        customerRecord.get("address"),
                        customerRecord.get("contactNo"),
                        customerRecord.get("emailID")
                );

            	customers.add(customerObj);
            }

            return customers;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }
    
    public static List<Branch> fetchBranchDataFromCSV(InputStream is){
    	try(
    			//bufferreader:for effiecient reading
    			//and utf-8 for csv format
    			BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
    			//parses csv file acc to format
    			CSVParser csvParser = new CSVParser(fileReader,
    					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
    			){
    		List<Branch> branches = new ArrayList<Branch>();
    		
    		Iterable<CSVRecord> csvRecords = csvParser.getRecords();
    		
    		for(CSVRecord branchRecord: csvRecords) {
    			Branch branchObj = new Branch(
    					Long.parseLong(branchRecord.get("branchID")),
    					branchRecord.get("branchLocation"),
    					branchRecord.get("branchCode"),
    					branchRecord.get("branchAddress"),
    					branchRecord.get("branchContactNo")
    					);
    			branches.add(branchObj);
    		}
    		return branches;
    		
    	} catch (IOException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException("Fail to Parse CSV file: "+ e.getMessage());
		}
    }
    
    public static List<Account> fetchAccountDataFromCSV(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Account> account = new ArrayList<Account>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord accountRecord : csvRecords) {
                Account accountObj = new Account(
                        Long.parseLong(accountRecord.get("accountID")),
                        Long.parseLong(accountRecord.get("customerID")),
                        Long.parseLong(accountRecord.get("branchID")),
                        accountRecord.get("accountType"),
                        Double.parseDouble(accountRecord.get("balance"))
                );

                account.add(accountObj);
            }

            return account;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }
    
    public static List<Transaction> fetchTransactionDataFromCSV(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Transaction> transaction = new ArrayList<Transaction>();

            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm");

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord transactionRecord : csvRecords) {
                Transaction transactionObj = new Transaction(
                        Long.parseLong(transactionRecord.get("transactionID")),
                        Long.parseLong(transactionRecord.get("accountID")),
                        transactionRecord.get("transactionType"),
                        Double.parseDouble(transactionRecord.get("transactionAmount")),
                        null
                );
                // Parse and set the transactionDate from the CSV record
                String dateStr = transactionRecord.get("TransactionDate");
                try {
                    Date transactionDate = dateFormat.parse(dateStr);
                    transactionObj.setTransactionDate(transactionDate);
                } catch (ParseException e) {
                    throw new RuntimeException("Failed to parse TransactionDate: " + e.getMessage());
                }

                transaction.add(transactionObj);
            }

            return transaction;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }
    
    public static List<Loan> fetchLoanDataFromCSV(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Loan> loan = new ArrayList<Loan>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord loanRecord : csvRecords) {
                // Extract the raw string from the CSV
                String interestRateStr = loanRecord.get("interestRate");

                // Remove the percentage symbol and whitespace
                interestRateStr = interestRateStr.replaceAll("[%\\s]+", "");

                // Convert the modified string to a Double
                Double interestRate = Double.parseDouble(interestRateStr);

                Loan loanObj = new Loan(
                        Long.parseLong(loanRecord.get("loanID")),
                        Long.parseLong(loanRecord.get("customerID")),
                        Long.parseLong(loanRecord.get("branchID")),
                        Double.parseDouble(loanRecord.get("loanAmount")),
                        loanRecord.get("loanType"),
                        interestRate, // Use the modified Double value
                        loanRecord.get("term"),
                        loanRecord.get("status")
                );

                loan.add(loanObj);
            }


            return loan;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }
}
