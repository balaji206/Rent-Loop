package com.rentloop.demo.dto;

public class SignupRequest {

    private String email;
    private String password;
    private String phone;

    // GETTERS
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    // SETTERS
    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
