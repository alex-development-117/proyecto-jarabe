import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Precios, PreciosRelations, Proveedor} from '../models';
import {MySqlDatasourceDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProveedorRepository} from './proveedor.repository';

export class PreciosRepository extends DefaultCrudRepository<
  Precios,
  typeof Precios.prototype.id_precio,
  PreciosRelations
> {

  public readonly precios: BelongsToAccessor<Proveedor, typeof Precios.prototype.id_precio>;

  constructor(
    @inject('datasources.MySqlDatasource') dataSource: MySqlDatasourceDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Precios, dataSource);
    this.precios = this.createBelongsToAccessorFor('precios', proveedorRepositoryGetter,);
    this.registerInclusionResolver('precios', this.precios.inclusionResolver);
  }
}
