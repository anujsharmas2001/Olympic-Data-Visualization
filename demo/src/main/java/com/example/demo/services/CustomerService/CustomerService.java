package com.example.demo.services.CustomerService;
import java.util.List;

import com.example.demo.entities.Customer;

public interface CustomerService {

	public List<Customer> getCustomers();

	public Customer getCustomer(long customerId);
	public Customer addCustomer(Customer customer);

	public Customer updateCustomer(Customer customer);

	public void deleteCustomer(long parseLong);

}