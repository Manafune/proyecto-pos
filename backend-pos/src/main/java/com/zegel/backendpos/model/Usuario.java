package com.zegel.backendpos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    @Column(unique = true)
    private String DNI;
    private String username;
    private String password;
    private String nombres;
    private String apellidos;
    private String rol;

    public Usuario() {

    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getDNI() {
        return DNI;
    }

    public void setDNI(String DNI) {
        this.DNI = DNI;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Usuario(Long ID, String DNI, String username, String password, String nombres, String apellidos, String rol) {
        this.ID = ID;
        this.DNI = DNI;
        this.username = username;
        this.password = password;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.rol = rol;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "ID=" + ID +
                ", DNI='" + DNI + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", nombres='" + nombres + '\'' +
                ", apellidos='" + apellidos + '\'' +
                ", rol='" + rol + '\'' +
                '}';
    }
}
