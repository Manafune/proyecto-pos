import { test, expect } from '@playwright/test';


test('Renderización de SalesAdd', async ({ page }) => {
    await page.goto('http://localhost:5173/sales/add?pageSize=9&current=1'); // Ajusta la ruta según la estructura de tu aplicación
    await page.waitForSelector('h2');
    const tituloVentas = await page.innerText('h2');
  
    expect(tituloVentas).toBe('Ventas');
    // Agrega más expectativas según sea necesario
  });

// test('Renderización correcta de SalesAdd', async ({ page }) => {



    // // Esperar a que el título "Ventas" esté presente
    // await page.waitForSelector('h2');
    // const tituloVentas = await page.innerText('h2');
    // expect(tituloVentas).toBe('Ventas');

    // // Esperar a que el input para buscar cliente por DNI esté presente
    // const inputDNI = await page.waitForSelector('input[name=dni]');
    // expect(inputDNI).not.toBeNull();

    // // Esperar a que el botón para buscar cliente por DNI esté presente
    // const botonBuscarCliente = await page.waitForSelector('button:has-text("Buscar")');
    // expect(botonBuscarCliente).not.toBeNull();

    // // Esperar a que la tabla de productos esté presente
    // const tablaProductos = await page.waitForSelector('table');
    // expect(tablaProductos).not.toBeNull();

    // // Esperar a que el botón para generar la venta esté presente
    // const botonGenerarVenta = await page.waitForSelector('button:has-text("Generar Venta")');
    // expect(botonGenerarVenta).not.toBeNull();

    // // Esperar a que el botón para cancelar la venta esté presente
    // const botonCancelarVenta = await page.waitForSelector('button:has-text("Cancelar")');
    // expect(botonCancelarVenta).not.toBeNull();
// });