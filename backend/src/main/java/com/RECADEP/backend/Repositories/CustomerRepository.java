package com.RECADEP.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RECADEP.backend.Entitys.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{

}
