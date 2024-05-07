package com.zegel.backendpos.repository;

import com.zegel.backendpos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    //Buscar usuario en base de datos
    Optional<Usuario> findByUsername(String username);
    //Metodo para poder verificar si un usuario existe en la base de datos
    Boolean existsByUsername(String username);
}
