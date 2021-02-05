import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MySqlDatasourceDataSource} from '../datasources';
import {Precios, Proveedor, ProveedorRelations} from '../models';
import {PreciosRepository} from './precios.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id_proveedor,
  ProveedorRelations
> {
  public readonly precios: HasManyRepositoryFactory<
    Precios,
    typeof Proveedor.prototype.id_proveedor
  >;

  constructor(
    @inject('datasources.MySqlDatasource')
    dataSource: MySqlDatasourceDataSource,
    @repository.getter('PreciosRepository')
    protected preciosRepositoryGetter: Getter<PreciosRepository>,
  ) {
    super(Proveedor, dataSource);
    this.precios = this.createHasManyRepositoryFactoryFor(
      'precios',
      preciosRepositoryGetter,
    );
    this.registerInclusionResolver('precios', this.precios.inclusionResolver);
  }
}

export interface Credentials {
  nombre_cuenta: string;
  passwd_cuenta: string;
}
