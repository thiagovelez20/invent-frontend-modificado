import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './components/ui/Header';
import { EstadoView } from './components/estados/EstadoView';
import { InventarioView } from './components/inventarios/InventarioView';
import { MarcaView } from './components/marcas/MarcaView';
import { TipoView } from './components/tipos/TipoView';
import { UsuarioView } from './components/usuarios/UsuarioView';
import { InventarioUpdate } from './components/inventarios/InventarioUpdate';
import { UsuarUpdate } from './components/usuarios/UsuarUpdate'; // importacion del componente usuarUpdate
import { MarcaspUpdate } from './components/marcas/MarcaspUpdate';
import { TiposUpdate } from './components/tipos/TiposUpdate';
import { EstadosUpdate } from './components/estados/EstadosUpdate';

const App = () => {
  return <Router>
    <Header />
    <Switch>
          <Route exact path='/' component={ InventarioView } />
          <Route exact path='/usuarios' component={ UsuarioView } />
          <Route exact path='/marcas' component={ MarcaView } />
          <Route exact path='/tipos' component={ TipoView } />
          <Route exact path='/estados' component={ EstadoView } />
          <Route exact path='/inventarios/edit/:inventarioId' component={ InventarioUpdate } />
          <Route exact path='/usuarios/edit/:usuarioId' component={ UsuarUpdate } /> {/*componente de renderizado, se crea en la carpeta usuarios */}
          <Route exact path='/marcas/edit/:marcaid' component={ MarcaspUpdate } /> 
          <Route exact path='/tipos/edit/:tipoid' component={ TiposUpdate } />
          <Route exact path='/estados/edit/:estadoid' component={ EstadosUpdate } />
          <Redirect to='/' />
    </Switch>
  </Router>
}
export {
  App
}
