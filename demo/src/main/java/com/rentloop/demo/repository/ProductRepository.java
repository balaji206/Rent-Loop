package com.rentloop.demo.repository;
import jakarta.persistence.Entity;

import com.rentloop.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long>{

    
}
