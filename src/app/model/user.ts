export class User {
   id:number=0;
   username :string = "";
   firstName :string = "";
   lastName :string = "";
   password :string = "";
   mobile : string = "";
   profile: string = "";
   followerCount: number = 0;
   followingCount: number = 0;
   accountVerified: boolean = true;
   emailVerified: boolean = true;
   enabled: boolean = true;
   birthDate: Date = new Date();
   joinDate: Date = new Date();
   dateLastModified : Date = new Date();
   followerUsers : any[] = [];
   followingUsers: any[] = [];
   userRoles: any[] = [];
}
