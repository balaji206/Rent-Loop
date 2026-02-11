package com.rentloop.demo.controller;
import com.rentloop.demo.repository.ProductRepository;
import com.rentloop.demo.entity.Product;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @PostMapping
    public Product createProduct(@RequestBody Product product)
    {
        productRepository.save(product);
        return product;
    }

    private final ProductRepository productRepository;
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    @GetMapping
    public List<Product> getAllProducts()
    {
       return productRepository.findAll();
    }


}
