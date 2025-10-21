package com.RECADEP.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.RECADEP.backend.Entitys.Users;
import com.RECADEP.backend.Repositories.UsersRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UsersController {
    @Autowired
    private UsersRepository usersRepository;

    @GetMapping
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @GetMapping("/{id}")
    public Users getUsers(@PathVariable Long id) {
        return usersRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Users createUsers(@RequestBody Users users) {
        return usersRepository.save(users);
    }

    @PutMapping("/{id}")
    public Users updateUsers(@PathVariable Long id, @RequestBody Users users) {

        users.setUsersId(id);
        return usersRepository.save(users);
    }

    @DeleteMapping("/{id}")
    public void deleteUsers(@PathVariable Long id) {
        usersRepository.deleteById(id);
    }
}
