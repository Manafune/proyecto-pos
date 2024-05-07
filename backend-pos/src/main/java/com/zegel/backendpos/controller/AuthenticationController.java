package com.zegel.backendpos.controller;

import com.zegel.backendpos.dto.DtoAuthRespuesta;
import com.zegel.backendpos.dto.DtoLogin;
import com.zegel.backendpos.dto.DtoRegistro;
import com.zegel.backendpos.model.Roles;
import com.zegel.backendpos.model.Usuario;
import com.zegel.backendpos.repository.RolesRepository;
import com.zegel.backendpos.repository.UsuarioRepository;
import com.zegel.backendpos.security.JwtGeneradorToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth/")
public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private UsuarioRepository usuarioRepository;
    private RolesRepository rolesRepository;
    private JwtGeneradorToken jwtGeneradorToken;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UsuarioRepository usuarioRepository, RolesRepository rolesRepository, JwtGeneradorToken jwtGeneradorToken) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.usuarioRepository = usuarioRepository;
        this.rolesRepository = rolesRepository;
        this.jwtGeneradorToken = jwtGeneradorToken;
    }

    //Metodo para registrar usuarios con role user
    @PostMapping("registro")
    public ResponseEntity<String> registrar(@RequestBody DtoRegistro dtoRegistro){
        if(usuarioRepository.existsByUsername((dtoRegistro.getUsername()))){
            return new ResponseEntity<>("El usuario ya existe, intenta con otro", HttpStatus.BAD_REQUEST);
        }
        Usuario usuario = new Usuario();
        usuario.setUsername(dtoRegistro.getUsername());
        usuario.setPassword(passwordEncoder.encode(dtoRegistro.getPassword()));
        usuario.setNombreCompleto(dtoRegistro.getNombreCompleto());
        usuario.setDni(dtoRegistro.getDni());
        Roles roles = rolesRepository.findByName("USER").get();
        usuario.setRoles(Collections.singletonList(roles));
        usuarioRepository.save(usuario);
        return new ResponseEntity<>("Registro de usuario exitoso", HttpStatus.OK);
    }

    @PostMapping("registroAdm")
    public ResponseEntity<String> registrarAdmin(@RequestBody DtoRegistro dtoRegistro){
        if(usuarioRepository.existsByUsername((dtoRegistro.getUsername()))){
            return new ResponseEntity<>("El usuario ya existe, intenta con otro", HttpStatus.BAD_REQUEST);
        }
        Usuario usuario = new Usuario();
        usuario.setUsername(dtoRegistro.getUsername());
        usuario.setPassword(passwordEncoder.encode(dtoRegistro.getPassword()));
        usuario.setNombreCompleto(dtoRegistro.getNombreCompleto());
        usuario.setDni(dtoRegistro.getDni());
        Roles roles = rolesRepository.findByName("ADMIN").get();
        usuario.setRoles(Collections.singletonList(roles));
        usuarioRepository.save(usuario);
        return new ResponseEntity<>("Registro de Administrador exitoso", HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<DtoAuthRespuesta> login(@RequestBody DtoLogin dtoLogin){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dtoLogin.getUsername(), dtoLogin.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGeneradorToken.generarToken(authentication);
        return new ResponseEntity<>(new DtoAuthRespuesta(token), HttpStatus.OK);
    }
}
