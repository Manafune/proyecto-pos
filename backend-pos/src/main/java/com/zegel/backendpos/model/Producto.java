package com.zegel.backendpos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer Stock;

    public Producto(Long ID, String nombre, String descripcion, Double precio, Integer stock) {
        this.ID = ID;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        Stock = stock;
    }

    public Producto() {

    }

    @Override
    public String toString() {
        return "Producto{" +
                "ID=" + ID +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", precio=" + precio +
                ", Stock=" + Stock +
                '}';
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return Stock;
    }

    public void setStock(Integer stock) {
        Stock = stock;
    }
}
