package com.zegel.backendpos.model;

import jakarta.persistence.*;

@Entity
public class DetalleVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_venta")
    private Venta venta;
    @ManyToOne
    @JoinColumn(name = "id_producto")
    private Producto producto;
    private int cantidadVendida;
    private Double precioUnitario;

    public DetalleVenta(Long id, Venta venta, Producto producto, int cantidadVendida, Double precioUnitario) {
        this.id = id;
        this.venta = venta;
        this.producto = producto;
        this.cantidadVendida = cantidadVendida;
        this.precioUnitario = precioUnitario;
    }

    public DetalleVenta() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public int getCantidadVendida() {
        return cantidadVendida;
    }

    public void setCantidadVendida(int cantidadVendida) {
        this.cantidadVendida = cantidadVendida;
    }

    public Double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(Double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    @Override
    public String toString() {
        return "DetalleVenta{" +
                "id=" + id +
                ", venta=" + venta +
                ", producto=" + producto +
                ", cantidadVendida=" + cantidadVendida +
                ", precioUnitario=" + precioUnitario +
                '}';
    }
}
