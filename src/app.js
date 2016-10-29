import { name, version } from '../package.json';


angular.module( 'ui-theoria', ['ngMaterial'] );
angular.module( 'ui-theoria' ).controller( 'AppController', AppController );

function AppController( $log ) {
  let vm = this;

  $log.info( name, version );

  vm.name = name;
  vm.version = version;
}
