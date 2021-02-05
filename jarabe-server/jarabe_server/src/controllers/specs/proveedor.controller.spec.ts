export declare const CredentialsSchema: {
  type: 'object';
  required: ['nombre_cuenta', 'passwd_cuenta'];
  properties: {
    nombre_cuenta: {
      type: 'string';
    };
    passwd_cuenta: {
      type: 'string';
      minLenght: 8;
    };
  };
};

export const CredentialsRequestBody = {};
