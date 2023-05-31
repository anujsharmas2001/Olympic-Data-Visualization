package com.example.demo.services.CustomerService;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerDao;
import com.example.demo.entities.Customer;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDao customerDao;
		
		public CustomerServiceImpl() {
			
		}

		@Override
		public List<Customer> getCustomers() {
			return customerDao.findAll();
		}
		
		@SuppressWarnings("deprecation")
		public Customer getCustomer(long customerId) {

			
			return customerDao.getOne(customerId);
		}

		@Override
		public Customer addCustomer(Customer customer) {
			// TODO Auto-generated method stub
//			list.add(product);
			customerDao.save(customer);
			return customer;
		}
		
		
		@Override
		public void deleteCustomer(long parseLong) {
//			list=this.list.stream().filter(e -> e.getId()!=parseLong).collect(Collectors.toList());
		   
			@SuppressWarnings("deprecation")
			Customer entity = customerDao.getOne(parseLong);
			customerDao.delete(entity);
		}

		@Override
		public Customer updateCustomer(Customer customer) {
			// TODO Auto-generated method stub
			customerDao.save(customer);
			return customer;
		}

		
		


}
