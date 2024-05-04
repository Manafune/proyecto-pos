package com.zegel.backendpos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    @Column(unique = true)
    private String DNI;
    private String nombre;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String telefono;

    public Cliente(Long ID, String DNI, String nombre, String email, String telefono) {
        this.ID = ID;
        this.DNI = DNI;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
    }

    public Cliente() {

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

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "ID=" + ID +
                ", DNI='" + DNI + '\'' +
                ", nombre='" + nombre + '\'' +
                ", email='" + email + '\'' +
                ", telefono='" + telefono + '\'' +
                '}';
    }
}
