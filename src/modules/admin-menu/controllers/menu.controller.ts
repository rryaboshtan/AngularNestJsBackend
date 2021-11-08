import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MenuService } from '../menus/menu.service';
import { NestedTreeNode } from '../responces/nested-tree-node';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {
      
    }
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile(): NestedTreeNode[] {
    return this.menuService.getMenu();
    // return [
    //   {
    //     name: 'Contents',
    //     children: [
    //       {
    //         name: 'Pages',
    //         href: '/admin/grid/content/pages',
    //       },
    //       {
    //         name: 'Posts',
    //         href: '/admin/grid/content/posts',
    //       },
    //       {
    //         name: 'Comments',
    //         href: '/admin/grid/content/comments',
    //       },
    //     ],
    //   },
    //   {
    //     name: 'Accounts',
    //     icon: 'perm_identity',
    //     children: [
    //       {
    //         name: 'Admins',
    //         icon: 'manage_accounts',
    //         href: '/admin/grid/account/admins',
    //       },
    //       {
    //         name: 'Users',
    //         icon: 'face',
    //         href: '/admin/grid/account/users',
    //       },
    //     ],
    //   },
    //   {
    //     name: 'Settings',
    //     icon: 'settings',
    //     children: [
    //       {
    //         name: 'General',
    //         href: '/admin/form/settings/general',
    //       },
    //       {
    //         name: 'Catalog',
    //         href: '/admin/form/settings/catalog',
    //       },
    //     ],
    //   },
    // ];;
  }
}
