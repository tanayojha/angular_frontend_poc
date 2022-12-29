import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { UserJob } from 'src/app/model/user-job';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Author } from 'src/app/model/author';
import { Comment } from 'src/app/model/comment';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { FollowUser } from 'src/app/model/follow-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fade',
      [
        state('void', style({ opacity: 0 })),
        transition(':enter', [animate(300)]),
        transition(':leave', [animate(500)]),
      ]
    )]
})
export class HomeComponent implements OnInit {

  //Data Members
  textAreaComment: string = '';
  likeCount: number = 0;
  flag: boolean = false;
  isLoggedIn = true;
  userid: number = 0;
  firstName: string = "";
  lastName: String = "";
  content: string = "";
  post_id: number = 0;
  user_id: number = 0;
  userimg: string = '';
  username: string = '';
  showCmtBox: boolean = false;

  base64Output: string | undefined;

  //Classes
  comment!: Comment;
  post: Post = new Post();
  @Input()
  user: User = new User();
  followUser: FollowUser = new FollowUser();
  userJob: UserJob = new UserJob();
  author: Author = new Author();
  postList: Post[] = [];

  userList: User[] = [];
  postComments: Comment[] = [];
  response_user: User[] = [];
  response_post: Post[] = [];
  updatedList: User[] = [];
  follow_user: number = 0;


  @Output() toggle = new EventEmitter<boolean>();
  //for clicking button follow
  isSubmitting = false;





  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService) {
  }


  ngOnInit(): void {
    //calling Get User Details API 
    this.getCurrentUserInfo();

    console.log(" Current user Id->  ", this.user);
    console.log('home-compo.ts->');
    console.log(this.isLoggedIn);

    //this.firstName = JSON.parse(this.storage.get('user') || '{}').user.firstName;
    //this.lastName = JSON.parse(this.storage.get('user') || '{}').user.lastName;

    //calling Get API of ALL POST List
    this.getPostOfAllUser();
    //calling Get API of ALL USER List
    this.getAllUserList();
  }

  //for getting display all users of YashTalks
  getAllUserList() {
    //NOTE: Please implemention List validation
    this.userService.getAllUserList().subscribe(res => {
      this.response_user = res['response'];

      console.log("getAllUserList() -> List of all users --> ", this.response_user);
      console.log("getAllUserList() -> follow_user status --> ", this.follow_user);

      this.updatedList = this.response_user.filter(user => user.id != this.user.id);//value.includes(x.GroupId)
      console.log("getAllUserList() -> List of all users --> ", this.updatedList);
    });
  }

  //For user details
  getCurrentUserInfo() {
    this.loginService.getCurrentUser().subscribe((data: any) => {
      this.user = data;
      console.log("getCurrentUserInfo() -> USer data--> ", this.user);
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.userimg = this.user.profile;
    })
  }

  //For show LoggedIN User  
  getPostOfUser(post: Post) {
    this.postService.getPostOfUser(post).subscribe((data: any) => {
      this.content = data;
      console.log("getPostOfUser() -> Get Post of LoggedIn User --> ", this.content);
    })
  }

  //For Get Posts of All Users
  getPostOfAllUser() {
    this.postService.getPostOfAllUsers().subscribe(res => {
      this.postList = res['response'];
      console.log("getPostOfAllUser() -> Post of all users --> ", this.postList);
    });
  }

  //For Adding Post in Timeline
  addPost(post: Post) {
    //console.log("inside home " + JSON.parse(this.storage.get('user') || '{}').User.username);
    //console.log("inside home " + JSON.parse(this.storage.get('user') || '{}').User.id);
    this.postService.addPost(post).subscribe((res: any) => {
      if (res.status == 200) {
        this.post = res.response;
        console.log("Add post() data-> ", this.post);
        if (this.post.id > 0) {
          this.post.content = '';
          this.getPostOfAllUser();
        }
      }
    });
  }


  //For Adding Comments in Post
  textAreaEmpty(post_id: number, textAreaComment: string) {
    console.log("Post Id->", post_id);
    console.log("POST Par comment->", textAreaComment);
    //Calling Add comments Api
    this.addComments(post_id, textAreaComment);
    //Reset Comment
    this.reset()
  }

  //For Adding Comments in User Post
  addComments(post_id: number, textAreaComment: string) {
    this.postService.addComments(post_id, textAreaComment).subscribe((res: any) => {
      if (res.status == 200) {
        this.comment = res.response;
        console.log("Add comments() data-> ", this.comment);
        if (this.comment.id > 0) {
          this.getPostOfAllUser();
        }
      }
    });
  }

  //For reset comment blank in Post
  reset() {
    this.textAreaComment = '';
  }

   //For Geeting Comments List on a Post
   getPostComments(post_id: number) {
    this.postService.getPostComments(post_id).subscribe((data: any) => {
      this.postComments = data;
      console.log("getPostComments()-> ", this.postComments);
    });
  }

  //utility method for managing boolean var
  showComentBx() {
    this.showCmtBox = true;
  }


  //For Follow or Unfollow any user from Userlist
  toggleFollowing(userdata) {
    //Check User data
    console.log("userdata", userdata);

    // Follow this profile if we aren't already
    if (userdata.follow_status) {
      return this.userService.unfollow(userdata.id).subscribe((data: any) => {
        console.log("unfollow() -> call");
        userdata.follow_status = 0;
        console.log(" unfollow() -> ", userdata.follow_status);
        //this.isSubmitting = false;
      },
        err => this.isSubmitting = false
      );
      // Otherwise, unfollow this profile
    } else {
      return this.userService.follow(userdata.id).subscribe((data: any) => {
        console.log("follow() -> call");
        userdata.follow_status = 1;
        console.log(" follow() -> ", userdata.follow_status);
        //this.isSubmitting = true;
      },
        err => this.isSubmitting = false
      );
    }
  }

  //For Like or Unlike any user from Userlist
  toggleLikeUnlike(postdata) {
    console.log("postdata", postdata);
    // unlike that post if we already liked
    if (postdata.isLiked) {
      return this.postService.unlikepost(postdata.id).subscribe((res: any) => {
        if(res.status==200){
        console.log("unlikepost() -> call");
        //postdata.isLiked = false;
        console.log(" unlikepost() -> ", postdata.isLiked);
        //just refresh here to see the updated result
        this.getPostOfAllUser();
        }  
      });
      // Otherwise, Like the post
    } else {
      return this.postService.likepost(postdata.id).subscribe((res: any) => {
        if(res.status==200){
        console.log("likepost() -> call");
        //postdata.isLiked = true;
        console.log(" likepost() -> ", postdata.isLiked);
        //just refresh here to see the updated result
        this.getPostOfAllUser();
        }
      });
    }
  }

  //For Navigating From Home to Edit Profile
  editProfile() {
    this.router.navigate(['/editprofile'], { queryParams: { registered: 'true' } });
  }

 
  //For Deleting a specific Post on basis of post id 
  deletePost(post_id: number) {
    this.postService.deletePost(post_id).subscribe((data: any) => {
      console.log("deletePost() -> Post deleted!!");
      //To refresh the List after deleting a post
      this.getPostOfAllUser();
    });
  }

  // onFileSelected(event: { target: { files: File[]; }; }) {
  //   this.convertFile(event.target.files[0]).subscribe(base64 => {
  //     this.base64Output = base64;
  //   });
  // }

  // convertFile(file : File) : Observable<string> {
  //   const result = new ReplaySubject<string>(1);
  //   const reader = new FileReader();
  //   reader.readAsBinaryString(file);
  //   reader.onload = (event) => result.next(btoa(event.target.result.toString()));
  //   return result;
  // }

  onFileSelected() {
  }

}