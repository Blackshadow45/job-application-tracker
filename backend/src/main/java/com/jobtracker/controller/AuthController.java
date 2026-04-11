package com.jobtracker.controller;

import com.jobtracker.model.User;
import com.jobtracker.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.Optional;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.jobtracker.dto.LoginRequest;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){

        Optional<User> existing = userRepository.findByEmail(user.getEmail());

        if(existing.isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("User already exists");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    // LOGIN
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request){

    Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

    if(optionalUser.isEmpty()){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message","User not found"));
    }

    User user = optionalUser.get();

    if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message","Invalid credentials"));
    }

    return ResponseEntity.ok(Map.of(
            "message","Login successful",
            "userId", user.getId()
    ));
}
}