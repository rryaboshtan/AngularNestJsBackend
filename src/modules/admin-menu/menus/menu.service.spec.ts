import { ROOT_MENU_NODE_ID } from './menu-node';
import { MenuService } from './menu.service';

describe('MenuService Unit test', () => {
  let menuService: MenuService;
  beforeEach(() => {
    menuService = new MenuService();
  });

  describe('Add node', () => {
    it('Empty service will return empty array', () => {
      expect(menuService.getMenu()).toHaveLength(0);
    });

    it('The node without the true root will not return something', () => {
      menuService.add({
        id: 'foo',
        parentId: 'bar',
        sortOrder: 10,
        name: 'foo',
        href: 'http://foo.com',
      });
      expect(menuService.getMenu()).toHaveLength(0);
    });
      
       it('The node with the true root will adds', () => {
         menuService.add({
           id: 'foo',
           parentId: ROOT_MENU_NODE_ID,
           sortOrder: 10,
           name: 'foo',
           href: 'http://foo.com',
         });
         expect(menuService.getMenu()).toHaveLength(1);
       });
  });
});
