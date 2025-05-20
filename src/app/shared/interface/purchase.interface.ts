export interface Purchase {
  Fe_fecha_compra: string;              
  Ss_total_items: number;              
  Ss_descuento: number;                 
  Ss_subtotal: number;                 
  Ss_envio: number;                    
  Ss_impuesto: number;                 
  Qt_cantidad_items: number;            
  Tx_estado: string;                   
  Ss_total_compra: number;              
  DetallesCompra: DetailPurchase[];      
}

export interface DetailPurchase {
  No_producto_id: number;            
  Tx_nombre_producto: string;         
  Qt_cantidad: number;                 
  Ss_precio_unitario: number;        
  Ss_descuento_producto: number;       
  Ss_subtotal: number;                  
  Ss_total: number;                     
}
