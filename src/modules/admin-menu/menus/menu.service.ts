import { Injectable } from '@nestjs/common';
import { MenuNode, PatchMenuNode, ROOT_MENU_NODE_ID } from './menu-node';

@Injectable()
export class MenuService {
  private nodes: { [id: string]: MenuNode } = {};
  private patches: PatchMenuNode[] = [];
  /**
   *
   */
  getMenu(): MenuNode[] {
    const nodeMap: { [id: string]: MenuNode } = {};
    let src = Object.values(this.nodes).map((node) => {
      const copy = { ...node };
      nodeMap[copy.id] = copy;
      return copy;
    });

    this.patches.forEach((patch) => {
      if (nodeMap[patch.id]) {
        Object.assign(nodeMap[patch.id], patch);
      }
    });

    src = src.filter(node => !node.removed);

    return this.getMenuForNode(ROOT_MENU_NODE_ID, src);
  }

  getMenuForNode(id: string, src: MenuNode[]): MenuNode[] {
    return src
      .filter((node) => node.parentId === id)
      .map(({ href, ...node }) => {
        const children = this.getMenuForNode(node.id, src);

        //if this node has children, then it will not has href, because it is a page node, not the menu item
        if (children.length > 0) {
          return {
            ...node,
            children,
          };
        }

        return {
          ...node,
          href,
          //we shall delete node, if it not has the meaningful href
          removed: !href,
          children: [],
        };
      })
      .filter((node) => !node.removed);
  }

  add(...nodes: MenuNode[]): void {
    nodes.forEach((node) => {
      const sanitizedChildren =
        node.children?.map((child) => ({
          ...child,
          parentId: node.id,
        })) || [];

      const { children, ...sanitizedNode } = node;
      this.add(...sanitizedChildren);

      this.nodes[node.id] = sanitizedNode;
    });
  }

  patch(...patches: PatchMenuNode[]): void {
    this.patches = [...this.patches, ...patches];
  }

  remove(...ids: string[]): void {
    this.patch(...ids.map(id => ({
      id,
      removed: true,
    })))
  }
}
