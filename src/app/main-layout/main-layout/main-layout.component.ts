import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { NAVIGATION } from 'src/app/app.navigation';



@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  today = new Date().getFullYear()
  
  menuItems = NAVIGATION;
  originalMenuItems = NAVIGATION
  activeSubMenu: string | null = null; // for UI click toggling
  activeSubMenus: string[] = [];       // for search display
  selectedParent: string | null = null;  // New variable to track selected parent
  searchMenuName: string = '';
  username:any
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;

  isMobile: boolean = false;
  isCollapsed: boolean = false;
  isOpenMobile: boolean = false;
  isToggle: boolean = false

  constructor(private router: Router) {}

  ngOnInit(){
   this.username = localStorage.getItem("username")
   this.checkScreenSize();
   window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
  this.isMobile = window.innerWidth <= 768;
  if (!this.isMobile) {
    this.isOpenMobile = false; // reset mobile state
  }
  }

  toggleSidebar() {
    this.isToggle = !this.isToggle
    if (this.isMobile) {
      this.isOpenMobile = !this.isOpenMobile; // slide in/out
    } else {
      this.isCollapsed = !this.isCollapsed;   // collapse/expand
    }
  }
  onIconHover(event: MouseEvent){
     
    if(!this.isMobile && !this.isOpenMobile && this.isToggle ){
    this.toggleSidebar()
    }
    
  }

  onParentMenuClick(item: any) {
    debugger
    if (!item.children) {
      // No submenu, so close any open submenu
      this.activeSubMenu = null;
      this.selectedParent = item.name;  // Highlight the clicked parent item
       if(this.isMobile){
         this.toggleSidebar()
       }
    } else {
      this.toggleSubMenu(item.name);
      this.selectedParent = item.name; 
       // Highlight the clicked parent item
    }
  }

   toggleSubMenu(itemName: string) {
    if (this.activeSubMenu === itemName) {
      this.activeSubMenu = null;
    } else {
      this.activeSubMenu = itemName;
    }
  }

  onSubMenuItemClick() {
    // Do NOT close submenu when clicking inside submenu
    // So no code needed here!
     if(this.isMobile){
      this.toggleSidebar()
    }
  }

  filterMenus() {
    if (this.searchMenuName) {
      const search = this.searchMenuName.toLowerCase();
      this.activeSubMenus = []; // reset

      this.menuItems = this.originalMenuItems.map((menu: any) => {
        const menuNameMatch = menu.name?.toLowerCase().includes(search);
        const filteredChildren = menu.children?.filter((child: any) =>
          child.name?.toLowerCase().includes(search)
        ) || [];

        if (menuNameMatch || filteredChildren.length) {
          this.activeSubMenus.push(menu.name); // track all active menus for search
          return {
            ...menu,
            children: menuNameMatch ? menu.children : filteredChildren
          };
        }

        return null;
      }).filter(menu => menu !== null);
    } else {
      this.menuItems = [...this.originalMenuItems];
      this.activeSubMenus = [];
    }
  }

  clearField(field: string) {
    if (field === 'searchMenuName') {
      this.searchMenuName = '';
    } 
    this.filterMenus();
  }

  showOverlay(event: Event) {
    this.overlayPanel.toggle(event); // toggles overlay visibility
  }

   onChangePassword() {
    this.router.navigateByUrl('/change-password');
  }

  onLogout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
