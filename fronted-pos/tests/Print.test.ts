import { test, expect } from '@playwright/test';

// Definir el nombre del archivo PDF esperado según la fecha de la boleta
const expectedFileName = `boleta-venta-2024-06-25.pdf`;

test('Generar boleta de venta y verificar archivo PDF', async ({ page }) => {
  // Navegar a la página donde se encuentra el componente InvoicePdf
  await page.goto('http://localhost:5173/sales'); // Ajusta la URL según la configuración de tu entorno local

  // Hacer clic en el botón "Generar Boleta de Venta"
  await page.click('text="Generar Boleta de Venta"', { timeout: 70000 });

  // Esperar a que se genere el archivo PDF (tiempo suficiente para la descarga)
  await page.waitForTimeout(2000); // Ajusta el tiempo según la velocidad de generación y descarga del PDF

  // Verificar si el archivo PDF se ha descargado correctamente
  const isPDFDownloaded = await page.locator(`text="${expectedFileName}"`).isVisible();

  // Afirmar que el archivo PDF se ha descargado correctamente
  expect(isPDFDownloaded).toBeTruthy();
});