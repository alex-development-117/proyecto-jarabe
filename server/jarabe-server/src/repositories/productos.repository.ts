import {DefaultCrudRepository} from '@loopback/repository';
import {Productos, ProductosRelations} from '../models';
import {MySqlDatasourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id_producto,
  ProductosRelations
> {
  constructor(
    @inject('datasources.MySqlDatasource') dataSource: MySqlDatasourceDataSource,
  ) {
    super(Productos, dataSource);
  }
}
