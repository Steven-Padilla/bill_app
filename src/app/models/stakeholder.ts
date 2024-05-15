export class Stakeholder {
  id:number;
  name:string;
  rfc:string;
  type:string;

  constructor(_id:number, _name:string, _rfc:string,_type:string){
    this.id=_id;
    this.name=_name;
    this.rfc=_rfc;
    this.type=_type;
  }

}
