package com.zegel.backendpos.repository;

import com.zegel.backendpos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
}
