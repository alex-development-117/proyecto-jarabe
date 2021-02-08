import {inject} from '@loopback/core';
import {
  HttpErrors,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {UploadFilesKeys} from '../keys/upload-files-keys';

export class FileUploadController {
  constructor() {}

  @post('/imagenes/productos', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Imagenes de los productos',
      },
    },
  })
  async imagenProductoUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const productsImagePath = path.join(
      __dirname,
      UploadFilesKeys.PRODUCT_IMAGE_PATH,
    );
    let res = await this.StorageFileToPath(
      productsImagePath,
      UploadFilesKeys.PRODUCT_IMAGE_FIELDNAME,
      request,
      response,
      UploadFilesKeys.IMAGE_ACCEPT_EXT,
    );
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  // Las funciones para poder subir los archivos

  private GetMulterStorageConfig(path: string) {
    let filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },
      filename: function (req, file, cb) {
        filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    });
    return storage;
  }

  private StorageFileToPath(
    storePath: string,
    fieldname: string,
    request: Request,
    response: Response,
    acceptedExt: string[],
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(
            new HttpErrors[400]('Este formato de atrchivo no es valido'),
          );
        },
        limits: {
          fileSize: UploadFilesKeys.MAX_FILE_SIZE,
        },
      }).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }
}
