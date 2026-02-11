package com.rentloop.demo.controller;

import com.rentloop.demo.dto.SignupRequest;
import com.rentloop.demo.dto.LoginRequest;
import com.rentloop.demo.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")

public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService)
    {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request)
    {
        String msg = authService.signup(
            request.getEmail(),
            request.getPassword(),
            request.getPhone()
        );

        return ResponseEntity.ok(Map.of("success",true,"Message",msg));
    }

     @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody LoginRequest request)
    {
        String token = authService.login(
            request.getEmail(),
            request.getPassword()
        );

        return ResponseEntity.ok(Map.of("success",true,"Token",token));
    }
}