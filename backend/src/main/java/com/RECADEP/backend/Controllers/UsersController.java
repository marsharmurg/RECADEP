package com.RECADEP.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import java.util.Optional;

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
    /*//Seccion para buscar usuario por email y validar si existe en la base de datos local por creacion de cuenta con Auth0
    @GetMapping("/by-email")
    public Users findByEmail(@RequestParam String email) {
        return usersRepository.findByEmail(email);
    }

    @PostMapping("/sync")
    public ResponseEntity<?> sync(@AuthenticationPrincipal Jwt principal) {
        String correo = principal.getClaim("email");

        Users existente = usersRepository.findByEmail(correo);
        if (existente == null) {
            Users nuevo = new Users();
            nuevo.setEmail(correo);
            nuevo.setPerfilCompleto(false);//Crear usuario con perfil incompleto en la base de datos local
            createUsers(nuevo);
        }

        return ResponseEntity.ok().build();
    }*/

    
}
