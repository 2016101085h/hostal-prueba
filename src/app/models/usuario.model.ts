import { environment } from '../../environments/environment';

// tslint:disable-next-line: variable-name
const base_url = 'https://morning-hamlet-19390.herokuapp.com/img/usuarios';
export class Usuario {
  constructor(
    public nombre: string,
    // tslint:disable-next-line: variable-name
    public num_documento: string,
    public celular: string,
    // tslint:disable-next-line: variable-name
    public rol_id: number,
    public imagen: string,
    public email: string,
    public id?: number,
    public rol?: string,
    public password?: string

  ){}
  // tslint:disable-next-line: typedef
  get imgUrl(){
    if (this.imagen) {
      return `${base_url}/${this.imagen}`;
    }else{
      return `${base_url}/usuario-no-image.jpg`;
    }
  }
}
