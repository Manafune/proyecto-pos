package com.zegel.backendpos.model;

import jakarta.persistence.*;

import java.sql.Timestamp;


@Entity
@Table(name="ventas")
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    private Timestamp fechaHoraVenta;
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;
    private Double totalVenta;

    public Venta(Long ID, Timestamp fechaHoraVenta, Usuario usuario, Cliente cliente, Double totalVenta) {
        this.ID = ID;
        this.fechaHoraVenta = fechaHoraVenta;
        this.usuario = usuario;
        this.cliente = cliente;
        this.totalVenta = totalVenta;
    }

    public Venta() {

    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public Timestamp getFechaHoraVenta() {
        return fechaHoraVenta;
    }

    public void setFechaHoraVenta(Timestamp fechaHoraVenta) {
        this.fechaHoraVenta = fechaHoraVenta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Double getTotalVenta() {
        return totalVenta;
    }

    public void setTotalVenta(Double totalVenta) {
        this.totalVenta = totalVenta;
    }

    @Override
    public String toString() {
        return "Venta{" +
                "ID=" + ID +
                ", fechaHoraVenta=" + fechaHoraVenta +
                ", usuario=" + usuario +
                ", cliente=" + cliente +
                ", totalVenta=" + totalVenta +
                '}';
    }
}
