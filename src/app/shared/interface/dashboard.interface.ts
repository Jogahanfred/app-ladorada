export interface Dashboard {
  platoMasVendido: {
    nombre: string;
    cantidadVendida: number;
  };
  platoMenosVendido: {
    nombre: string;
    cantidadVendida: number;
  };
  totalPlatosVendidos: {
    cantidad: number;
  };
  cantidadSuscriptores: number;
  anio: number;
  mes: number;
}
