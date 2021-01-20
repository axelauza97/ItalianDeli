import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { HomePage } from '../pages/home/home';
import { RegistroPage } from '../pages/registro/registro';
import { LoginPage } from '../pages/login/login';
import { InicioPage } from '../pages/inicio/inicio';
import { PerfilPage } from '../pages/perfil/perfil';
import { PerfilEditarPage } from '../pages/perfil-editar/perfil-editar';
import { RegistroFormPage } from '../pages/registro-form/registro-form';
import { TradicionalesPage } from '../pages/tradicionales/tradicionales';
import { FavoritasPage } from '../pages/favoritas/favoritas';
import { RegistroSocialPage } from '../pages/registro-social/registro-social';
import { CrearPizzaPage } from '../pages/crear-pizza/crear-pizza';
import { MasasPage } from '../pages/masas/masas';
import { BordesPage } from '../pages/bordes/bordes';
import { IngredientesPage } from '../pages/ingredientes/ingredientes';
import { AdicionalesPage } from '../pages/adicionales/adicionales';
import { BebidasPage } from '../pages/bebidas/bebidas';
import { CuponesPage } from '../pages/cupones/cupones';
import { AcompanantesPage } from '../pages/acompanantes/acompanantes';
import { CombinacionesPage } from '../pages/combinaciones/combinaciones';
import { TrackingPizzaPage } from '../pages/tracking-pizza/tracking-pizza';
import { CarritoPage } from '../pages/carrito/carrito';
import { ComboPage } from '../pages/combo/combo';
import { DetalleComboPage } from '../pages/detalle-combo/detalle-combo';
import { SetUbicationPage } from '../pages/set-ubication/set-ubication';
import { ListUbicationPage } from '../pages/list-ubication/list-ubication';
import { ListLocalesPage } from '../pages/list-locales/list-locales';
import { ViewMapPage } from '../pages/view-map/view-map';
import { ReclamosSugerenciasPage } from '../pages/reclamos-sugerencias/reclamos-sugerencias';
import { ListaPedidosPage } from '../pages/lista-pedidos/lista-pedidos';
import { PizzaUnoPage } from '../pages/pizza-uno/pizza-uno';
import { PizzaDosPage } from '../pages/pizza-dos/pizza-dos';
import { PizzaTresPage } from '../pages/pizza-tres/pizza-tres';
import { PizzaCuatroPage } from '../pages/pizza-cuatro/pizza-cuatro';
import { IngredientesPromoPage } from '../pages/ingredientes-promo/ingredientes-promo';
import { DetallePromocionalPage } from '../pages/detalle-promocional/detalle-promocional';
import { SeleccionMetodoPagoPage } from '../pages/seleccion-metodo-pago/seleccion-metodo-pago';
import { CarteraTarjetasPage } from '../pages/cartera-tarjetas/cartera-tarjetas';
import { ResumenDePagoPage } from '../pages/resumen-de-pago/resumen-de-pago';
import { CheckoutPage } from '../pages/checkout/checkout';
import { CarritoPPage } from '../pages/carritoP/carritoP';
import { ValoresPage } from '../pages/valores/valores'
import { HistorialPage } from '../pages/historial/historial';
import { IrregularidadesPage } from '../pages/irregularidades/irregularidades';
import { PedidoEstadoPage } from '../pages/pedido-estado/pedido-estado';
import { PedidoPage } from '../pages/pedido/pedido';
import { PedidoDetallesPage } from '../pages/pedido-detalles/pedido-detalles';
import { FormaEntregaPage } from '../pages/forma-entrega/forma-entrega';
import { SalaChatPage } from '../pages/sala-chat/sala-chat';
import { FormaPagoPage } from '../pages/forma-pago/forma-pago';
import { PromoMarViePage } from '../pages/promo-mar-vie/promo-mar-vie';
import { JuegosPage } from '../pages/Juegos/juegos';
import { ContactanosPage } from '../pages/contactanos/contactanos';
import { ComboNuevoPage } from '../pages/combonuevo/combonuevo';
import { PizzaComboNuevoPage } from '../pages/pizza-combonuevo/pizza-combonuevo';
import { PizzaComboNuevoDosPage } from '../pages/pizza-combonuevoDos/pizza-combonuevoDos';
import { tradicionalPopUpPage } from '../pages/tradicionalPopUp/tradicionalPopUp';
import { AvisoPage } from '../pages/aviso/aviso';
import { EspecialesPage } from '../pages/especiales/especiales';
import { PizzaComboEspecialPage } from '../pages/pizza-comboEspecial/pizza-comboEspecial';
import { PizzaComboEspecialDosPage } from '../pages/pizza-comboEspecialDos/pizza-comboEspecialDos';
import { PizzaComboEspecialTresPage } from '../pages/pizza-comboEspecialTres/pizza-comboEspecialTres';
import { PizzaComboEspecialCuatroPage } from '../pages/pizza-comboEspecialCuatro/pizza-comboEspecialCuatro';
import { PizzaComboEspecialCincoPage } from '../pages/pizza-comboEspecialCinco/pizza-comboEspecialCinco';
import { notificacionPopUpPage } from '../pages/notificacionPopUp/notificacionPopUp';
@NgModule({
  declarations: [
    HomePage,
    CrearPizzaPage,
    InicioPage,
    RegistroPage,
    PerfilEditarPage,
    PerfilPage,
    LoginPage,
    RegistroFormPage,
    TradicionalesPage,
    FavoritasPage,
    PizzaComboEspecialPage,
    RegistroSocialPage,
    MasasPage,
    BordesPage,
    IngredientesPage,
    AdicionalesPage,
    BebidasPage,
    CuponesPage,
    AcompanantesPage,
    JuegosPage,
    CombinacionesPage,
    TrackingPizzaPage,
    CarritoPage,
    ComboPage,
    EspecialesPage,
    ComboNuevoPage,
    ContactanosPage,
    DetalleComboPage,
    SetUbicationPage,
    ListUbicationPage,
    ViewMapPage,
    ReclamosSugerenciasPage,
    ListaPedidosPage,
    PedidoEstadoPage,
    PedidoPage,
    PedidoDetallesPage,
    FormaEntregaPage,
    SalaChatPage,
    FormaPagoPage,
    ListLocalesPage,
    SeleccionMetodoPagoPage,
    CarritoPPage,
    CheckoutPage,
    CarteraTarjetasPage,
    ValoresPage,
    HistorialPage,
    ResumenDePagoPage,
    IrregularidadesPage,
    PizzaComboNuevoPage,
    PizzaUnoPage,
    PizzaDosPage,
    PizzaTresPage,
    PizzaCuatroPage,
    PizzaComboNuevoDosPage,
    IngredientesPromoPage,
    DetallePromocionalPage,
    notificacionPopUpPage,
    PizzaComboEspecialDosPage,
    PizzaComboEspecialTresPage,
    PizzaComboEspecialCuatroPage,
    PizzaComboEspecialCincoPage,
    PromoMarViePage,
    tradicionalPopUpPage,
    AvisoPage,
  ],
  //bootstrap: [IonicApp],
  imports: [
    IonicPageModule,
    BrMaskerModule
  ],
  entryComponents: [
    HomePage,
    CrearPizzaPage,
    InicioPage,
    RegistroPage,
    PerfilEditarPage,
    PerfilPage,
    LoginPage,
    PizzaComboEspecialPage,
    RegistroFormPage,
    TradicionalesPage,
    FavoritasPage,
    RegistroSocialPage,
    MasasPage,
    BordesPage,
    IngredientesPage,
    AdicionalesPage,
    BebidasPage,
    EspecialesPage,
    CuponesPage,
    AcompanantesPage,
    JuegosPage,
    CombinacionesPage,
    ContactanosPage,
    TrackingPizzaPage,
    CarritoPage,
    ComboPage,
    ComboNuevoPage,
    DetalleComboPage,
    SetUbicationPage,
    ListUbicationPage,
    ViewMapPage,
    ReclamosSugerenciasPage,
    ListaPedidosPage,
    PedidoEstadoPage,
    PizzaComboNuevoPage,
    PedidoPage,
    PizzaComboNuevoDosPage,
    PedidoDetallesPage,
    FormaEntregaPage,
    SalaChatPage,
    FormaPagoPage,
    ListLocalesPage,
    SeleccionMetodoPagoPage,
    CarritoPPage,
    CheckoutPage,
    CarteraTarjetasPage,
    ValoresPage,
    HistorialPage,
    ResumenDePagoPage,
    IrregularidadesPage,
    PizzaUnoPage,
    PizzaDosPage,
    PizzaTresPage,
    PizzaCuatroPage,
    IngredientesPromoPage,
    DetallePromocionalPage,
    PizzaComboEspecialDosPage,
    PizzaComboEspecialTresPage,
    PizzaComboEspecialCuatroPage,
    PizzaComboEspecialCincoPage,
    PromoMarViePage,
    notificacionPopUpPage,
    tradicionalPopUpPage,
    AvisoPage,
  ],
})
export class SharedModule { }
