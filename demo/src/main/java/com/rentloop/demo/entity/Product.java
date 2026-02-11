package com.rentloop.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
@Table(name = "products")
public class Product{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

     @Column(nullable = false)
    private String category;

     @Column(nullable = false)
    private String availability;

     @Column(nullable = false)
    private java.math.BigDecimal deposit;

    @Column(nullable = false)
    private java.math.BigDecimal pricePerDay;

    private String imageUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public java.math.BigDecimal getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(java.math.BigDecimal pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String isAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public java.math.BigDecimal getDeposit() {
        return deposit;
    }

    public void setDeposit(java.math.BigDecimal deposit) {
        this.deposit = deposit;
    }



}