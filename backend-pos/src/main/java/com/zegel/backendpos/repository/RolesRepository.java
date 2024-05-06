package com.zegel.backendpos.repository;

import com.zegel.backendpos.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {
    //Metodo para buscar un rol por su nombre en nuestra base de datos
    Optional<Roles> findByName(String name);
}
