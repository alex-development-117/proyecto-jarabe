import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proveedor, ProveedorRelations} from '../models';

export type Credentials = {
  nombre_cuenta: string;
  passwd_cuenta: string;
};

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id_proveedor,
  ProveedorRelations
> {
  constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
    super(Proveedor, dataSource);
  }
}
