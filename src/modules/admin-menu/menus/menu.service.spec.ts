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

    it('The page node without href must be deleted', () => {
      menuService.add({
        id: 'foo',
        parentId: ROOT_MENU_NODE_ID,
        sortOrder: 10,
        name: 'foo',
      });
      expect(menuService.getMenu()).toHaveLength(0);
    });

    it('The nodes with equal id will be rewrited', () => {
      menuService.add({
        id: 'foo',
        parentId: ROOT_MENU_NODE_ID,
        sortOrder: 10,
        name: 'foo',
        href: 'https://foo.com',
      });
      menuService.add({
        id: 'foo',
        parentId: ROOT_MENU_NODE_ID,
        sortOrder: 20,
        name: 'foo',
        href: 'https://foo.com',
      });
      const menu = menuService.getMenu();
      expect(menu).toHaveLength(1);
      expect(menu[0].sortOrder).toBe(20);
    });

    it('The nodes have hierarchical structure', () => {
      menuService.add({
        id: 'bar',
        parentId: 'foo',
        sortOrder: 10,
        name: 'bar',
        href: 'https://bar.com',
      });
      menuService.add({
        id: 'foo',
        parentId: ROOT_MENU_NODE_ID,
        sortOrder: 20,
        name: 'foo',
        href: 'https://foo.com',
      });
      const menu = menuService.getMenu();
      expect(menu).toHaveLength(1);
      expect(menu[0].id).toBe('foo');
      expect(menu[0].children).toHaveLength(1);
      expect(menu[0].children[0].id).toBe('bar');
    });

    it('The nested nodes added correctly', () => {
      menuService.add({
        id: 'foo',
        parentId: ROOT_MENU_NODE_ID,
        sortOrder: 20,
        name: 'foo',
        href: 'https://foo.com',
        children: [
          {
            id: 'bar',
            parentId: ROOT_MENU_NODE_ID,
            sortOrder: 10,
            name: 'bar',
            href: 'https://bar.com',
          },
        ],
      });

      const menu = menuService.getMenu();
      expect(menu).toHaveLength(1);
      expect(menu[0].id).toBe('foo');
      expect(menu[0].children).toHaveLength(1);
      expect(menu[0].children[0].id).toBe('bar');
    });

    describe('Patch node', () => {
      it('Added node can be rewrited', () => {
        menuService.patch({
          id: 'foo',
          sortOrder: 77,
        });
        menuService.add({
          id: 'foo',
          parentId: ROOT_MENU_NODE_ID,
          sortOrder: 20,
          name: 'foo',
          href: 'https://foo.com',
        });

        const menu = menuService.getMenu();
        expect(menu[0].sortOrder).toBe(77);
        expect(menu[0].name).toBe('foo');
      });

      it('Patch will modify the node, not add it', () => {
        menuService.patch({
          id: 'foo',
          sortOrder: 77,
        });

        const menu = menuService.getMenu();
        expect(menu).toHaveLength(0);
      });

      it('We can run more than 1 patch', () => {
        menuService.patch({
          id: 'foo',
          sortOrder: 77,
          href: 'https://bar.com',
        });
        menuService.add({
          id: 'foo',
          parentId: ROOT_MENU_NODE_ID,
          sortOrder: 20,
          name: 'foo',
          href: 'https://foo.com',
        });
        menuService.patch({
          id: 'foo',
          sortOrder: 13,
          name: 'bar',
        });

        const menu = menuService.getMenu();
        expect(menu[0].sortOrder).toBe(13);
        expect(menu[0].name).toBe('bar');
        expect(menu[0].href).toBe('https://bar.com');
      });
    });

    describe('Remove node', () => {
      it('the node can be removed by id', () => {
        menuService.remove('foo', 'bar');
        menuService.add({
          id: 'foo',
          parentId: ROOT_MENU_NODE_ID,
          sortOrder: 20,
          name: 'foo',
          href: 'https://foo.com',
        });

        expect(menuService.getMenu()).toHaveLength(0);
      });

      it('Patch can undo the deletion', () => {
        menuService.add({
          id: 'foo',
          parentId: ROOT_MENU_NODE_ID,
          sortOrder: 20,
          name: 'foo',
          href: 'https://foo.com',
        });
        menuService.remove('foo', 'bar');
        menuService.patch(
          {
            id: 'foo',
            removed: false,
          },
          { id: 'bar', removed: false },
        );

        expect(menuService.getMenu()).toHaveLength(1);
      });

      it('Patch and remove methods has equal priority', () => {
        menuService.add({
          id: 'foo',
          parentId: ROOT_MENU_NODE_ID,
          sortOrder: 20,
          name: 'foo',
          href: 'https://foo.com',
        });
          
        menuService.patch(
          {
            id: 'foo',
            removed: false,
          },
          { id: 'bar', removed: false },
          );
          
        menuService.remove('foo', 'bar');

        expect(menuService.getMenu()).toHaveLength(0);
      });
    });
  });
});
