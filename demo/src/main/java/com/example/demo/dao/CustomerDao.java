package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Customer;

public interface CustomerDao extends JpaRepository<Customer,Long>{
	

}
