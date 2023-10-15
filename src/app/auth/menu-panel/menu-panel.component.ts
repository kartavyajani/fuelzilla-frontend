import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss']
})
export class MenuPanelComponent implements OnInit {
  // isDarkTheme = false;
  // @ViewChild(MatAccordion)
  @ViewChild('sidenav') sidenav!: MatSidenav;
  accordion!: MatAccordion;
  sidenavWidth = 4;
  ngStyle!: string;
  userData: any = [];
  role_name:any
  selectedRole: any;
  roles: any =[];
  isExpanded = true;
  isShowing = false;
  selectedPersonId : any;
  user_name : any;
  
  currentRole: any;
  // role_id:any;
  
  listOfDataByRole: any;
  userRoles: any = [];
  roleFromLogin:any=[];
  lastLogin: any;
  lastLoginAmPm: any;

  // ,private dataShare:DatasharingService
  constructor(private router: Router) {   }

  ngOnInit(): void {
  
    // this.selectedRole = sessionStorage.getItem('role_name');
    // this.selectedRole = {role_id: +sessionStorage.getItem('role_id')?.toString()!};
    this.selectedRole =  +sessionStorage.getItem('role_id')?.toString()!;
    console.log("this.selectedRole", this.selectedRole);
    
    
    this.getDataByRole(this.selectedRole);
    // this.selectedRole = sessionStorage.getItem('role_name');
    // this.selectedRole = {role_id: +sessionStorage.getItem('role_id')?.toString()!};
    console.log("this.selectedRole", this.selectedRole);
    this.lastLogin =  localStorage.getItem('last_login');
    console.log("this.last_login", this.lastLogin);
   // this.lastLoginAmPm = moment(this.lastLogin).format(this.commonMessages.monthDayYearTime);
    console.log("lastLoginAmPm", this.lastLoginAmPm);

    // this.dataShare.dataSubject.subscribe((res:any )=> {
    //   // this.userData = res;
    //   this.userRoles.push( _.uniqBy(res, 'role_id'));
      
    //   this.roles = res;
    //   //console.log("list=============>", this.roles, this.userRoles);
    //   //localStorage.setItem("RolesFromService",this.roles);     

    // })

    this.roles=JSON.parse(localStorage.getItem("roles")?.toString()!);
    

    // var payload = {
    //   user_name: sessionStorage.getItem('user_name'),
    //   password: sessionStorage.getItem('password')

    // }
   
    
    
  }

  getDataByRole(roleId : any){
    
    // this.apiService.getDetailsById(globalUrl.getDataByRole,+roleId).subscribe((res: any) => {
      
    //   this.listOfDataByRole=res;
    //   console.log("listOfDataByRole===>",this.listOfDataByRole)
    //   // this.roles = [...new Set(res.menus.map((item: { role_name: any; }) => item.role_name))];
    //   // this.userData = _.filter(res, (o)=> { return o.role_id == +sessionStorage.getItem('role_id')?.toString()!; });
    //   // this.userData = res;
    //   // this.userData = res;
    //   // this.roles = _.uniqBy(res, 'role_id');

    //   console.log("list=============>", this.roles);
    //   while(this.userData.length>0){
    //     this.userData.pop();
    //   }
    //   this.userData=res;
    //   console.log("this.userData===>",this.userData)
    //   //this.userData = _.filter(res, (o)=> { return o.role_id == +sessionStorage.getItem('role_id')?.toString()!; });
    //   // this.userData = res;
    //   console.log("Login responses==>", this.userData);

    //   if(this.userData.length>0){
    //     this.apiService.getDetailsById(globalUrl.roleMenuActionByRoleId,+roleId).subscribe(res => {
    //       console.log("roleMenuActionByRoleId res=======>", res);
    //       if(res.length>0){
            
    //         for (let i = 0; i < this.userData.length; i++) {
              
    //           if(_.find(res, (o)=> { return o.role_menu_id == this.userData[i].role_menu_id; })){
    //             // this.userData[i].listOfActions = [];
    //             this.userData[i].listOfActions = _.filter(res, (o)=> { return o.role_menu_id == this.userData[i].role_menu_id; });
    //           }
    //         }
    //       }
    //       });
        
    //     console.log("roles============", this.roles);
    //     this.user_name = this.roles[0].user_name;
    //     console.log("this.roles[0].user_name",this.roles[0].user_name);
    //     console.log("user_name", this.user_name);
    //     console.log("this.userData", this.userData);
  
    //   }
    // })
  }
  changeRole(event: any) {
    this.currentRole = event;
    sessionStorage.setItem('role_name', event.role_name);
    sessionStorage.setItem("role_id",event.role_id);
    this.selectedRole =  +sessionStorage.getItem('role_id')?.toString()!;
    this.getDataByRole(this.selectedRole);
    //window.location.reload();
    // this.ngOnInit();
    console.log('role_name======>', event.role_id);
    console.log('this.currentRole======>', this.currentRole)
    this.router.navigate(["statistics"]);

    // let selectedPersonId = this.userData[0].rights_id;
    // console.log("selectedPersonId", selectedPersonId);
  }

  // back button
  goBack() {
    // this.location.back();
    console.log('goBack()...');
  }

  
  // for themes
  // toggleTheme(){   
  //   this.isDarkTheme = !this.isDarkTheme;
  // }

  increase() {
    this.sidenavWidth = 20;
    // console.log('increase sidenav width');
    
  }
  decrease() {
    this.sidenavWidth = 4;
    // console.log('decrease sidenav width');
  }
  logOut() {
    localStorage.clear();
    sessionStorage.clear()
    this.router.navigate(["login"]);

  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  selectMenu(type:any,data:any){
    console.log("type,data",type,data);
    localStorage.setItem('selectedMenu',JSON.stringify(data));
    if(data.listOfActions && data.listOfActions.length>0){
      var listOfActionsArr : any= [];
      for (let i = 0; i < data.listOfActions.length; i++) {
        listOfActionsArr.push(data.listOfActions[i].action_id)
      }
      localStorage.setItem('allowedActions',JSON.stringify(listOfActionsArr));
      // this.apiService.setAllowedActions(JSON.stringify(listOfActionsArr))
    }
    
    
    this.router.navigate([`/${data.menu_url}`]);
  }
  changePassword(){
    this.router.navigate(['change-password']);
  }
}
