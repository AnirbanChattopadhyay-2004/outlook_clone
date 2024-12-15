export interface Mailtype{
  id:string,
  from:{
    email:string,
    name:string
  },
  date:number,
  subject:string,
  short_description:string
}
export interface Mailbodytype{
  id:string,
  body:string
}